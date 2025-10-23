// ======================================================
// 📝 Command: !list — Tampilkan daftar command berdasarkan tempat (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleList(sock, msg, args) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    
    let helpText = '';
    
    if (isGroup) {
      helpText = '🏠 *Daftar Command untuk Grup*\n\n';
      
      helpText += '🔓 *Command Umum (👤 User):*\n';
      helpText += '• !help — Tampilkan daftar bantuan\n';
      helpText += '• !ping — Cek koneksi bot\n';
      helpText += '• !sticker — Ubah foto jadi stiker\n';
      helpText += '• !myrole — Cek role Anda saat ini\n';
      helpText += '• !commands — Daftar command berdasarkan kategori\n';
      helpText += '• !groupinfo — Informasi grup\n\n';
      
      helpText += '⭐ *Command VIP (⭐ VIP):*\n';
      helpText += '• !tagall — Mention semua member grup\n\n';
      
      helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
      helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n';
      helpText += '• !welcome — Pengaturan pesan selamat datang\n';
      helpText += '• !antispam — Pengaturan sistem anti-spam\n\n';
      
      helpText += '👑 *Command Admin (👑 Admin):*\n';
      helpText += '• !setrole — Set role pengguna lain\n';
      helpText += '• !kick — Keluarkan user dari grup\n\n';
      
      helpText += '🚀 *Command Super Admin (🚀 Super Admin):*\n';
      helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
      
      helpText += '💡 *Tips Penggunaan:*\n';
      helpText += '• Gunakan !myrole untuk cek role Anda\n';
      helpText += '• Gunakan !commands [kategori] untuk detail command\n';
      helpText += '• Role menentukan akses command yang tersedia\n';
      
    } else {
      helpText = '💬 *Daftar Command untuk Chat Pribadi*\n\n';
      
      helpText += '🔓 *Command Umum (👤 User):*\n';
      helpText += '• !help — Tampilkan daftar bantuan\n';
      helpText += '• !ping — Cek koneksi bot\n';
      helpText += '• !sticker — Ubah foto jadi stiker\n';
      helpText += '• !myrole — Cek role Anda saat ini\n';
      helpText += '• !commands — Daftar command berdasarkan kategori\n\n';
      
      helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
      helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n\n';
      
      helpText += '👑 *Command Admin (👑 Admin):*\n';
      helpText += '• !setrole — Set role pengguna lain\n\n';
      
      helpText += '🏠 *Command yang Hanya Bisa Digunakan di Grup:*\n';
      helpText += '• !groupinfo — Informasi grup (👤 User)\n';
      helpText += '• !tagall — Mention semua member grup (⭐ VIP)\n';
      helpText += '• !welcome — Pengaturan pesan selamat datang (🛡️ Moderator)\n';
      helpText += '• !antispam — Pengaturan sistem anti-spam (🛡️ Moderator)\n';
      helpText += '• !kick — Keluarkan user dari grup (👑 Admin)\n';
      helpText += '• !setsuperadmin — Set role super admin di grup (🚀 Super Admin)\n\n';
      
      helpText += '💡 *Tips Penggunaan:*\n';
      helpText += '• Gunakan !myrole untuk cek role Anda\n';
      helpText += '• Gunakan !commands [kategori] untuk detail command\n';
      helpText += '• Beberapa command hanya bisa digunakan di grup\n';
    }
    
    helpText += '\n📋 *Level Role:*\n';
    helpText += '• 👤 User (0) - Command dasar\n';
    helpText += '• ⭐ VIP (1) - Command VIP\n';
    helpText += '• 🛡️ Moderator (2) - Command moderator\n';
    helpText += '• 👑 Admin (3) - Command admin\n';
    helpText += '• 🏆 Owner (4) - Owner grup\n';
    helpText += '• 🚀 Super Admin (5) - Kontrol penuh\n';
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: helpText
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !list:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan daftar command.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}