// commands/merci.js
const merciCommand = {
  name: 'merci',
  description: 'Remercie les personnes qui contribuent au bot',
  aliases: ['thanks', 'credits', 'remerciements'],
  category: 'informations',
  restrictions: {},
  
  execute: async ({ msg, client, sender, args, isGroup, isOwner, isAdmin, pushname, prefix, config }) => {
    
    const NEWSLETTER_ID = config.menuMedia.newsletter.replace('@newsletter', '');
    const newsletterJid = config.menuMedia.newsletter;
    const newsletterName = config.menuMedia.newsletterName || "Merci Channel";
    const IMAGE_URL = config.menuMedia.image;
    const SOURCE_URL = config.menuMedia.sourceUrl;

    // ===== DÉCOR MODIFIABLE =====
    // ↓↓↓ TU PEUX MODIFIER LES NOMS ICI ↓↓↓
    const merciText = `
╭━━━〔 𝗠𝗘𝗥𝗖𝗜 𝗔̀ 𝗧𝗢𝗨𝗦 〕━━━┈⪨
┇┏───♦︎
┃│ 👤 Demandé par : ${pushname}
┃│ 🙏 Remerciements spéciaux
┇┗───♦︎
╰━━━━━━━━━━━━━━━┈⪨

┌── ✦ *CONTRIBUTEURS* ✦
├ 👑 Blood Angel – Créateur & Développeur
├ 🧪 Sayan Angels 10 – Équipe générale
├ 🛡️ Dev Messy – Support & Modération
├ 💻 Crazy Dev † David Cyril
├ 🎨 Le Mec Idéal x Hiro
├ ☁️ Mr Kévin Tsh
├ 🌍 GENESIS INFO TV
├ 📚 Lumy Tsh Grimm
├ 🔧 Mr Lucius SA¹⁰
├ 🌟 Euh, j'ai oublié le dernier.
└────────────────
Si tu veux être cité, faut payer deh.
┌── ✦ *REMERCIEMENTS* ✦
├ 💝 À tous les utilisateurs
├ 🌟 Aux testeurs et rapporteurs de bugs
├ 🔧 À la communauté WhatsApp
└────────────────

┌── ✦ *INFORMATIONS* ✦
├ 🤖 Bot : ${config.botName}
├ 📦 Version : ${config.version}
├ 📢 Newsletter : @${NEWSLETTER_ID}
└────────────────

> *𝙲𝙾𝙿𝚈𝚁𝙸𝙶𝙷𝚃 𝟸𝟶𝟸𝟼 - 𝟸𝟶𝟸𝟽*
    `;

    try {
      // Réaction
      await client.sendMessage(sender, { 
        react: { text: "🙏", key: msg.key } 
      });

      // Bannière publicitaire
      const externalAdReply = {
        title: `🙏 ${pushname} • REMERCIEMENTS 🙏`,
        body: `${config.botName}`,
        thumbnailUrl: IMAGE_URL,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: SOURCE_URL
      };

      // Envoi du message
      await client.sendMessage(sender, {
        text: merciText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: externalAdReply,
          forwardedNewsletterMessageInfo: {
            newsletterJid: newsletterJid,
            newsletterName: newsletterName,
            serverMessageId: -1
          }
        },
        mentions: [sender]
      }, { quoted: msg });

      // Réaction finale
      await client.sendMessage(sender, { 
        react: { text: "✅", key: msg.key } 
      });

    } catch (error) {
      console.error('❌ Erreur merci:', error);
      await client.sendMessage(sender, { 
        text: '❌ Une erreur est survenue.' 
      });
    }
  }
};

export default merciCommand;