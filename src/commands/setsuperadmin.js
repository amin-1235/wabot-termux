// ======================================================
// 🚀 Command: !setsuperadmin — Set role super admin di grup (Baileys Compatible)
// ======================================================

import { setUserRole, getUserRoleLevel, getRoleName, ROLE_LEVELS, isPhoneNumberSuperAdmin } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleSetSuperAdmin(sock, msg, args) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    if (!isGroup) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Perintah ini hanya bisa digunakan di grup!'
      });
      return;
    }

    if (args.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🚀 *Set Super Admin di Grup*\n\n` +
        `📝 *Cara Penggunaan:*\n` +
        `!setsuperadmin 628xxxxxxxxx\n\n` +
        `💡 *Contoh:*\n` +
        `• !setsuperadmin 6281234567890\n\n` +
        `⚠️ *Peringatan:*\n` +
        `• Hanya Super Admin yang bisa menggunakan command ini\n` +
        `• Nomor HP harus terdaftar sebagai Super Admin\n` +
        `• Role akan berlaku untuk semua grup`
      });
      return;
    }

    const targetPhoneNumber = args[0];

    // Validasi format nomor HP
    if (!targetPhoneNumber.match(/^628\d{8,12}$/)) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Format nomor HP salah! Gunakan format: 628xxxxxxxxx'
      });
      return;
    }

    // Cek apakah nomor HP adalah super admin
    if (!isPhoneNumberSuperAdmin(targetPhoneNumber)) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Nomor HP ini tidak terdaftar sebagai Super Admin!'
      });
      return;
    }

    // Cek apakah pengguna adalah super admin
    const { chat } = await getChatContext(sock, msg);
    const currentUserRole = await getUserRoleLevel(msg.key.remoteJid, chat);
    if (currentUserRole < ROLE_LEVELS.SUPER_ADMIN) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Hanya Super Admin yang bisa menggunakan command ini!'
      });
      return;
    }

    // Set role super admin
    const targetUserId = targetPhoneNumber + '@c.us';
    const success = setUserRole(targetUserId, ROLE_LEVELS.SUPER_ADMIN);
    
    if (success) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `✅ Role Super Admin berhasil diset!\n\n` +
        `👤 User: ${targetUserId}\n` +
        `📱 Phone: ${targetPhoneNumber}\n` +
        `🎭 Role: 🚀 Super Admin\n\n` +
        `💡 User ini sekarang memiliki akses penuh ke semua command!`
      });
    } else {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Gagal mengubah role!'
      });
    }

  } catch (err) {
    console.error('❌ Gagal menjalankan !setsuperadmin:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengubah role.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}