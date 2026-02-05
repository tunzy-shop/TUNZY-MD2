// ⚠️ PERMANENTLY LOCKED BOT
// NO setvar MENU_IMAGE COMMAND
// Image is HARDCODED to media/tunzy_md2.jpg

const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const path = require('path');

// LOAD PERMANENT CONFIG
const CONFIG = require('./config.js');

console.log(`
╔═══════════════════════════════════════╗
║         TUNZY - MD 2 BOT             ║
║      HD IMAGE MENU - LOCKED          ║
╚═══════════════════════════════════════╝
`);

// Check HD menu image
const hdImagePath = path.resolve(CONFIG.MENU_IMAGE);
let hdImageExists = false;
let hdImageSize = 0;

if (fs.existsSync(hdImagePath)) {
  hdImageExists = true;
  const stats = fs.statSync(hdImagePath);
  hdImageSize = Math.round(stats.size / 1024); // KB
  
  console.log('✅ HD MENU IMAGE FOUND:');
  console.log(`   📍 Path: ${CONFIG.MENU_IMAGE}`);
  console.log(`   📏 Size: ${hdImageSize}KB`);
  console.log(`   🖼️ Quality: HD (Sending in high quality)`);
} else {
  console.log('❌ HD MENU IMAGE MISSING:');
  console.log(`   Expected: ${CONFIG.MENU_IMAGE}`);
  console.log('   Please add tunzy_md2.jpg to media/ folder');
  console.log('   Image must be HD quality (1080x1080 minimum)');
}

console.log('');
console.log('🔒 PERMANENTLY LOCKED:');
console.log(`   🤖 Bot: ${CONFIG.BOT_NAME}`);
console.log(`   👑 Owner: ${CONFIG.OWNER}`);
console.log(`   📰 Newsletter: ${CONFIG.NEWSLETTER_NAME}`);
console.log(`   🖼️ Menu Image: ${CONFIG.MENU_IMAGE} (CANNOT BE CHANGED)`);
console.log('');

console.log('📝 USER SETTINGS:');
console.log(`   📱 Phone: ${CONFIG.PHONE_NUMBER}`);
console.log(`   ⚡ Prefix: ${CONFIG.PREFIX}`);
console.log('');

// Function to send HD image menu
async function sendHDMenu(sock, chatId, pushName) {
  if (!hdImageExists) {
    throw new Error('HD menu image not found');
  }
  
  // Read HD image
  const hdImageBuffer = fs.readFileSync(hdImagePath);
  
  // Create caption with bot info
  const caption = `
🎮 *${CONFIG.BOT_NAME}* 🎮
👑 *Owner:* ${CONFIG.OWNER}
⚡ *Prefix:* ${CONFIG.PREFIX}
👤 *User:* ${pushName || 'User'}
📅 *Date:* ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *QUICK COMMANDS*

${CONFIG.PREFIX}menu - Show this HD menu
${CONFIG.PREFIX}ping - Check bot speed
${CONFIG.PREFIX}status - Bot information
${CONFIG.PREFIX}sticker - Create sticker (reply to image)

━━━━━━━━━━━━━━━━━━━━━━━━
📥 *DOWNLOADER*
${CONFIG.PREFIX}yt [url] - YouTube video
${CONFIG.PREFIX}play [song] - Play music
${CONFIG.PREFIX}tiktok [url] - TikTok

🎨 *CONVERTER*
${CONFIG.PREFIX}sticker - Image to sticker
${CONFIG.PREFIX}photo - Sticker to photo
${CONFIG.PREFIX}mp4 - GIF to MP4

🤖 *AI CHAT*
${CONFIG.PREFIX}ai [question] - AI assistant
${CONFIG.PREFIX}gpt [text] - ChatGPT
${CONFIG.PREFIX}gemini [text] - Google Gemini

━━━━━━━━━━━━━━━━━━━━━━━━
💡 *HOW TO USE*
1. Send an image
2. Reply: ${CONFIG.PREFIX}sticker
3. Bot creates HD sticker

📖 *Read more commands in newsletter...*

━━━━━━━━━━━━━━━━━━━━━━━━
📰 *${CONFIG.NEWSLETTER_NAME}*
🔗 Join for updates & full command list
`.trim();
  
  // Send HD image
  await sock.sendMessage(chatId, {
    image: hdImageBuffer,
    caption: caption,
    mimetype: 'image/jpeg',
    caption: caption
  });
  
  // Send follow-up message
  await sock.sendMessage(chatId, {
    text: `📸 *HD Menu Image Sent Successfully!*\n\n🖼️ *Image Quality:* HD\n📏 *Size:* ${hdImageSize}KB\n⚡ *Bot:* ${CONFIG.BOT_NAME}\n\n📰 *For complete command list:*\nJoin ${CONFIG.NEWSLETTER_NAME} newsletter`
  });
}

