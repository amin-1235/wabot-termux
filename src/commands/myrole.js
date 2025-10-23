// ======================================================
// 👤 Command: !myrole — Cek role pengguna saat ini (Baileys Compatible)
// ======================================================

import { getUserRoleLevel, getRoleName } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleMyRole(sock, msg) {
  try {
    const { chat } = await getChatContext(sock, msg);
    const userRoleLevel = await getUserRoleLevel(msg.key.remoteJid, chat);
    const roleName = getRoleName(userRoleLevel);
    
    let response = `👤 *Role Anda Saat Ini*\n\n`;
    response += `🎭 Role: ${roleName}\n`;
    response += `📊 Level: ${userRoleLevel}\n`;
    
    if (chat && chat.isGroup) {
      response += `🏠 Grup: ${chat.name}\n`;
      response += `👥 Total Member: ${chat.participants.length}\n`;
    } else {
      response += `💬 Chat: Pribadi\n`;
    }
    
    response += `\n💡 Gunakan *!rolelist* untuk melihat semua role yang tersedia.`;
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: response
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !myrole:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengecek role.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}