// ======================================================
// 🛡️ Command: !antispam — Sistem anti-spam (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

// Database untuk tracking spam
const spamTracker = new Map();
const antispamSettings = new Map();

export async function handleAntispam(sock, msg, args) {
  try {
    const { isGroup, chat } = await getChatContext(sock, msg);
    if (!isGroup) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Perintah ini hanya bisa digunakan di grup!'
      });
      return;
    }

    if (args.length === 0) {
      // Tampilkan status antispam
      const settings = antispamSettings.get(chat.id._serialized) || {
        enabled: false,
        maxMessages: 5,
        timeWindow: 60, // detik
        action: 'warn' // warn, mute, kick
      };
      
      const status = settings.enabled ? '✅ Aktif' : '❌ Nonaktif';
      
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🛡️ *Pengaturan Anti-Spam*\n\n` +
        `📊 Status: ${status}\n` +
        `📝 Max Messages: ${settings.maxMessages}\n` +
        `⏰ Time Window: ${settings.timeWindow}s\n` +
        `⚡ Action: ${settings.action}\n\n` +
        `💡 *Cara Penggunaan:*\n` +
        `• !antispam on - Aktifkan anti-spam\n` +
        `• !antispam off - Nonaktifkan anti-spam\n` +
        `• !antispam set maxMessages timeWindow action - Set pengaturan\n` +
        `• !antispam - Tampilkan status`
      });
      return;
    }

    const action = args[0].toLowerCase();
    
    switch (action) {
      case 'on':
        const defaultSettings = {
          enabled: true,
          maxMessages: 5,
          timeWindow: 60,
          action: 'warn'
        };
        antispamSettings.set(chat.id._serialized, defaultSettings);
        await sock.sendMessage(msg.key.remoteJid, {
          text: '✅ Anti-spam diaktifkan dengan pengaturan default!'
        });
        break;
        
      case 'off':
        antispamSettings.set(chat.id._serialized, { enabled: false });
        await sock.sendMessage(msg.key.remoteJid, {
          text: '❌ Anti-spam dinonaktifkan!'
        });
        break;
        
      case 'set':
        if (args.length < 4) {
          await sock.sendMessage(msg.key.remoteJid, {
            text: '❌ Format salah! Gunakan: !antispam set maxMessages timeWindow action'
          });
          return;
        }
        
        const maxMessages = parseInt(args[1]);
        const timeWindow = parseInt(args[2]);
        const actionType = args[3].toLowerCase();
        
        if (isNaN(maxMessages) || isNaN(timeWindow) || !['warn', 'mute', 'kick'].includes(actionType)) {
          await sock.sendMessage(msg.key.remoteJid, {
            text: '❌ Parameter tidak valid!'
          });
          return;
        }
        
        antispamSettings.set(chat.id._serialized, {
          enabled: true,
          maxMessages,
          timeWindow,
          action: actionType
        });
        
        await sock.sendMessage(msg.key.remoteJid, {
          text: `✅ Anti-spam diset!\n📝 Max: ${maxMessages}, Time: ${timeWindow}s, Action: ${actionType}`
        });
        break;
        
      default:
        await sock.sendMessage(msg.key.remoteJid, {
          text: '❌ Perintah tidak dikenali! Gunakan: on, off, atau set'
        });
    }
  } catch (err) {
    console.error('❌ Gagal menjalankan !antispam:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengatur anti-spam.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}

// Fungsi untuk cek spam
export async function checkSpam(sock, msg) {
  try {
    const { isGroup, chat } = await getChatContext(sock, msg);
    
    if (!isGroup) return false; // Anti-spam hanya untuk grup
    
    const settings = antispamSettings.get(chat.id._serialized);
    
    if (!settings || !settings.enabled) return false;
    
    const userId = msg.key.remoteJid;
    const now = Date.now();
    const timeWindow = settings.timeWindow * 1000;
    
    // Get user's message history
    if (!spamTracker.has(userId)) {
      spamTracker.set(userId, []);
    }
    
    const userMessages = spamTracker.get(userId);
    
    // Remove old messages outside time window
    const recentMessages = userMessages.filter(time => now - time < timeWindow);
    recentMessages.push(now);
    
    spamTracker.set(userId, recentMessages);
    
    // Check if user exceeded limit
    if (recentMessages.length > settings.maxMessages) {
      await handleSpamAction(sock, chat, msg, settings.action);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error('❌ Error checking spam:', err);
    return false;
  }
}

async function handleSpamAction(sock, chat, msg, action) {
  try {
    const userId = msg.key.remoteJid;
    const memberName = userId.split('@')[0];
    
    switch (action) {
      case 'warn':
        await sock.sendMessage(chat.id._serialized, {
          text: `⚠️ *PERINGATAN SPAM!*\n\n` +
          `👤 User: @${memberName}\n` +
          `📝 Jangan kirim pesan terlalu sering!\n` +
          `🛡️ Sistem anti-spam aktif!`,
          mentions: [userId]
        });
        break;
        
      case 'mute':
        await sock.sendMessage(chat.id._serialized, {
          text: `🔇 *USER DI-MUTE!*\n\n` +
          `👤 User: @${memberName}\n` +
          `📝 Terlalu banyak pesan dalam waktu singkat!`,
          mentions: [userId]
        });
        // Note: Baileys doesn't have direct mute functionality
        break;
        
      case 'kick':
        await sock.sendMessage(chat.id._serialized, {
          text: `👢 *USER DI-KICK!*\n\n` +
          `👤 User: @${memberName}\n` +
          `📝 Melanggar aturan anti-spam!`,
          mentions: [userId]
        });
        await sock.groupParticipantsUpdate(chat.id._serialized, [userId], 'remove');
        break;
    }
  } catch (err) {
    console.error('❌ Error handling spam action:', err);
  }
}

export { spamTracker, antispamSettings };