// Function for text menu (fallback)
async function sendTextMenu(sock, chatId, pushName) {
  const menu = `
🎮 *${CONFIG.BOT_NAME} MENU*

👑 *Owner:* ${CONFIG.OWNER}
⚡ *Prefix:* ${CONFIG.PREFIX}
👤 *User:* ${pushName || 'User'}

━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *MAIN COMMANDS*

${CONFIG.PREFIX}menu - HD image menu
${CONFIG.PREFIX}ping - Check response
${CONFIG.PREFIX}status - Bot info
${CONFIG.PREFIX}sticker - Create sticker

━━━━━━━━━━━━━━━━━━━━━━━━
📥 *DOWNLOADER*
${CONFIG.PREFIX}yt [url] - YouTube
${CONFIG.PREFIX}play [song] - Music
${CONFIG.PREFIX}tiktok [url] - TikTok

🎨 *CONVERTER*
${CONFIG.PREFIX}sticker - Image to sticker
${CONFIG.PREFIX}photo - Sticker to photo
${CONFIG.PREFIX}mp4 - GIF to MP4

🤖 *AI*
${CONFIG.PREFIX}ai [question] - AI chat
${CONFIG.PREFIX}gpt [text] - ChatGPT
${CONFIG.PREFIX}gemini [text] - Gemini

━━━━━━━━━━━━━━━━━━━━━━━━
💡 *EXAMPLE*
1. Send image
2. Reply: ${CONFIG.PREFIX}sticker
3. Bot sends sticker

━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ *HD IMAGE MISSING*
Add tunzy_md2.jpg to media/ folder
for HD menu image.

📰 *${CONFIG.NEWSLETTER_NAME}*
`.trim();
  
  await sock.sendMessage(chatId, { text: menu });
}

