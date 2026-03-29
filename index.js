const config = require('./config');
const { sendAndPurge, sleep, getLogTime } = require('./lib/messenger');

async function start() {


    while (true) {
        for (let i = 0; i < config.messages.length; i++) {
            const msg = config.messages[i];
            
            await sendAndPurge(msg, i);
            
            if (i < config.messages.length - 1) {
                console.log(`[${getLogTime()}] SYSTEM: WAITING_FOR_NEXT_SLOT`);
            } else {
                console.log(`[${getLogTime()}] SYSTEM: CYCLE_COMPLETE_WAITING_RESTART`);
            }
            
            await sleep(config.delay);
        }
    }
}

if (!config.token) {
    console.log(`[${getLogTime()}] FATAL: MISSING_AUTH_TOKEN`);
    process.exit(1);
}
//
start();