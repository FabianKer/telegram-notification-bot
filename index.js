import * as telegram_bot from './telegram_bot.js';
import * as cron from 'node-cron';
import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';

const registered_services = [];
main();

/**
 * async main function
 * Is initally executed and detects all scripts in the services/ folder and registers a cron job for every service
 */
async function main() {
    console.log('Scanning for services...');
    const files = fs.readdirSync('./services/');
    for (const file of files) {
        const loaded_script = await import(`./services/${file}`);
        // Only continue if service script exports correct json object
        if (check_exported_object(loaded_script)) {
            console.log(`...found service ${file}`);
            const checker = loaded_script.service_info;
            registered_services.push(checker.title);
            register_cron_job(checker);
        } else {
            console.warn(`...skipping ${file}, it exports the service_info object incorrectly or not at all`);
        }
    }
    console.log('All cron jobs started, services will now execute regularly...');
    startup_message();
}

/**
 * sync register_cron_job function
 * Registers a cron job for every service
 * @param {*} checker Checker object exported by every service script
 */
function register_cron_job(checker) {
    cron.schedule(checker.interval, () => {
        console.info(`[Interval] ${checker.title}`);
        checker.perform_check().then(is_available => {
            if (is_available) {
                telegram_bot.sendTelegramMessage(
                    process.env.TELEGRAM_CHAT_ID,
                    `[${checker.title}]\n${checker.available_message}`
                );
            }
        });
    });
}

/**
 * Checks service script for correctly exported json object containing service info
 * @param {*} service 
 * @returns true if exported object has correct properties | false if not
 */
function check_exported_object(service) {
    return (
        service.service_info !== undefined &&
        service.service_info.title !== undefined &&
        service.service_info.available_message !== undefined &&
        service.service_info.interval !== undefined &&
        service.service_info.perform_check !== undefined
    );
}

function startup_message() {
    let message = 'The notification bot has started up! Following services were found and registered:\n\n';
    for (const service of registered_services) {
        message += `- ${service}\n`;
    }
    telegram_bot.sendTelegramMessage(process.env.TELEGRAM_CHAT_ID, message);
}
