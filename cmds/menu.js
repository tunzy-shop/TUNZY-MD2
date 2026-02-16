const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

module.exports = {
    name: 'menu',
    alias: ['help', 'cmd', 'commands'],
    description: 'Show all bot commands',
    ownerOnly: false,
    
    execute: async (sock, m, args, sender, config) => {
        const chatId = m.key.remoteJid;
        
        // Read more invisible character
        const readMore = String.fromCharCode(8206).repeat(4001);
        
        // Get current time
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        
        // Build menu with categories
        const menuText = `┏━━━━━━━━━━━━━━━━━━━
┃ *TUNZY-MD*
┃ *Version* : 2.0.0
┃ *Owner*  : TUNZY SHOP
┃ *YouTube*: Tunzy Shop
┃ *Time*: ${time}
┃ *Date*: ${date}
┗━━━━━━━━━━━━━━━━━━━
${readMore}

┏ 𝗔𝗜 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}openai
│ ${config.PREFIX}gpt
│ ${config.PREFIX}gemini
│ ${config.PREFIX}aisearch
│ ${config.PREFIX}mistral
│ ${config.PREFIX}deepseek
│ ${config.PREFIX}reasoning
│ ${config.PREFIX}coder
│ ${config.PREFIX}llama
│ ${config.PREFIX}bidara
│ ${config.PREFIX}chatbot
│ ${config.PREFIX}aitest
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗔𝗡𝗜𝗠𝗘 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}anime
│ ${config.PREFIX}waifu
│ ${config.PREFIX}manga
│ ${config.PREFIX}animequote
│ ${config.PREFIX}animenews
│ ${config.PREFIX}character
│ ${config.PREFIX}animesearch
│ ${config.PREFIX}animewatch
│ ${config.PREFIX}animegif
│ ${config.PREFIX}season
│ ${config.PREFIX}animerec
│ ${config.PREFIX}airing
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗙𝗨𝗡 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}slap
│ ${config.PREFIX}cry
│ ${config.PREFIX}hug
│ ${config.PREFIX}kiss
│ ${config.PREFIX}lick
│ ${config.PREFIX}pat
│ ${config.PREFIX}blush
│ ${config.PREFIX}kill
│ ${config.PREFIX}kik
│ ${config.PREFIX}bite
│ ${config.PREFIX}high-five
│ ${config.PREFIX}handhold
│ ${config.PREFIX}dance
│ ${config.PREFIX}bully
│ ${config.PREFIX}wink
│ ${config.PREFIX}cuddle
│ ${config.PREFIX}awoo
│ ${config.PREFIX}cringe
│ ${config.PREFIX}megumin
│ ${config.PREFIX}shinobu
│ ${config.PREFIX}pickupline
│ ${config.PREFIX}breakup
│ ${config.PREFIX}insult
│ ${config.PREFIX}emojimix
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}sticker
│ ${config.PREFIX}photo
│ ${config.PREFIX}ptv
│ ${config.PREFIX}mp4
│ ${config.PREFIX}gif
│ ${config.PREFIX}tomp3
│ ${config.PREFIX}black
│ ${config.PREFIX}roundstk
│ ${config.PREFIX}circlestk
│ ${config.PREFIX}take
│ ${config.PREFIX}exif
│ ${config.PREFIX}aitts
│ ${config.PREFIX}doc
│ ${config.PREFIX}tovv
│ ${config.PREFIX}bass
│ ${config.PREFIX}blown
│ ${config.PREFIX}deep
│ ${config.PREFIX}earrape
│ ${config.PREFIX}fast
│ ${config.PREFIX}fat
│ ${config.PREFIX}nightcore
│ ${config.PREFIX}reverse
│ ${config.PREFIX}squirrel
│ ${config.PREFIX}robot
│ ${config.PREFIX}slow
│ ${config.PREFIX}smooth
│ ${config.PREFIX}chipmunk
│ ${config.PREFIX}tremolo
│ ${config.PREFIX}vibrato
│ ${config.PREFIX}8d
│ ${config.PREFIX}echo
│ ${config.PREFIX}flanger
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}apk
│ ${config.PREFIX}subtitle
│ ${config.PREFIX}ytv
│ ${config.PREFIX}yta
│ ${config.PREFIX}video
│ ${config.PREFIX}play
│ ${config.PREFIX}videodoc
│ ${config.PREFIX}playdoc
│ ${config.PREFIX}ytvdoc
│ ${config.PREFIX}ytadoc
│ ${config.PREFIX}tt
│ ${config.PREFIX}tik-img
│ ${config.PREFIX}twitter
│ ${config.PREFIX}fb
│ ${config.PREFIX}insta
│ ${config.PREFIX}mediafire
│ ${config.PREFIX}gitclone
│ ${config.PREFIX}pint
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗦𝗘𝗔𝗥𝗖𝗛 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}apksearch
│ ${config.PREFIX}subtitlesearch
│ ${config.PREFIX}websearch
│ ${config.PREFIX}img
│ ${config.PREFIX}npm
│ ${config.PREFIX}shazam
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗘𝗖𝗢𝗡𝗢𝗠𝗬 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}economy
│ ${config.PREFIX}bal
│ ${config.PREFIX}daily
│ ${config.PREFIX}dep
│ ${config.PREFIX}with
│ ${config.PREFIX}give
│ ${config.PREFIX}work
│ ${config.PREFIX}rob
│ ${config.PREFIX}gamble
│ ${config.PREFIX}lb
│ ${config.PREFIX}shop
│ ${config.PREFIX}buy
│ ${config.PREFIX}inv
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗧𝗘𝗫𝗧𝗠𝗔𝗞𝗘𝗥 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}neonlight
│ ${config.PREFIX}typography
│ ${config.PREFIX}wetglass
│ ${config.PREFIX}light
│ ${config.PREFIX}pubgtext
│ ${config.PREFIX}pubglogo
│ ${config.PREFIX}valorant
│ ${config.PREFIX}codtext
│ ${config.PREFIX}lolwp
│ ${config.PREFIX}amongus
│ ${config.PREFIX}angel
│ ${config.PREFIX}green
│ ${config.PREFIX}neontext
│ ${config.PREFIX}glow
│ ${config.PREFIX}lightb
│ ${config.PREFIX}glitter
│ ${config.PREFIX}watercolor
│ ${config.PREFIX}paper
│ ${config.PREFIX}glitch
│ ${config.PREFIX}metal
│ ${config.PREFIX}galaxy
│ ${config.PREFIX}blue
│ ${config.PREFIX}galaxyw
│ ${config.PREFIX}glossy
│ ${config.PREFIX}glass2
│ ${config.PREFIX}glow2
│ ${config.PREFIX}wood
│ ${config.PREFIX}slight
│ ${config.PREFIX}sketch
│ ${config.PREFIX}zodiac
│ ${config.PREFIX}floral
│ ${config.PREFIX}hacker
│ ${config.PREFIX}neondvl
│ ${config.PREFIX}crack
│ ${config.PREFIX}scifi
│ ${config.PREFIX}sand
│ ${config.PREFIX}letter
│ ${config.PREFIX}gaming
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗚𝗔𝗠𝗘 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}ttt
│ ${config.PREFIX}wcg
│ ${config.PREFIX}delwcg
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗚𝗥𝗢𝗨𝗣 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}join
│ ${config.PREFIX}leave
│ ${config.PREFIX}gpp
│ ${config.PREFIX}gname
│ ${config.PREFIX}gdesc
│ ${config.PREFIX}add
│ ${config.PREFIX}kick
│ ${config.PREFIX}promote
│ ${config.PREFIX}demote
│ ${config.PREFIX}mute
│ ${config.PREFIX}unmute
│ ${config.PREFIX}invite
│ ${config.PREFIX}revoke
│ ${config.PREFIX}tag
│ ${config.PREFIX}tagall
│ ${config.PREFIX}creategc
│ ${config.PREFIX}lock
│ ${config.PREFIX}unlock
│ ${config.PREFIX}ginfo
│ ${config.PREFIX}antibbot
│ ${config.PREFIX}events
│ ${config.PREFIX}antilink
│ ${config.PREFIX}akick
│ ${config.PREFIX}antiword
│ ${config.PREFIX}warn
│ ${config.PREFIX}antigm
│ ${config.PREFIX}antispam
│ ${config.PREFIX}antitag
│ ${config.PREFIX}kickr
│ ${config.PREFIX}pick
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗧𝗢𝗢𝗟𝗦 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}msgs
│ ${config.PREFIX}listonline
│ ${config.PREFIX}listoffline
│ ${config.PREFIX}quoted
│ ${config.PREFIX}element
│ ${config.PREFIX}setcmd
│ ${config.PREFIX}delcmd
│ ${config.PREFIX}listcmd
│ ${config.PREFIX}permit
│ ${config.PREFIX}mention
│ ${config.PREFIX}afk
│ ${config.PREFIX}react
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗜𝗠𝗔𝗚𝗘 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}remini
│ ${config.PREFIX}gfx
│ ${config.PREFIX}gfx2
│ ${config.PREFIX}gfx3
│ ${config.PREFIX}gfx4
│ ${config.PREFIX}gfx5
│ ${config.PREFIX}gfx6
│ ${config.PREFIX}gfx7
│ ${config.PREFIX}gfx8
│ ${config.PREFIX}gfx9
│ ${config.PREFIX}gfx10
│ ${config.PREFIX}gfx11
│ ${config.PREFIX}gfx12
│ ${config.PREFIX}invert
│ ${config.PREFIX}naturewp
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗜𝗠𝗔𝗚𝗘-𝗠𝗘𝗠𝗘 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}carbon
│ ${config.PREFIX}wanted
│ ${config.PREFIX}wasted
│ ${config.PREFIX}rainbow
│ ${config.PREFIX}trigger-meme
│ ${config.PREFIX}rip-meme
│ ${config.PREFIX}mnm
│ ${config.PREFIX}jail
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗕𝗢𝗧 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}ping
│ ${config.PREFIX}ban
│ ${config.PREFIX}unban
│ ${config.PREFIX}banlist
│ ${config.PREFIX}uptime
│ ${config.PREFIX}runtime
│ ${config.PREFIX}stats
│ ${config.PREFIX}owner
│ ${config.PREFIX}repo
│ ${config.PREFIX}update
│ ${config.PREFIX}ignore
│ ${config.PREFIX}allow
│ ${config.PREFIX}bot
│ ${config.PREFIX}mute-user
│ ${config.PREFIX}unmute-user
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗣𝗥𝗢𝗖𝗘𝗦𝗦 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}restart
│ ${config.PREFIX}shutdown
│ ${config.PREFIX}p-status
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗠𝗜𝗦𝗖 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}quote
│ ${config.PREFIX}fact
│ ${config.PREFIX}q
│ ${config.PREFIX}ebinary
│ ${config.PREFIX}dbinary
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗨𝗧𝗜𝗟𝗜𝗧𝗜𝗘𝗦 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}addnote
│ ${config.PREFIX}delnote
│ ${config.PREFIX}allnotes
│ ${config.PREFIX}getnote
│ ${config.PREFIX}delallnote
│ ${config.PREFIX}ss
│ ${config.PREFIX}sstab
│ ${config.PREFIX}ssphone
│ ${config.PREFIX}ssfull
│ ${config.PREFIX}tts
│ ${config.PREFIX}audio2text
│ ${config.PREFIX}wm
│ ${config.PREFIX}url
│ ${config.PREFIX}temp-url
│ ${config.PREFIX}readmore
│ ${config.PREFIX}define
│ ${config.PREFIX}weather
│ ${config.PREFIX}tinyurl
│ ${config.PREFIX}vv
│ ${config.PREFIX}pdf
│ ${config.PREFIX}calc
│ ${config.PREFIX}trt
│ ${config.PREFIX}ngl
│ ${config.PREFIX}ip
│ ${config.PREFIX}wiki
│ ${config.PREFIX}bible
│ ${config.PREFIX}font
│ ${config.PREFIX}compress
│ ${config.PREFIX}getdevice
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗣𝗟𝗨𝗚𝗜𝗡𝗦 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}plugin
│ ${config.PREFIX}remove
│ ${config.PREFIX}plugins
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗨𝗦𝗘𝗥 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}rmbg
│ ${config.PREFIX}delete
│ ${config.PREFIX}archive
│ ${config.PREFIX}unarchive
│ ${config.PREFIX}jid
│ ${config.PREFIX}pp
│ ${config.PREFIX}removepp
│ ${config.PREFIX}clear
│ ${config.PREFIX}pinchat
│ ${config.PREFIX}unpinchat
│ ${config.PREFIX}block
│ ${config.PREFIX}unblock
│ ${config.PREFIX}blocklist
│ ${config.PREFIX}setname
│ ${config.PREFIX}bio
│ ${config.PREFIX}getpp
│ ${config.PREFIX}forward
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗖𝗢𝗡𝗙𝗜𝗚 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}setvar
│ ${config.PREFIX}getvar
│ ${config.PREFIX}delvar
│ ${config.PREFIX}allvar
│ ${config.PREFIX}readstatus
│ ${config.PREFIX}likestatus
│ ${config.PREFIX}startupmsg
│ ${config.PREFIX}alwaysonline
│ ${config.PREFIX}antidelete
│ ${config.PREFIX}antiedit
│ ${config.PREFIX}antieditchat
│ ${config.PREFIX}savestatus
│ ${config.PREFIX}cmdreact
│ ${config.PREFIX}readmsg
│ ${config.PREFIX}rejectcall
│ ${config.PREFIX}setsudo
│ ${config.PREFIX}delsudo
│ ${config.PREFIX}getsudo
│ ${config.PREFIX}setmod
│ ${config.PREFIX}delmod
│ ${config.PREFIX}getmods
│ ${config.PREFIX}mode
│ ${config.PREFIX}statusemoji
│ ${config.PREFIX}savecmd
│ ${config.PREFIX}vvcmd
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗣𝗥𝗜𝗩𝗔𝗖𝗬 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}lastseen
│ ${config.PREFIX}online
│ ${config.PREFIX}mypp
│ ${config.PREFIX}mystatus
│ ${config.PREFIX}read
│ ${config.PREFIX}allow-gcadd
┕    ─┉─ • ─┉─   ┙ 

┏ 𝗔𝗨𝗧𝗢𝗥𝗘𝗣𝗟𝗬 ┓
┍   ─┉─ • ─┉─    ┑ 
│ ${config.PREFIX}pfilter
│ ${config.PREFIX}pstop
│ ${config.PREFIX}gfilter
│ ${config.PREFIX}gstop
┕    ─┉─ • ─┉─   ┙ 

*📢 Join Official Channel*
${config.CHANNEL_LINK || 'https://whatsapp.com/channel/yourchannelid'}
`;

        // Send menu with image
        try {
            const imagePath = path.join(__dirname, '../assets/tunzy_md2.jpg');
            
            // Check if image exists
            if (await fs.pathExists(imagePath)) {
                await sock.sendMessage(chatId, {
                    image: { url: imagePath },
                    caption: menuText,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: config.CHANNEL_JID,
                            newsletterName: 'TUNZY-MD',
                            serverMessageId: -1
                        }
                    }
                }, { quoted: m });
            } else {
                // Send without image
                await sock.sendMessage(chatId, {
                    text: menuText,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: config.CHANNEL_JID,
                            newsletterName: 'TUNZY-MD',
                            serverMessageId: -1
                        }
                    }
                }, { quoted: m });
            }
        } catch (error) {
            console.error('Error sending menu:', error);
            // Fallback to text only
            await sock.sendMessage(chatId, { text: menuText }, { quoted: m });
        }
    }
};
