const { Router } = require('express')
const RandomController = require('../controllers/randoms.js')

const routerRandoms = Router();
const randomController = new RandomController()

/**** Rutas ****/
routerRandoms.get('/', (req, res, next) => {  
    try {
        const cant = req.query.cant
        const listaRandom = randomController.getRandoms(cant)
        res.json(listaRandom)    
    } catch (error) {
        next(error)
    }
})

exports.routerRandoms = routerRandoms;