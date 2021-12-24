const dotenv = require('dotenv')
dotenv.config()
const yargs = require('yargs/yargs')(process.argv.slice(2))

const args = yargs
    .options({
      'port': {
        alias: 'p',
        describe: 'Puerto del servidor',
        demandOption: false,
        default: 8080
      }
    })
    .help()
    .argv

module.exports = Object.freeze({
    // Misc
    PORT: args.port,

    // HTTP
    HTTP_NOT_FOUND: 404,
    HTTP_SERVER_ERROR: 500,
    HTTP_CREATED: 201,
    HTTP_NOT_AUTHORIZED: 403,
    HTTP_BAD_REQUEST: 400,

    // Custom Error Codes
    // NOT_AUTH_ERRCODE: -1,
    // ROUTE_NOT_FOUND_ERRCODE: -2,
    // INVALID_ID_ERRCODE: -3,
    // PROD_NOT_FOUND_ERRCODE: -4,
    // CHRT_NOT_FOUND_ERRCODE: -5,

    // Session
    SESSION_SECRET: process.env.SESSION_SECRET || 'CoderHouse!!!',
    
    // CONECTIONS
    CONN_MONGO_SESSION: process.env.CONN_MONGO_SESSION || "mongodb://localhost:27017/sessions",
    CONN_MARIA_DB: {
        client: 'mysql',
        connection: { 
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'test'
        }
    },
    CONN_SQLITE: {
        client: 'sqlite3',
        connection: { filename: process.env.SQLITE_FILENAME || './DB/ecommerce.db'}
    },
    CONN_MONGO_DB: process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce"
})