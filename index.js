const request = require('request')

const gpu_checker = require('./services/gpu_check')

//Information needed by the telegram bot
const telegramBotInfo = {
    accessToken: '1454487318:AAET-9jSJxV-qmYx7PD6ondtiZg7HPkjwsU',
    chatId: '415412975'
}


sendTelegramMessage('Starting to check for GPUs')

//set interval
setInterval(function() {

    console.log('Running Interval...')
    gpu_checker.checkAvailability()

}, 3600000)

function sendTelegramMessage(message) {
    message = encodeURIComponent(message.trim())
    request(`https://api.telegram.org/bot${telegramBotInfo.accessToken}/sendMessage?chat_id=${telegramBotInfo.chatId}&text=${message}`, { json: true }, (err, res, body) => {
        if (err) { return console.error(err) }
        console.log(body)
    })
}
