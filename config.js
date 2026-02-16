const fs = require('fs-extra');
const path = require('path');
require('dotenv').config({ path: __dirname + '/config.env' });

// Read environment variables
const config = {
    // Bot info
    SESSION_ID: process.env.SESSION_ID || '',
    TIMEZONE: process.env.TIMEZONE || 'Africa/Lagos',
    OWNER_NUMBER: process.env.OWNER_NUMBER || '',
    WORK_TYPE: process.env.WORK_TYPE || 'public',
    PREFIX: process.env.PREFIX || '.',
    BOT_NAME: process.env.BOT_NAME || 'TUNZY-MD2',
    CHANNEL_LINK: process.env.CHANNEL_LINK || '',
    
    // Version
    VERSION: '2.0.0',
    
    // Owner info
    OWNER_NAME: 'TUNZY SHOP',
    YOUTUBE: 'Tunzy Shop',
    
    // Channel JID (replace with your actual channel JID)
    CHANNEL_JID: '120363422591784062@newsletter',
    
    // Session folder
    SESSION_DIR: path.join(__dirname, 'session')
};

// Create session directory if it doesn't exist
fs.ensureDirSync(config.SESSION_DIR);

module.exports = config;
