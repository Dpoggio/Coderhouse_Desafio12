const Productos = require(__dirname + '/model/productoDaoMongo.js')
const Mensajes = require(__dirname + '/model/mensajes.js')
const productos = new Productos()
const mensajes = new Mensajes()


// Normalizr
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'mail' });
const mensajesSchema = new schema.Entity('mensajes', {
    mensajes: [ { author: authorSchema } ]
});

async function getMensajes(){
    const listaMensajes = await mensajes.getAll()
    const mensajesDenorm = {id: 'mensajes', mensajes: listaMensajes}
    const mensajesNorm = normalize(mensajesDenorm, mensajesSchema);
    return mensajesNorm
}

// Functions
async function wsConnection(socket){
    console.log('Nuevo cliente conectado')

    socket.emit('actualizarProductos', await productos.getAll())
    socket.emit('actualizarMensajes', await getMensajes())

    socket.on('nuevoProducto', nuevoProducto)
    socket.on('nuevoMensaje', nuevoMensaje)
}

async function nuevoProducto(producto) {
    await productos.save(producto)
    io.sockets.emit('actualizarProductos', await productos.getAll())
}


async function nuevoMensaje(mensaje) {
    await mensajes.save(mensaje)
    io.sockets.emit('actualizarMensajes', await getMensajes())
}

exports.wsConnection = wsConnection