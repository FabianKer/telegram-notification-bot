const request = require('request')

const gpu_checker = require('./services/gpu_check')

//Information needed by the telegram bot
const telegramBotInfo = {
    accessToken: '1454487318:AAET-9jSJxV-qmYx7PD6ondtiZg7HPkjwsU',
    chatId: 
        {
            fabian: '415412975',
            tobias: '387131928'
        }
}

sendTelegramMessage('fabian', 'Starting to check for GPUs')
sendTelegramMessage('tobias', 'Starting to check for GPUs')

//set interval
setInterval(function() {

    const currentDate = new Date()
    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes()
    console.log('[' + currentTime + '] Running Interval...')
    gpu_checker.checkAvailability()

}, 3600000)

function sendTelegramMessage(receiver, message) {
    message = encodeURIComponent(message.trim())
    request(`https://api.telegram.org/bot${telegramBotInfo.accessToken}/sendMessage?chat_id=${telegramBotInfo.chatId[receiver]}&text=${message}`, { json: true }, (err, res, body) => {
        if (err) { return console.error(err) }
        console.log(body)
    })
}
