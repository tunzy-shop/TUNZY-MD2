const config = require('../config');
const { exec } = require('child_process');
const fs = require('fs-extra');

module.exports = {
    name: 'owner',
    alias: ['ownerctl', 'mode', 'update'],
    description: 'Owner control commands',
    ownerOnly: true,
    
    execute: async (sock, m, args, sender, config) => {
        const chatId = m.key.remoteJid;
        const command = args[0]?.toLowerCase();
        
        if (!command) {
            return await sock.sendMessage(chatId, {
                text: `*Owner Control Menu*\n\n${config.PREFIX}owner mode <public/self>\n${config.PREFIX}owner update\n${config.PREFIX}owner restart\n${config.PREFIX}owner shutdown`
            }, { quoted: m });
        }
        
        switch (command) {
            case 'mode':
                const newMode = args[1]?.toLowerCase();
                if (newMode === 'public' || newMode === 'self' || newMode === 'private') {
                    // Update config
                    config.WORK_TYPE = newMode;
                    await sock.sendMessage(chatId, {
                        text: `✅ Mode changed to *${newMode}*`
                    }, { quoted: m });
                } else {
                    await sock.sendMessage(chatId, {
                        text: '❌ Invalid mode. Use: public, self, or private'
                    }, { quoted: m });
                }
                break;
                
            case 'restart':
                await sock.sendMessage(chatId, {
                    text: '🔄 Restarting bot...'
                }, { quoted: m });
                exec('pm2 restart tunzy-md2 || node index.js');
                break;
                
            case 'shutdown':
                await sock.sendMessage(chatId, {
                    text: '🔴 Shutting down bot...'
                }, { quoted: m });
                process.exit(0);
                break;
                
            default:
                await sock.sendMessage(chatId, {
                    text: '❌ Unknown owner command'
                }, { quoted: m });
        }
    }
};
