const request = require('request')
const config = require('../config')
const telegram_bot = require('./telegram_bot')

exports.checkAvailability = checkAvailability

function checkAvailability() {
    request(config.nvidiaApiPath, { json: true }, (err, res, data) => {
        if (err) { return console.error(err) }
        console.log(data)

        // Go through all interesting GPUs
        config.interests.forEach(interest => {

            console.log('Checking for ' + interest.gpu)
            // Filter out information for searched gpu
            let gpuData = {}
            // If GPU is featured, it's in a different Object
            if (data.searchedProducts.featuredProduct.gpu === interest.gpu) {
                Object.assign(gpuData, data.searchedProducts.featuredProduct)
            } else {
                data.searchedProducts.productDetails.forEach(details => {
                    if (details.gpu === interest.gpu) {
                        gpuData = details
                    }
                })
            }

            // If GPU was found
            if (gpuData) {
                const status = gpuData.prdStatus;
                console.info('[Info] Availability ('+interest.gpu+'): '+status)

                // If GPU is back in stock
                if (status !== 'out_of_stock') {
                    interest.interestedUsers.forEach(user => {
                        const receiver = config.users[user].telegramChatId
                        const message = interest.gpu + ' ist wieder verfügbar!'
                        telegram_bot.sendTelegramSticker(receiver, config.telegramBot.stickers.found)
                        setTimeout(() => { telegram_bot.sendTelegramMessage(receiver, message) }, 1000)
                    })
                }
            } else {
                console.warn('[Warning] GPU "'+interest.gpu+'" was not found')
            }

        })

    })
}
