// ======================================================
// 📂 Command: !categories — Tampilkan daftar kategori command (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleCategories(sock, msg, args) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    
    if (args.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `📂 *Daftar Kategori Command*\n\n` +
        `📋 *Kategori yang Tersedia:*\n` +
        `• !categories info — Command informasi\n` +
        `• !categories role — Command role management\n` +
        `• !categories group — Command grup\n` +
        `• !categories admin — Command admin\n` +
        `• !categories fun — Command fun/entertainment\n` +
        `• !categories utility — Command utility\n` +
        `• !categories all — Semua kategori\n\n` +
        `💡 *Contoh:* !categories info`
      });
      return;
    }

    const category = args[0].toLowerCase();
    let helpText = '';
    
    switch (category) {
      case 'info':
        helpText = '📊 *Command Informasi*\n\n';
        helpText += '🔓 *Command Umum (👤 User):*\n';
        helpText += '• !help — Tampilkan daftar bantuan\n';
        helpText += '• !myrole — Cek role Anda saat ini\n';
        helpText += '• !commands — Daftar command berdasarkan kategori\n';
        helpText += '• !list — Daftar command berdasarkan tempat\n';
        helpText += '• !rolecommands — Daftar command berdasarkan role\n';
        helpText += '• !placecommands — Command berdasarkan tempat\n';
        helpText += '• !categories — Daftar kategori command\n\n';
        
        if (isGroup) {
          helpText += '🏠 *Command Grup:*\n';
          helpText += '• !groupinfo — Informasi grup\n\n';
        } else {
          helpText += '🏠 *Command Grup (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !groupinfo — Informasi grup\n\n';
        }
        
        helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
        helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command info untuk mendapatkan informasi\n';
        helpText += '• Gunakan !myrole untuk cek role Anda\n';
        break;
        
      case 'role':
        helpText = '🎭 *Command Role Management*\n\n';
        helpText += '🔓 *Command Umum (👤 User):*\n';
        helpText += '• !myrole — Cek role Anda saat ini\n';
        helpText += '• !rolecommands — Daftar command berdasarkan role\n\n';
        
        helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
        helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n\n';
        
        helpText += '👑 *Command Admin (👑 Admin):*\n';
        helpText += '• !setrole — Set role pengguna lain\n\n';
        
        if (isGroup) {
          helpText += '🚀 *Command Super Admin (🚀 Super Admin):*\n';
          helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
        } else {
          helpText += '🚀 *Command Super Admin (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Role menentukan akses command yang tersedia\n';
        helpText += '• Gunakan !setrole untuk mengubah role user\n';
        break;
        
      case 'group':
        helpText = '🏠 *Command Grup*\n\n';
        helpText += '🔓 *Command Umum (👤 User):*\n';
        helpText += '• !groupinfo — Informasi grup\n\n';
        
        helpText += '⭐ *Command VIP (⭐ VIP):*\n';
        helpText += '• !tagall — Mention semua member grup\n\n';
        
        helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
        helpText += '• !welcome — Pengaturan pesan selamat datang\n';
        helpText += '• !antispam — Pengaturan sistem anti-spam\n\n';
        
        helpText += '👑 *Command Admin (👑 Admin):*\n';
        helpText += '• !kick — Keluarkan user dari grup\n\n';
        
        helpText += '🚀 *Command Super Admin (🚀 Super Admin):*\n';
        helpText += '• !setsuperadmin — Set role super admin di grup\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command grup hanya bisa digunakan di grup\n';
        helpText += '• Beberapa command memerlukan role tertentu\n';
        break;
        
      case 'admin':
        helpText = '👑 *Command Admin*\n\n';
        helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
        helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n';
        helpText += '• !welcome — Pengaturan pesan selamat datang (grup)\n';
        helpText += '• !antispam — Pengaturan sistem anti-spam (grup)\n\n';
        
        helpText += '👑 *Command Admin (👑 Admin):*\n';
        helpText += '• !setrole — Set role pengguna lain\n';
        helpText += '• !kick — Keluarkan user dari grup (grup)\n\n';
        
        helpText += '🚀 *Command Super Admin (🚀 Super Admin):*\n';
        helpText += '• !setsuperadmin — Set role super admin di grup (grup)\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command admin untuk mengatur sistem\n';
        helpText += '• Memerlukan role moderator ke atas\n';
        break;
        
      case 'fun':
        helpText = '🎉 *Command Fun/Entertainment*\n\n';
        helpText += '🔓 *Command Umum (👤 User):*\n';
        helpText += '• !ping — Cek koneksi bot\n';
        helpText += '• !sticker — Ubah foto jadi stiker\n\n';
        
        if (isGroup) {
          helpText += '⭐ *Command VIP (⭐ VIP):*\n';
          helpText += '• !tagall — Mention semua member grup\n\n';
        } else {
          helpText += '⭐ *Command VIP (Tidak tersedia di chat pribadi):*\n';
          helpText += '• !tagall — Mention semua member grup\n\n';
        }
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command fun untuk hiburan\n';
        helpText += '• Gunakan !sticker untuk membuat sticker\n';
        break;
        
      case 'utility':
        helpText = '🔧 *Command Utility*\n\n';
        helpText += '🔓 *Command Umum (👤 User):*\n';
        helpText += '• !help — Tampilkan daftar bantuan\n';
        helpText += '• !commands — Daftar command berdasarkan kategori\n';
        helpText += '• !list — Daftar command berdasarkan tempat\n';
        helpText += '• !rolecommands — Daftar command berdasarkan role\n';
        helpText += '• !placecommands — Command berdasarkan tempat\n';
        helpText += '• !categories — Daftar kategori command\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command utility untuk membantu penggunaan\n';
        helpText += '• Gunakan untuk mendapatkan informasi command\n';
        break;
        
      case 'all':
        helpText = '📂 *Semua Kategori Command*\n\n';
        
        helpText += '📊 *Informasi:*\n';
        helpText += '• !help, !myrole, !commands, !list\n';
        helpText += '• !rolecommands, !placecommands, !categories\n';
        helpText += '• !groupinfo (grup), !rolelist (moderator)\n\n';
        
        helpText += '🎭 *Role Management:*\n';
        helpText += '• !myrole, !rolecommands, !rolelist (moderator)\n';
        helpText += '• !setrole (admin), !setsuperadmin (super admin)\n\n';
        
        helpText += '🏠 *Grup:*\n';
        helpText += '• !groupinfo, !tagall (VIP), !welcome (moderator)\n';
        helpText += '• !antispam (moderator), !kick (admin)\n';
        helpText += '• !setsuperadmin (super admin)\n\n';
        
        helpText += '👑 *Admin:*\n';
        helpText += '• !rolelist (moderator), !welcome (moderator)\n';
        helpText += '• !antispam (moderator), !setrole (admin)\n';
        helpText += '• !kick (admin), !setsuperadmin (super admin)\n\n';
        
        helpText += '🎉 *Fun/Entertainment:*\n';
        helpText += '• !ping, !sticker, !tagall (VIP)\n\n';
        
        helpText += '🔧 *Utility:*\n';
        helpText += '• !help, !commands, !list, !rolecommands\n';
        helpText += '• !placecommands, !categories\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Gunakan !help untuk daftar lengkap\n';
        helpText += '• Beberapa command memerlukan role tertentu\n';
        break;
        
      default:
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ *Kategori tidak ditemukan!*\n\n` +
          `📋 *Kategori yang tersedia:*\n` +
          `• info, role, group, admin, fun, utility, all\n\n` +
          `💡 *Contoh:* !categories info`
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
    console.error('❌ Gagal menjalankan !categories:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan daftar kategori.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}