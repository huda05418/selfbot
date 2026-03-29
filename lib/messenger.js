const config = require('../config');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getLogTime = () => {
    return new Date().toLocaleTimeString('en-GB', { hour12: false });
};

async function sendAndPurge(message, slotIndex) {
    const time = getLogTime();
    try {
        // Log 
        console.log(`[${time}] SLOT_${slotIndex + 1}: SENDING_MESSAGE`);
        
        const res = await fetch(`https://discord.com/api/v9/channels/${config.channelId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': config.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        });

        const data = await res.json();

        if (res.ok) {
        
            await sleep(1500); 
            
            console.log(`[${getLogTime()}] SLOT_${slotIndex + 1}: DELETING_MESSAGE (ID: ${data.id})`);
            
            await fetch(`https://discord.com/api/v9/channels/${config.channelId}/messages/${data.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': config.token }
            });
        } else {
            console.log(`[${getLogTime()}] ERROR: STATUS_${res.status}`);
        }
    } catch (e) {
        console.log(`[${getLogTime()}] SYSTEM_ERROR: ${e.message}`);
    }
}

module.exports = { sendAndPurge, sleep, getLogTime };