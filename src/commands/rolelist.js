// ======================================================
// 📋 Command: !rolelist — Tampilkan daftar role yang tersedia (Baileys Compatible)
// ======================================================

import { getAllRoles, ROLE_LEVELS } from '../core/roles.js';

export async function handleRoleList(sock, msg) {
  try {
    const roles = getAllRoles();
    
    let response = `📋 *Daftar Role yang Tersedia*\n\n`;
    
    roles.forEach(role => {
      response += `${role.name}\n`;
      response += `   Level: ${role.level}\n`;
      
      // Deskripsi untuk setiap role
      switch (role.level) {
        case ROLE_LEVELS.USER:
          response += `   📝 Akses: Command dasar\n\n`;
          break;
        case ROLE_LEVELS.VIP:
          response += `   ⭐ Akses: Command VIP + tagall\n\n`;
          break;
        case ROLE_LEVELS.MODERATOR:
          response += `   🛡️ Akses: Semua command + rolelist\n\n`;
          break;
        case ROLE_LEVELS.ADMIN:
          response += `   👑 Akses: Semua command + setrole\n\n`;
          break;
        case ROLE_LEVELS.OWNER:
          response += `   🏆 Akses: Kontrol penuh grup\n\n`;
          break;
        case ROLE_LEVELS.SUPER_ADMIN:
          response += `   🚀 Akses: Kontrol penuh sistem\n\n`;
          break;
      }
    });
    
    response += `💡 *Cara Mendapatkan Role:*\n`;
    response += `• User: Default untuk semua\n`;
    response += `• VIP: Minta ke admin\n`;
    response += `• Moderator: Admin grup\n`;
    response += `• Admin: Owner grup\n`;
    response += `• Owner: Pemilik grup\n`;
    response += `• Super Admin: Developer bot\n`;
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: response
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !rolelist:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan daftar role.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}