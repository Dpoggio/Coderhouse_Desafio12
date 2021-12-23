
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const handlebars = require('express-handlebars')
const session = require('express-session')
const { normalize, schema } = require("normalizr");
const MongoStore = require('connect-mongo')
const conn = require('./lib/connections.js')
const passport = require('./lib/auth.js')


/**** CONSTANTES ****/
const PORT = process.env.PORT || 8080


/*** Routers ****/
const { checkAuth, getIndex } = require(__dirname + '/routers/routerMain.js')
const { routerProductos } = require(__dirname + '/routers/routerProductos.js')
const { routerProductosTest } = require(__dirname + '/routers/routerProductosTest.js')
const { routerLogin, routerSignup, routerLogout } = require(__dirname + '/routers/routerAuth.js')
const { wsConnection } = require(__dirname + '/routers/routerWebSocket.js')
const { handleErrors } = require(__dirname + '/routers/routerErrors.js')


/**** Inicio App ****/
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


// Configuracion WebSocket
io.on('connection', wsConnection)

// Configuracion Vista
app.engine('hbs', 
    handlebars({
        extname: '.hbs',
        defaultLayout: 'default.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')


// Middleware incio
app.use(express.json())
app.use('/', express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: MongoStore.create({mongoUrl: conn.mongoSessionUrl}),
    secret: 'CoderHouse!!!',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 10*60*1000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

// Configuracion Rutas
app.get('/', checkAuth, getIndex)

app.use('/login', routerLogin)
app.use('/signup', routerSignup)
app.use('/logout', routerLogout)

app.get('/productos-test', (req, res) => {
    res.render('productos-test')
})

app.use('/api/productos', routerProductos)
app.use('/api/productos-test', routerProductosTest)

// Middleware Errores
app.use(handleErrors)

// Inicio server
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(`Error en servidor ${error}`))