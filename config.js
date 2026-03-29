require('dotenv').config();

module.exports = {
    token: process.env.AUTH_TOKEN,
    guildId: process.env.GUILD_ID, 
    channelId: process.env.CHANNEL_ID, 
    delay: parseInt(process.env.DELAY_SECONDS) * 1000,
    messages: [
        process.env.SLOT_1,
        process.env.SLOT_2,
        process.env.SLOT_3,
        process.env.SLOT_4,
        process.env.SLOT_5
    ]
};