import * as telegram_bot from './telegram_bot.js'
import * as cron from 'node-cron'
import * as dotenv from 'dotenv'
dotenv.config()
import * as fs from 'fs'

fs.readdirSync('./services/').forEach(file => {
    console.log(file);
})





// // Startup notification for each interest of every user
// setTimeout(() => { gpu_checker.checkAvailability() }, 2000)

// // Set interval every minute
// setInterval(function() {

//     const currentDate = new Date()
//     const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes()
//     console.log('[' + currentTime + '] Running Interval...')
//     gpu_checker.checkAvailability()

// }, 60000)

// /**
//  * Deprecated
//  */
// function sendStartupNotification() {
//     config.interests.forEach(interest => {
//         gpu_checker.fillStatus(interest.gpu)
//         interest.interestedUsers.forEach(user => {

//             const receiver = config.users[user].telegramChatId
//             const message = 'Starting to check for ' + interest.gpu + '!'
//             telegram_bot.sendTelegramSticker(receiver, config.telegramBot.stickers.searching)
//             setTimeout(() => { telegram_bot.sendTelegramMessage(receiver, message) }, 1000)
//             console.log('Starting to check for ' + interest.gpu)

//         })
//     })
// }
