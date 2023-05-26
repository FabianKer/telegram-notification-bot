import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

export function sendTelegramMessage(receiver, message) {
    message = encodeURIComponent(message.trim())
    axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_ACCESS_TOKEN}/sendMessage?chat_id=${receiver}&text=${message}`)
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

export function sendTelegramSticker(receiver, sticker) {
    axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_ACCESS_TOKEN}/sendSticker?chat_id=${receiver}&sticker=${sticker}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
