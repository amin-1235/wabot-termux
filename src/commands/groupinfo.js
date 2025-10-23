// ======================================================
// 📊 Command: !groupinfo — Informasi grup (Baileys Compatible)
// ======================================================

import { getChatContext } from '../core/context.js';

export async function handleGroupInfo(sock, msg) {
  try {
    const { isGroup, chat } = await getChatContext(sock, msg);
    if (!isGroup) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Perintah ini hanya bisa digunakan di grup!'
      });
      return;
    }

    // Get group info
    const groupName = chat.name;
    const participantCount = chat.participants.length;
    const admins = chat.participants.filter(p => p.admin === 'admin');
    
    // Get group description (if available)
    const description = 'Tidak ada deskripsi'; // Baileys doesn't provide description easily
    
    let infoText = `📊 *Informasi Grup*\n\n`;
    infoText += `🏠 *Nama Grup:* ${groupName}\n`;
    infoText += `👥 *Total Member:* ${participantCount}\n`;
    infoText += `👑 *Admin:* ${admins.length}\n`;
    infoText += `📝 *Deskripsi:* ${description}\n\n`;
    
    // List admins
    if (admins.length > 0) {
      infoText += `👑 *Daftar Admin:*\n`;
      for (const admin of admins.slice(0, 5)) { // Limit to 5 admins
        const adminName = admin.id.split('@')[0];
        infoText += `• @${adminName}\n`;
      }
      if (admins.length > 5) {
        infoText += `• ... dan ${admins.length - 5} admin lainnya\n`;
      }
    }
    
    infoText += `\n💡 Gunakan *!help* untuk melihat command yang tersedia!`;
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: infoText
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !groupinfo:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengambil informasi grup.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}