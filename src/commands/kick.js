// ======================================================
// 👢 Command: !kick — Keluarkan user dari grup (Baileys Compatible)
// ======================================================

import { getUserRoleLevel, ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleKick(sock, msg, args) {
  try {
    const { isGroup, chat } = await getChatContext(sock, msg);
    if (!isGroup) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Perintah ini hanya bisa digunakan di grup!'
      });
      return;
    }

    // Cek apakah user adalah admin grup
    const participant = chat.participants.find(p => p.id === msg.key.remoteJid);
    if (!participant || participant.admin !== 'admin') {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Hanya admin grup yang bisa menggunakan perintah ini!'
      });
      return;
    }

    if (args.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `👢 *Cara Penggunaan Kick*\n\n` +
        `📝 *Format:* !kick @user atau !kick 628xxxxxxxxx\n` +
        `💡 *Contoh:* !kick @6281234567890\n\n` +
        `⚠️ *Peringatan:* User akan dikeluarkan dari grup!`
      });
      return;
    }

    const targetUser = args[0];
    
    // Cek apakah target user ada di grup
    const targetParticipant = chat.participants.find(p => 
      p.id === targetUser || 
      p.id === targetUser + '@c.us'
    );
    
    if (!targetParticipant) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ User tidak ditemukan di grup ini!'
      });
      return;
    }

    // Cek apakah target adalah admin (tidak bisa di-kick)
    if (targetParticipant.admin === 'admin') {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Tidak bisa mengeluarkan admin grup!'
      });
      return;
    }

    // Get target contact info
    const targetName = targetParticipant.id.split('@')[0];

    // Kick user
    await sock.groupParticipantsUpdate(chat.id._serialized, [targetParticipant.id], 'remove');
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: `👢 *User Berhasil Di-Kick!*\n\n` +
      `👤 User: @${targetName}\n` +
      `🏠 Grup: ${chat.name}\n` +
      `👑 Di-kick oleh: Admin`
    });

  } catch (err) {
    console.error('❌ Gagal menjalankan !kick:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengeluarkan user.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}