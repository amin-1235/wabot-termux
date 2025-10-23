// ======================================================
// 📍 Command: !placecommands — Tampilkan command berdasarkan tempat (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handlePlaceCommands(sock, msg, args) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    
    if (args.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `📍 *Command Berdasarkan Tempat*\n\n` +
        `📋 *Kategori Tempat:*\n` +
        `• !placecommands group — Command khusus grup\n` +
        `• !placecommands private — Command khusus chat pribadi\n` +
        `• !placecommands all — Command yang bisa digunakan di mana saja\n` +
        `• !placecommands compare — Perbandingan command grup vs chat pribadi\n\n` +
        `💡 *Contoh:* !placecommands group`
      });
      return;
    }

    const placeType = args[0].toLowerCase();
    let helpText = '';
    
    switch (placeType) {
      case 'group':
        helpText = '🏠 *Command Khusus Grup*\n\n';
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
        
      case 'private':
        helpText = '💬 *Command Khusus Chat Pribadi*\n\n';
        helpText += '💡 *Tidak ada command khusus chat pribadi*\n';
        helpText += 'Semua command bisa digunakan di chat pribadi kecuali yang khusus grup.\n\n';
        
        helpText += '🔓 *Command yang Bisa Digunakan:*\n';
        helpText += '• !help — Tampilkan daftar bantuan\n';
        helpText += '• !ping — Cek koneksi bot\n';
        helpText += '• !sticker — Ubah foto jadi stiker\n';
        helpText += '• !myrole — Cek role Anda saat ini\n';
        helpText += '• !commands — Daftar command berdasarkan kategori\n';
        helpText += '• !list — Daftar command berdasarkan tempat\n';
        helpText += '• !rolecommands — Daftar command berdasarkan role\n';
        helpText += '• !placecommands — Command berdasarkan tempat\n';
        helpText += '• !rolelist — Tampilkan daftar role (🛡️ Moderator)\n';
        helpText += '• !setrole — Set role pengguna lain (👑 Admin)\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command chat pribadi bisa digunakan di mana saja\n';
        helpText += '• Beberapa command memerlukan role tertentu\n';
        break;
        
      case 'all':
        helpText = '🌐 *Command yang Bisa Digunakan di Mana Saja*\n\n';
        helpText += '🔓 *Command Umum (👤 User):*\n';
        helpText += '• !help — Tampilkan daftar bantuan\n';
        helpText += '• !ping — Cek koneksi bot\n';
        helpText += '• !sticker — Ubah foto jadi stiker\n';
        helpText += '• !myrole — Cek role Anda saat ini\n';
        helpText += '• !commands — Daftar command berdasarkan kategori\n';
        helpText += '• !list — Daftar command berdasarkan tempat\n';
        helpText += '• !rolecommands — Daftar command berdasarkan role\n';
        helpText += '• !placecommands — Command berdasarkan tempat\n\n';
        
        helpText += '🛡️ *Command Moderator (🛡️ Moderator):*\n';
        helpText += '• !rolelist — Tampilkan daftar role yang tersedia\n\n';
        
        helpText += '👑 *Command Admin (👑 Admin):*\n';
        helpText += '• !setrole — Set role pengguna lain\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command ini bisa digunakan di grup dan chat pribadi\n';
        helpText += '• Beberapa command memerlukan role tertentu\n';
        break;
        
      case 'compare':
        helpText = '⚖️ *Perbandingan Command Grup vs Chat Pribadi*\n\n';
        
        helpText += '🏠 *Hanya di Grup:*\n';
        helpText += '• !groupinfo — Informasi grup (👤 User)\n';
        helpText += '• !tagall — Mention semua member grup (⭐ VIP)\n';
        helpText += '• !welcome — Pengaturan pesan selamat datang (🛡️ Moderator)\n';
        helpText += '• !antispam — Pengaturan sistem anti-spam (🛡️ Moderator)\n';
        helpText += '• !kick — Keluarkan user dari grup (👑 Admin)\n';
        helpText += '• !setsuperadmin — Set role super admin di grup (🚀 Super Admin)\n\n';
        
        helpText += '💬 *Hanya di Chat Pribadi:*\n';
        helpText += '• Tidak ada command khusus chat pribadi\n\n';
        
        helpText += '🌐 *Di Mana Saja:*\n';
        helpText += '• !help — Tampilkan daftar bantuan (👤 User)\n';
        helpText += '• !ping — Cek koneksi bot (👤 User)\n';
        helpText += '• !sticker — Ubah foto jadi stiker (👤 User)\n';
        helpText += '• !myrole — Cek role Anda saat ini (👤 User)\n';
        helpText += '• !commands — Daftar command berdasarkan kategori (👤 User)\n';
        helpText += '• !list — Daftar command berdasarkan tempat (👤 User)\n';
        helpText += '• !rolecommands — Daftar command berdasarkan role (👤 User)\n';
        helpText += '• !placecommands — Command berdasarkan tempat (👤 User)\n';
        helpText += '• !rolelist — Tampilkan daftar role (🛡️ Moderator)\n';
        helpText += '• !setrole — Set role pengguna lain (👑 Admin)\n\n';
        
        helpText += '💡 *Tips:*\n';
        helpText += '• Command grup lebih banyak daripada chat pribadi\n';
        helpText += '• Command chat pribadi bisa digunakan di grup juga\n';
        break;
        
      default:
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ *Tempat tidak ditemukan!*\n\n` +
          `📋 *Tempat yang tersedia:*\n` +
          `• group, private, all, compare\n\n` +
          `💡 *Contoh:* !placecommands group`
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
    console.error('❌ Gagal menjalankan !placecommands:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan daftar command.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}