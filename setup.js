const fs = require('fs-extra');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
╔═══════════════════════════════════════╗
║      TUNZY - MD 2 SETUP WIZARD       ║
╚═══════════════════════════════════════╝
`);

console.log('🔒 PERMANENTLY LOCKED SETTINGS:');
console.log('  🤖 Bot Name: TUNZY - MD 2');
console.log('  👑 Owner: Tunzy Shop');
console.log('  📰 Newsletter: TUNZY TECH');
console.log('  🖼️ Menu Image: media/tunzy_md2.jpg (HD REQUIRED)');
console.log('');

// Check for HD image
if (!fs.existsSync('media/tunzy_md2.jpg')) {
  console.log('❌ ERROR: HD menu image not found!');
  console.log('');
  console.log('⚠️  IMPORTANT:');
  console.log('1. Create folder: media/');
  console.log('2. Add HD image: tunzy_md2.jpg');
  console.log('3. Image must be HD quality (min 1080x1080)');
  console.log('4. File must be JPG format');
  console.log('');
  console.log('📸 Image will be sent in HD when users type menu command');
  console.log('');
  
  // Create media folder
  fs.ensureDirSync('media');
  
  console.log('✅ Created media/ folder');
  console.log('❌ Please add tunzy_md2.jpg to media/ folder');
  console.log('');
}

rl.question('📱 Enter your WhatsApp number:\nExample: 6281234567890\n> ', (phone) => {
  
  rl.question('\n⚡ Enter bot prefix (default: +):\n> ', (prefix) => {
    
    // Create PERMANENT config - NO MENU_IMAGE SETVAR
    const configCode = `
// ⚠️ PERMANENTLY LOCKED CONFIGURATION ⚠️
// DO NOT EDIT - SETTINGS ARE HARDCODED

module.exports = {
    // 🔒 PERMANENT BRANDING (CANNOT BE CHANGED)
    BOT_NAME: "TUNZY - MD 2",
    OWNER: "Tunzy Shop",
    NEWSLETTER: "120363422591784062@newsletter",
    NEWSLETTER_NAME: "TUNZY TECH",
    
    // 🖼️ PERMANENT MENU IMAGE (CANNOT BE CHANGED)
    // Image must be: media/tunzy_md2.jpg
    // Must be HD quality (1080x1080 minimum)
    MENU_IMAGE: "media/tunzy_md2.jpg",
    
    // ✏️ USER SETTINGS (CAN BE SET ONCE)
    PHONE_NUMBER: "${phone}",
    PREFIX: "${prefix || "+"}",
    
    // ⚙️ BOT SETTINGS
    VERSION: "2.0.0",
    HD_QUALITY: true,
    AUTO_JOIN_NEWSLETTER: true,
    SEND_HD_IMAGE: true
};
`;
    
    fs.writeFileSync('config.js', configCode);
    
    // Create media folder if not exists
    fs.ensureDirSync('media');
    
    console.log(`
✅ SETUP COMPLETE!

📱 Phone: ${phone}
⚡ Prefix: ${prefix || "+"}

🔒 PERMANENTLY LOCKED:
🤖 Bot: TUNZY - MD 2
👑 Owner: Tunzy Shop
📰 Newsletter: TUNZY TECH
🖼️ Menu Image: media/tunzy_md2.jpg (HD)

⚠️  IMPORTANT:
• Menu image CANNOT be changed
• Image must be HD quality
• Bot will send image in HD
• Users CANNOT use setvar MENU_IMAGE

NEXT STEPS:
1. Add HD image: tunzy_md2.jpg to media/ folder
2. Run: npm install
3. Run: npm start
4. Check pairing code
5. Pair your phone

📸 IMAGE REQUIREMENTS:
• HD quality (1080x1080 or higher)
• JPG format
• File size: 1-5MB recommended
• Square aspect ratio
    `);
    
    rl.close();
  });
});
