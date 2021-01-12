const request = require('request')
const config = require('../config')

function sendTelegramMessage(receiver, message) {
    message = encodeURIComponent(message.trim())
    request(`https://api.telegram.org/bot${config.telegramBot.accessToken}/sendMessage?chat_id=${receiver}&text=${message}`, { json: true }, (err, res, body) => {
        if (err) { return console.error(err) }
        console.log(body)
    })
}

function sendTelegramSticker(receiver, sticker) {
    request(`https://api.telegram.org/bot${config.telegramBot.accessToken}/sendSticker?chat_id=${receiver}&sticker=${sticker}`, { json: true }, (err, res, body) => {
        if (err) { return console.error(err) }
        console.log(body)
    })
}

exports.sendTelegramMessage = sendTelegramMessage
exports.sendTelegramSticker = sendTelegramSticker