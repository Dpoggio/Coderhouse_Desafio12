const mongoose = require('mongoose')
const cfg = require('../config.js')

if (mongoose.connection.readyState == 0) {
    mongoose.connect(cfg.CONN_MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const mongoDb = mongoose.connection;
    
    mongoDb.on('error', error => console.error(`Error al conectarse a la base de datos: ${error}`))
    mongoDb.once('open', () => {
        console.log('Conectado a la base de datos');
    });
}

module.exports = mongoose