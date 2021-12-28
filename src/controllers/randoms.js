const cfg = require('../config.js')

class RandomController {
    constructor(){}

    getRandomNumber(maxValue = cfg.RANDOM_MAX_VALUE){
        return Math.floor(Math.random()*maxValue)+1
    }

    getRandoms(cant = cfg.RANDOM_DEFAULT_CANT){
        const numbers = {}
        for (let i = 0; i<cant; i++){
            const number = this.getRandomNumber()
            if (!numbers[number]) {
                numbers[number] = 1
            } else {
                numbers[number]++
            }
        }
        return numbers
    }
}

module.exports = RandomController;