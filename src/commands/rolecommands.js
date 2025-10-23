// ======================================================
// 🎭 Command: !rolecommands — Tampilkan command berdasarkan role (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleRoleCommands(sock, msg, args) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    
    if (args.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🎭 *Command Berdasarkan Role*\n\n` +
        `📋 *Kategori Role:*\n` +
        `• !rolecommands user — Command untuk User\n` +
        `• !rolecommands vip — Command untuk VIP\n` +
        `• !rolecommands moderator — Command untuk Moderator\n` +
        `• !rolecommands admin — Command untuk Admin\n` +
        `• !rolecommands superadmin — Command untuk Super Admin\n` +
        `• !rolecommands all — Semua command berdasarkan role\n\n` +
        `💡 *Contoh:* !rolecommands user`
      });
      return;
    }

    const roleType = args[0].toLowerCase();
    let helpText = '';
    
    switch (roleType) {
      case 'user':
        helpText = '👤 *Command untuk User (Level 0)*\n\n';
        helpText += '🔓 *Command Umum:*\n';
        helpText += '• !help — Tampilkan daftar bantuan\n';
        helpText += '• !ping — Cek koneksi bot\n';
        helpText += '• !sticker — Ubah foto jadi stiker\n';
        helpText += '• !myrole — Cek role Anda saat ini\n';
        helpText += '• !commands — Daftar command berdasarkan kategori\n';
        helpText += '• !list — Daftar command berdasarkan tempat\n';
        helpText += '• !rolecommands — Command berdasarkan role\n\n';
        
        if (isGroup) {
          helpText += '🏠 *Command Grup:*\n';
          helpText += '• !groupinfo — Informasi grup\n\n';
        } else {
          helpText += '🏠 *Command Grup (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !groupinfo — Informasi grup\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Gunakan !myrole untuk cek role Anda\n';
        helpText += '• Role yang lebih tinggi memiliki akses lebih banyak\n';
        break;
        
      case 'vip':
        helpText = '⭐ *Command untuk VIP (Level 1)*\n\n';
        helpText += '🔓 *Command User + VIP:*\n';
        helpText += '• Semua command User\n';
        helpText += '• !tagall — Mention semua member grup\n\n';
        
        if (isGroup) {
          helpText += '🏠 *Command Grup:*\n';
          helpText += '• !tagall — Mention semua member grup\n\n';
        } else {
          helpText += '🏠 *Command Grup (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !tagall — Mention semua member grup\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• VIP memiliki akses ke command mention grup\n';
        helpText += '• Gunakan !setrole untuk upgrade role\n';
        break;
        
      case 'moderator':
        helpText = '🛡️ *Command untuk Moderator (Level 2)*\n\n';
        helpText += '🔓 *Command User + VIP + Moderator:*\n';
        helpText += '• Semua command User dan VIP\n';
        helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n';
        helpText += '• !welcome — Pengaturan pesan selamat datang\n';
        helpText += '• !antispam — Pengaturan sistem anti-spam\n\n';
        
        if (isGroup) {
          helpText += '🏠 *Command Grup:*\n';
          helpText += '• !welcome — Pengaturan pesan selamat datang\n';
          helpText += '• !antispam — Pengaturan sistem anti-spam\n\n';
        } else {
          helpText += '🏠 *Command Grup (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !welcome — Pengaturan pesan selamat datang\n';
          helpText += '• !antispam — Pengaturan sistem anti-spam\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Moderator bisa mengatur grup\n';
        helpText += '• Bisa mengatur welcome message dan anti-spam\n';
        break;
        
      case 'admin':
        helpText = '👑 *Command untuk Admin (Level 3)*\n\n';
        helpText += '🔓 *Command User + VIP + Moderator + Admin:*\n';
        helpText += '• Semua command User, VIP, dan Moderator\n';
        helpText += '• !setrole — Set role pengguna lain\n';
        helpText += '• !kick — Keluarkan user dari grup\n\n';
        
        if (isGroup) {
          helpText += '🏠 *Command Grup:*\n';
          helpText += '• !kick — Keluarkan user dari grup\n\n';
        } else {
          helpText += '🏠 *Command Grup (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !kick — Keluarkan user dari grup\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Admin bisa mengatur role dan kick user\n';
        helpText += '• Memiliki kontrol penuh atas grup\n';
        break;
        
      case 'superadmin':
        helpText = '🚀 *Command untuk Super Admin (Level 5)*\n\n';
        helpText += '🔓 *Command Semua Level:*\n';
        helpText += '• Semua command User, VIP, Moderator, dan Admin\n';
        helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
        
        if (isGroup) {
          helpText += '🏠 *Command Grup:*\n';
          helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
        } else {
          helpText += '🏠 *Command Grup (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Super Admin memiliki kontrol penuh\n';
        helpText += '• Bisa mengatur semua role dan sistem\n';
        break;
        
      case 'all':
        helpText = '🎭 *Semua Command Berdasarkan Role*\n\n';
        
        helpText += '👤 *User (Level 0):*\n';
        helpText += '• !help, !ping, !sticker, !myrole\n';
        helpText += '• !commands, !list, !rolecommands\n';
        helpText += '• !groupinfo (grup saja)\n\n';
        
        helpText += '⭐ *VIP (Level 1):*\n';
        helpText += '• Semua command User\n';
        helpText += '• !tagall (grup saja)\n\n';
        
        helpText += '🛡️ *Moderator (Level 2):*\n';
        helpText += '• Semua command User dan VIP\n';
        helpText += '• !rolelist\n';
        helpText += '• !welcome, !antispam (grup saja)\n\n';
        
        helpText += '👑 *Admin (Level 3):*\n';
        helpText += '• Semua command User, VIP, dan Moderator\n';
        helpText += '• !setrole\n';
        helpText += '• !kick (grup saja)\n\n';
        
        helpText += '🚀 *Super Admin (Level 5):*\n';
        helpText += '• Semua command di atas\n';
        helpText += '• !setsuperadmin (grup saja)\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Role yang lebih tinggi memiliki akses lebih banyak\n';
        helpText += '• Beberapa command hanya bisa digunakan di grup\n';
        break;
        
      default:
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ *Role tidak ditemukan!*\n\n` +
          `📋 *Role yang tersedia:*\n` +
          `• user, vip, moderator, admin, superadmin, all\n\n` +
          `💡 *Contoh:* !rolecommands user`
        });
        return;
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
    console.error('❌ Gagal menjalankan !rolecommands:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan daftar command.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}