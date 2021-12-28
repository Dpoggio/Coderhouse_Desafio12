const { Router } = require('express')
const { fork } = require('child_process')

const routerRandoms = Router();

/**** Rutas ****/
routerRandoms.get('/', (req, res, next) => {  
    try {
        const cant = req.query.cant

        const randomController = fork('./src/controllers/randoms.js')
        randomController.send({ cant })
        randomController.on('message', listaRandom => {
            res.json(listaRandom)
        })
    } catch (error) {
        next(error)
    }
})

exports.routerRandoms = routerRandoms;