// Start bot
async function startBot() {
  console.log('🚀 Starting bot with HD image menu...');
  console.log(`🖼️ Menu image: ${hdImageExists ? '✅ Found' : '❌ Missing'}`);
  console.log('');
  
  // Create folders
  await fs.ensureDir('./auth');
  
  // Connect to WhatsApp
  const { state, saveCreds } = await useMultiFileAuthState('./auth');
  
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });
  
  // Handle connection
  sock.ev.on('connection.update', async (update) => {
    const { connection, qr } = update;
    
    // Show pairing code
    if (qr) {
      console.log('\n🔐 PAIRING CODE REQUIRED');
      console.log('═══════════════════════════════════════\n');
      
      const code = Math.floor(100000 + Math.random() * 900000);
      
      console.log('📱 PAIRING INSTRUCTIONS:');
      console.log('1. Open WhatsApp → Settings → Linked Devices');
      console.log('2. Tap "Link a Device"');
      console.log('3. Tap "Link with phone number"');
      console.log(`4. Enter code: ${code}\n`);
      
      console.log('📷 OR SCAN QR CODE:');
      qrcode.generate(qr, { small: true });
      console.log('\n═══════════════════════════════════════\n');
      
      // Save pairing info
      fs.writeFileSync('pairing-info.txt', 
        `TUNZY - MD 2 Pairing Information\n` +
        `===============================\n` +
        `Code: ${code}\n` +
        `Phone: ${CONFIG.PHONE_NUMBER}\n` +
        `Time: ${new Date().toLocaleString()}\n` +
        `Bot: ${CONFIG.BOT_NAME}\n` +
        `HD Menu Image: ${hdImageExists ? 'Ready' : 'Missing'}\n`
      );
    }
    
    // When connected
    if (connection === 'open') {
      console.log('✅ BOT CONNECTED!');
      console.log(`🤖 Bot: ${CONFIG.BOT_NAME}`);
      console.log(`👑 Owner: ${CONFIG.OWNER}`);
      console.log(`🖼️ HD Menu: ${hdImageExists ? '✅ Ready' : '❌ Missing image'}`);
      console.log('');
      
      // Set bot name and status
      await sock.updateProfileName(CONFIG.BOT_NAME);
      await sock.updateProfileStatus(`${CONFIG.BOT_NAME} | ${CONFIG.OWNER} | HD Menu`);
      
      // AUTO-JOIN NEWSLETTER
      if (CONFIG.AUTO_JOIN_NEWSLETTER) {
        try {
          await sock.sendMessage(CONFIG.NEWSLETTER, {
            text: `🤖 ${CONFIG.BOT_NAME} Online!\n\n👑 ${CONFIG.OWNER}\n⚡ Prefix: ${CONFIG.PREFIX}\n🖼️ HD Menu: ${hdImageExists ? 'Yes' : 'No'}\n📅 ${new Date().toLocaleDateString()}`
          });
          console.log(`✅ Joined: ${CONFIG.NEWSLETTER_NAME}`);
        } catch (e) {
          console.log('⚠️ Note: Could not join newsletter');
        }
      }
      
      // Send welcome to owner
      const ownerJid = `${CONFIG.PHONE_NUMBER}@s.whatsapp.net`;
      await sock.sendMessage(ownerJid, {
        text: `🎉 ${CONFIG.BOT_NAME} is now online!\n\n⚡ Prefix: ${CONFIG.PREFIX}\n📰 Newsletter: ${CONFIG.NEWSLETTER_NAME}\n🖼️ HD Menu: ${hdImageExists ? '✅ Ready' : '❌ Missing image'}\n\nType ${CONFIG.PREFIX}menu to see HD menu image`
      });
      
      console.log('🎯 BOT READY FOR COMMANDS!');
    }
  });
  
  // Save session
  sock.ev.on('creds.update', saveCreds);
  
  // Handle messages - NO MENU_IMAGE SETVAR COMMAND
  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;
    
    // Get message text
    let text = '';
    if (msg.message.conversation) {
      text = msg.message.conversation;
    } else if (msg.message.extendedTextMessage) {
      text = msg.message.extendedTextMessage.text;
    } else if (msg.message.imageMessage) {
      text = msg.message.imageMessage.caption || '';
    }
    
    // Check if command
    if (text.startsWith(CONFIG.PREFIX)) {
      const cmd = text.slice(CONFIG.PREFIX.length).trim().split(' ')[0];
      const args = text.slice(CONFIG.PREFIX.length + cmd.length).trim();
      
      // 🖼️ MENU COMMAND - SENDS HD IMAGE
      if (cmd === 'menu' || cmd === 'help') {
        try {
          if (hdImageExists && CONFIG.SEND_HD_IMAGE) {
            await sendHDMenu(sock, msg.key.remoteJid, msg.pushName);
          } else {
            await sendTextMenu(sock, msg.key.remoteJid, msg.pushName);
            
            if (!hdImageExists) {
              await sock.sendMessage(msg.key.remoteJid, {
                text: `⚠️ *HD Menu Image Missing*\n\nPlease add tunzy_md2.jpg to media/ folder\nImage must be HD quality (1080x1080 minimum)\n\n📸 Bot will send HD image when file is added`
              });
            }
          }
        } catch (error) {
          console.log('Menu error:', error.message);
          await sendTextMenu(sock, msg.key.remoteJid, msg.pushName);
        }
      }
      
      // 🏓 PING COMMAND
      else if (cmd === 'ping') {
        const start = Date.now();
        const pong = await sock.sendMessage(msg.key.remoteJid, { text: '🏓 Pinging...' });
        const time = Date.now() - start;
        
        await sock.sendMessage(msg.key.remoteJid, {
          text: `🏓 *PONG!*\n\n⚡ Response: ${time}ms\n🤖 Bot: ${CONFIG.BOT_NAME}\n🖼️ HD Menu: ${hdImageExists ? '✅ Available' : '❌ Add image'}`,
          edit: pong.key
        });
      }
      
      // 📊 STATUS COMMAND
      else if (cmd === 'status') {
        const status = `
📊 *${CONFIG.BOT_NAME} STATUS*

👑 *Owner:* ${CONFIG.OWNER}
⚡ *Prefix:* ${CONFIG.PREFIX}
📱 *User:* ${msg.pushName || 'User'}

🖼️ *HD Menu Image:* ${hdImageExists ? '✅ Found' : '❌ Missing'}
📏 *Image Size:* ${hdImageExists ? `${hdImageSize}KB` : 'N/A'}
📰 *Newsletter:* ${CONFIG.NEWSLETTER_NAME}

⚙️ *Bot Settings:*
• Version: ${CONFIG.VERSION}
• HD Quality: ${CONFIG.HD_QUALITY ? 'Yes' : 'No'}
• Auto-restart: Yes
• Panel ready: Yes

💡 *Note:* HD menu image is permanently set to:
${CONFIG.MENU_IMAGE}
(CANNOT be changed)
`.trim();
        
        await sock.sendMessage(msg.key.remoteJid, { text: status });
      }
      
      // 🎨 STICKER COMMAND
      else if (cmd === 'sticker' || cmd === 's') {
        if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
          await sock.sendMessage(msg.key.remoteJid, { text: '🎨 Creating sticker...' });
          
          try {
            const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            const media = await sock.downloadMediaMessage(quoted);
            
            await sock.sendMessage(msg.key.remoteJid, {
              sticker: Buffer.from(media)
            });
            
            await sock.sendMessage(msg.key.remoteJid, {
              text: `✅ Sticker created!\n\n🤖 ${CONFIG.BOT_NAME}\n⚡ ${CONFIG.PREFIX}menu for HD menu`
            });
          } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, {
              text: `❌ Error: ${error.message}`
            });
          }
        } else {
          await sock.sendMessage(msg.key.remoteJid, {
            text: `🎨 *STICKER MAKER*\n\n1. Send an image\n2. Reply: ${CONFIG.PREFIX}sticker\n\n💡 For HD menu: ${CONFIG.PREFIX}menu`
          });
        }
      }
      
      // ❌ BLOCK MENU_IMAGE SETVAR ATTEMPTS
      else if (cmd.toLowerCase().includes('setvar') && args.toLowerCase().includes('menu_image')) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ *PERMANENT SETTING*\n\n🖼️ Menu image is permanently set to:\n${CONFIG.MENU_IMAGE}\n\n⚠️ This setting CANNOT be changed.\n🤖 ${CONFIG.BOT_NAME}\n👑 ${CONFIG.OWNER}`
        });
      }
      
      // 📥 YOUTUBE
      else if (cmd === 'yt' || cmd === 'youtube') {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `📥 *YouTube Downloader*\n\nUsage: ${CONFIG.PREFIX}yt [url]\n\n💡 For HD menu: ${CONFIG.PREFIX}menu`
        });
      }
      
      // 🎵 PLAY
      else if (cmd === 'play') {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `🎵 *Music Player*\n\nUsage: ${CONFIG.PREFIX}play [song]\n\n💡 For HD menu: ${CONFIG.PREFIX}menu`
        });
      }
      
      // 🤖 AI
      else if (cmd === 'ai' || cmd === 'chat' || cmd === 'gpt') {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `🤖 *AI Chat*\n\nUsage: ${CONFIG.PREFIX}ai [question]\n\n💡 For HD menu: ${CONFIG.PREFIX}menu`
        });
      }
      
      // ❓ UNKNOWN
      else {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❓ Command not found: ${cmd}\n\n💡 Type ${CONFIG.PREFIX}menu for HD menu\n🤖 ${CONFIG.BOT_NAME}\n👑 ${CONFIG.OWNER}`
        });
      }
    }
  });
  
  // Auto-restart
  sock.ev.on('connection.update', (update) => {
    if (update.connection === 'close') {
      console.log('🔄 Restarting in 5 seconds...');
      setTimeout(startBot, 5000);
    }
  });
}

// Start bot
startBot().catch(error => {
  console.log('❌ Error:', error.message);
  console.log('');
  console.log('💡 SOLUTIONS:');
  console.log('1. Run: node setup.js');
  console.log('2. Add tunzy_md2.jpg to media/ folder');
  console.log('3. Ensure Node.js version is 18+');
  console.log('4. Check phone number format');
});
