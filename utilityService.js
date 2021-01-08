const Service = require('node-windows').Service

const svc = new Service({
    name: 'UtilityBot',
    description: 'This service can check anything and send a message via Telegram',
    script: 'F:\\Development\\utilitybot\\index.js'
})

svc.on('install',function() {
    svc.start()
})

svc.install();