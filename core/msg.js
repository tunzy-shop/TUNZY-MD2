const fs = require('fs-extra');
const path = require('path');

module.exports = async (sock, m, config) => {
    try {
        const sender = m.key.remoteJid;
        const isGroup = sender.endsWith('@g.us');
        const messageType = Object.keys(m.message)[0];
        let messageText = '';
        
        // Extract message text based on type
        if (messageType === 'conversation') {
            messageText = m.message.conversation || '';
        } else if (messageType === 'extendedTextMessage') {
            messageText = m.message.extendedTextMessage.text || '';
        } else if (messageType === 'imageMessage') {
            messageText = m.message.imageMessage.caption || '';
        } else if (messageType === 'videoMessage') {
            messageText = m.message.videoMessage.caption || '';
        }
        
        // Check if message starts with prefix
        if (!messageText.startsWith(config.PREFIX)) return;
        
        // Extract command and args
        const args = messageText.slice(config.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        // Load all command files
        const commandFiles = await fs.readdir(path.join(__dirname, '../cmds'));
        
        for (const file of commandFiles) {
            if (file.endsWith('.js')) {
                const cmd = require(`../cmds/${file}`);
                
                // Check if this command matches
                if (cmd.name === command || (cmd.alias && cmd.alias.includes(command))) {
                    
                    // Check if command is owner-only
                    if (cmd.ownerOnly) {
                        const senderNumber = sender.split('@')[0];
                        if (senderNumber !== config.OWNER_NUMBER) {
                            await sock.sendMessage(sender, { 
                                text: '❌ *Owner Only Command!*\n\nThis command can only be used by the bot owner.' 
                            }, { quoted: m });
                            return;
                        }
                    }
                    
                    // Check work type (private/public)
                    if (config.WORK_TYPE === 'private') {
                        const senderNumber = sender.split('@')[0];
                        if (senderNumber !== config.OWNER_NUMBER) {
                            return; // Ignore non-owner messages in private mode
                        }
                    }
                    
                    // Execute command
                    console.log(`📝 Command: ${command} from ${sender}`);
                    await cmd.execute(sock, m, args, sender, config);
                    return;
                }
            }
        }
        
        // Command not found
        // Optional: send "command not found" message
        
    } catch (error) {
        console.error('❌ Message handler error:', error);
        
        // Try to send error message
        try {
            await sock.sendMessage(m.key.remoteJid, {
                text: `❌ *Error:*\n\`\`\`${error.message}\`\`\``
            }, { quoted: m });
        } catch (e) {}
    }
};
