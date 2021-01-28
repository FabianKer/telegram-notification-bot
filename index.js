const request = require('request')
const config = require('./config')
const gpu_checker = require('./services/gpu_check')
const telegram_bot = require('./services/telegram_bot')

// Startup notification for each interest of every user
sendStartupNotification()
setTimeout(() => { gpu_checker.checkAvailability() }, 2000)

// Set interval hourly
setInterval(function() {

    const currentDate = new Date()
    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes()
    console.log('[' + currentTime + '] Running Interval...')
    gpu_checker.checkAvailability()

}, 600000)

function sendStartupNotification() {
    config.interests.forEach(interest => {
        gpu_checker.fillStatus(interest.gpu)
        interest.interestedUsers.forEach(user => {

            const receiver = config.users[user].telegramChatId
            const message = 'Starting to check for ' + interest.gpu + '!'
            telegram_bot.sendTelegramSticker(receiver, config.telegramBot.stickers.searching)
            setTimeout(() => { telegram_bot.sendTelegramMessage(receiver, message) }, 1000)
            console.log('Starting to check for ' + interest.gpu)

        })
    })
}
