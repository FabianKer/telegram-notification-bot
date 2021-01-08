const CronJob = require('cron').CronJob

exports.job = job

//create cronJob which checks every hour
const job = new CronJob('* * */1 * * *', function() {

    checkAvailability()

})