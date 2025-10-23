// ======================================================
// 👋 Command: !welcome — Sistem pesan selamat datang (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

// Database sederhana untuk menyimpan pengaturan welcome
const welcomeSettings = new Map();

export async function handleWelcome(sock, msg, args) {
  try {
    const { isGroup, chat } = await getChatContext(sock, msg);
    if (!isGroup) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Perintah ini hanya bisa digunakan di grup!'
      });
      return;
    }

    if (args.length === 0) {
      // Tampilkan status welcome
      const isEnabled = welcomeSettings.get(chat.id._serialized) || false;
      const status = isEnabled ? '✅ Aktif' : '❌ Nonaktif';
      
      await sock.sendMessage(msg.key.remoteJid, {
        text: `👋 *Pengaturan Welcome Message*\n\n` +
        `📊 Status: ${status}\n\n` +
        `💡 *Cara Penggunaan:*\n` +
        `• !welcome on - Aktifkan welcome message\n` +
        `• !welcome off - Nonaktifkan welcome message\n` +
        `• !welcome set "pesan" - Set custom message\n` +
        `• !welcome - Tampilkan status`
      });
      return;
    }

    const action = args[0].toLowerCase();
    
    switch (action) {
      case 'on':
        welcomeSettings.set(chat.id._serialized, true);
        await sock.sendMessage(msg.key.remoteJid, {
          text: '✅ Welcome message diaktifkan!'
        });
        break;
        
      case 'off':
        welcomeSettings.set(chat.id._serialized, false);
        await sock.sendMessage(msg.key.remoteJid, {
          text: '❌ Welcome message dinonaktifkan!'
        });
        break;
        
      case 'set':
        if (args.length < 2) {
          await sock.sendMessage(msg.key.remoteJid, {
            text: '❌ Format salah! Gunakan: !welcome set "pesan custom"'
          });
          return;
        }
        
        const customMessage = args.slice(1).join(' ').replace(/"/g, '');
        welcomeSettings.set(`${chat.id._serialized}_message`, customMessage);
        welcomeSettings.set(chat.id._serialized, true);
        
        await sock.sendMessage(msg.key.remoteJid, {
          text: `✅ Custom welcome message diset!\n\n📝 Pesan: "${customMessage}"`
        });
        break;
        
      default:
        await sock.sendMessage(msg.key.remoteJid, {
          text: '❌ Perintah tidak dikenali! Gunakan: on, off, atau set'
        });
    }
  } catch (err) {
    console.error('❌ Gagal menjalankan !welcome:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengatur welcome message.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}

// Fungsi untuk mengirim welcome message saat ada member baru
export async function sendWelcomeMessage(sock, chatId, newMember) {
  try {
    const isEnabled = welcomeSettings.get(chatId);
    if (!isEnabled) return;

    const customMessage = welcomeSettings.get(`${chatId}_message`);
    
    let welcomeText = customMessage || 
      `👋 *Selamat Datang di Grup!*\n\n` +
      `👤 User: @${newMember.split('@')[0]}\n\n` +
      `💡 Jangan lupa baca rules grup dan gunakan *!help* untuk melihat command yang tersedia!`;
    
    await sock.sendMessage(chatId, {
      text: welcomeText,
      mentions: [newMember]
    });
  } catch (err) {
    console.error('❌ Gagal mengirim welcome message:', err);
  }
}

export { welcomeSettings };