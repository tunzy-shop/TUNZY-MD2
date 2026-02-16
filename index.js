const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const config = require('./config');
const moment = require('moment-timezone');
const cfonts = require('cfonts');

// Colors for console
const colors = {
    green: (text) => chalk.green(text),
    red: (text) => chalk.red(text),
    yellow: (text) => chalk.yellow(text),
    blue: (text) => chalk.blue(text),
    magenta: (text) => chalk.magenta(text),
    cyan: (text) => chalk.cyan(text),
    white: (text) => chalk.white(text)
};

// Show banner
cfonts.say('TUNZY-MD2', {
    font: 'block',
    align: 'center',
    colors: ['cyan', 'magenta'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0'
});

console.log(colors.cyan('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'));
console.log(colors.cyan('┃      TUNZY-MD2 BOT v2.0      ┃'));
console.log(colors.cyan('┃     Owner: TUNZY SHOP        ┃'));
console.log(colors.cyan('┃   YouTube: Tunzy Shop        ┃'));
console.log(colors.cyan('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'));

// Main connection function
async function connectToWhatsApp() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(config.SESSION_DIR);
        
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: true,
            logger: pino({ level: 'silent' }),
            browser: ['TUNZY-MD2', 'Safari', '3.0'],
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            patchMessageBeforeSending: true
        });

        // Message handler
        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type === 'notify') {
                const m = messages[0];
                if (!m.message) return;
                
                // Load message handler
                const messageHandler = require('./core/msg');
                await messageHandler(sock, m, config);
            }
        });

        // Connection updates
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log(colors.yellow('\n📱 Scan the QR code above with WhatsApp!\n'));
            }
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log(colors.red('❌ Connection closed. Reconnecting: ' + shouldReconnect));
                
                if (shouldReconnect) {
                    connectToWhatsApp();
                } else {
                    console.log(colors.red('❌ Logged out. Please delete session folder and restart.'));
                }
            } else if (connection === 'open') {
                console.log(colors.green('\n✅ TUNZY-MD2 Connected Successfully!\n'));
                console.log(colors.cyan('📊 Bot Information:'));
                console.log(colors.white('━━━━━━━━━━━━━━━━━━━━━━━━'));
                console.log(colors.yellow(`├ Bot Name: ${config.BOT_NAME}`));
                console.log(colors.yellow(`├ Version: ${config.VERSION}`));
                console.log(colors.yellow(`├ Owner: ${config.OWNER_NAME}`));
                console.log(colors.yellow(`├ Mode: ${config.WORK_TYPE}`));
                console.log(colors.yellow(`├ Prefix: ${config.PREFIX}`));
                console.log(colors.yellow(`├ Timezone: ${config.TIMEZONE}`));
                console.log(colors.yellow(`└ Owner Number: ${config.OWNER_NUMBER}`));
                console.log(colors.white('━━━━━━━━━━━━━━━━━━━━━━━━\n'));
                
                // Send online notification to owner
                const ownerJid = config.OWNER_NUMBER + '@s.whatsapp.net';
                sock.sendMessage(ownerJid, {
                    text: `✅ *TUNZY-MD2 is now online!*\n\n📌 *Time:* ${moment().tz(config.TIMEZONE).format('DD/MM/YYYY HH:mm:ss')}\n📌 *Mode:* ${config.WORK_TYPE}\n📌 *Prefix:* ${config.PREFIX}`
                });
            }
        });

        // Save credentials
        sock.ev.on('creds.update', saveCreds);

        // Presence updates
        sock.ev.on('presence.update', () => {});

        return sock;
        
    } catch (error) {
        console.error(colors.red('❌ Connection error:'), error);
        setTimeout(connectToWhatsApp, 5000);
    }
}

// Start bot
connectToWhatsApp().catch(error => {
    console.error(colors.red('❌ Fatal error:'), error);
    process.exit(1);
});

// Handle process termination
process.on('uncaughtException', (error) => {
    console.error(colors.red('❌ Uncaught Exception:'), error);
});

process.on('unhandledRejection', (error) => {
    console.error(colors.red('❌ Unhandled Rejection:'), error);
});
