// ======================================================
// 👑 Command: !setrole — Set role pengguna lain (Baileys Compatible)
// ======================================================

import { setUserRole, getUserRoleLevel, getRoleName, ROLE_LEVELS, isSuperAdmin, isPhoneNumberSuperAdmin } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleSetRole(sock, msg, args) {
  try {
    if (args.length < 2) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ *Format Salah!*\n\n` +
        `📝 *Cara Penggunaan:*\n` +
        `!setrole @user role_level\n` +
        `!setrole 628xxxxxxxxx role_level\n\n` +
        `📋 *Role Level:*\n` +
        `0 = 👤 User\n` +
        `1 = ⭐ VIP\n` +
        `2 = 🛡️ Moderator\n` +
        `3 = 👑 Admin\n` +
        `4 = 🏆 Owner\n` +
        `5 = 🚀 Super Admin\n\n` +
        `💡 *Contoh:*\n` +
        `• !setrole @6281234567890 1\n` +
        `• !setrole 6281234567890 1`
      });
      return;
    }

    const targetUser = args[0];
    const newRoleLevel = parseInt(args[1]);

    // Validasi role level
    if (isNaN(newRoleLevel) || newRoleLevel < 0 || newRoleLevel > 5) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Role level tidak valid! Gunakan angka 0-5.'
      });
      return;
    }

    // Cek apakah pengguna bisa set role ini
    const { chat } = await getChatContext(sock, msg);
    const currentUserRole = await getUserRoleLevel(msg.key.remoteJid, chat);
    if (currentUserRole < ROLE_LEVELS.ADMIN) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Anda tidak memiliki akses untuk mengubah role!'
      });
      return;
    }

    // Super admin tidak bisa diubah kecuali oleh super admin lain
    if (newRoleLevel === ROLE_LEVELS.SUPER_ADMIN && !isSuperAdmin(msg.key.remoteJid)) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Hanya Super Admin yang bisa memberikan role Super Admin!'
      });
      return;
    }

    // Handle target user format
    let targetUserId = targetUser;
    let targetPhoneNumber = '';
    
    // Jika format nomor HP langsung (628xxxxxxxxx)
    if (targetUser.match(/^628\d{8,12}$/)) {
      targetPhoneNumber = targetUser;
      targetUserId = targetUser + '@c.us';
    }
    // Jika format @628xxxxxxxxx
    else if (targetUser.startsWith('@') && targetUser.match(/^@628\d{8,12}$/)) {
      targetPhoneNumber = targetUser.substring(1);
      targetUserId = targetPhoneNumber + '@c.us';
    }
    // Jika format @c.us
    else if (targetUser.includes('@c.us')) {
      targetPhoneNumber = targetUser.replace('@c.us', '');
      targetUserId = targetUser;
    }
    // Jika format grup
    else if (targetUser.includes('@g.us')) {
      targetUserId = targetUser;
    }
    
    // Untuk grup, kita perlu set role berdasarkan nomor HP
    if (chat && chat.isGroup && targetPhoneNumber) {
      // Cari participant berdasarkan nomor HP
      const participant = chat.participants.find(p => {
        const participantPhone = p.id.replace('@c.us', '');
        return participantPhone === targetPhoneNumber;
      });
      
      if (participant) {
        targetUserId = participant.id;
      }
    }

    // Cek apakah target adalah super admin berdasarkan nomor HP
    if (targetPhoneNumber && isPhoneNumberSuperAdmin(targetPhoneNumber)) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Tidak bisa mengubah role Super Admin!'
      });
      return;
    }

    // Set role
    const success = setUserRole(targetUserId, newRoleLevel);
    
    if (success) {
      const newRoleName = getRoleName(newRoleLevel);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `✅ Role berhasil diubah!\n\n` +
        `👤 User: ${targetUserId}\n` +
        `📱 Phone: ${targetPhoneNumber || 'N/A'}\n` +
        `🎭 Role Baru: ${newRoleName}`
      });
    } else {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Gagal mengubah role!'
      });
    }

  } catch (err) {
    console.error('❌ Gagal menjalankan !setrole:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mengubah role.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}