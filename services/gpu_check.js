const request = require('request')

exports.checkAvailability = checkAvailability

function checkAvailability() {
    request('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=de-de', { json: true }, (err, res, data) => {
        if (err) { return console.error(err) }

        data3080 = data.searchedProducts.productDetails.filter(item => {
            return item.gpu === 'RTX 3080'
        })
        data3070 = data.searchedProducts.productDetails.filter(item => {
            return item.gpu === 'RTX 3070'
        })
        data3060 = data.searchedProducts.productDetails.filter(item => {
            return item.gpu === 'RTX 3060 Ti'
        })

        //check for RTX 3080
        if (data3080.length > 0) {
            const status = data3080[0].prdStatus
            console.info('Availability (RTX 3080): ' + status)

            if (status !== 'out_of_stock') {
                sendTelegramMessage('tobias', 'RTX 3080 ist wieder verfügbar!')
            }

        } else {
            console.info('The GPU was not found')
        }
        
        //check for RTX 3070
        if (data3070.length > 0) {
            const status = data3070[0].prdStatus
            console.info('Availability (RTX 3070): ' + status)

            if (status !== 'out_of_stock') {
                sendTelegramMessage('fabian', 'RTX 3070 ist wieder verfügbar!')
            }

        } else {
            console.info('The GPU was not found')
        }

        //Check for RTX 3060 Ti
        if (data3060.length > 0) {
            const status = data3060[0].prdStatus
            console.info('Availability (RTX 3060 Ti): ' + status)

            if (status !== 'out_of_stock') {
                sendTelegramMessage('fabian', 'RTX 3060 Ti ist wieder verfügbar!')
            }

        } else {
            console.info('The GPU  was not found')
        }



    })
}
