// ======================================================
// 📋 Command: !commands — Tampilkan daftar command berdasarkan kategori (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleCommands(sock, msg, args) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    
    if (args.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `📋 *Daftar Kategori Command*\n\n` +
        `🏠 *Command Grup:*\n` +
        `• !commands group - Command khusus grup\n` +
        `• !commands groupinfo - Info grup\n` +
        `• !commands tagall - Mention semua member\n` +
        `• !commands welcome - Pengaturan welcome\n` +
        `• !commands antispam - Pengaturan anti-spam\n` +
        `• !commands kick - Keluarkan user\n` +
        `• !commands setsuperadmin - Set super admin\n\n` +
        `💬 *Command Chat Pribadi:*\n` +
        `• !commands private - Command khusus chat pribadi\n` +
        `• !commands sticker - Buat sticker\n` +
        `• !commands role - Command role management\n\n` +
        `🔓 *Command Umum:*\n` +
        `• !commands all - Semua command\n` +
        `• !commands user - Command untuk user\n` +
        `• !commands vip - Command untuk VIP\n` +
        `• !commands moderator - Command untuk moderator\n` +
        `• !commands admin - Command untuk admin\n` +
        `• !commands superadmin - Command untuk super admin\n\n` +
        `💡 *Contoh:* !commands group`
      });
      return;
    }

    const category = args[0].toLowerCase();
    let helpText = '📋 *Daftar Command*\n\n';
    
    // Hardcode command list
    const commands = [
      { cmd: '!help', desc: 'Tampilkan daftar bantuan', role: 'all', requiredRole: ROLE_LEVELS.USER },
      { cmd: '!ping', desc: 'Cek koneksi bot (balas "pong")', role: 'all', requiredRole: ROLE_LEVELS.USER },
      { cmd: '!sticker', desc: 'Ubah foto jadi stiker', role: 'all', requiredRole: ROLE_LEVELS.USER },
      { cmd: '!myrole', desc: 'Cek role Anda saat ini', role: 'all', requiredRole: ROLE_LEVELS.USER },
      { cmd: '!groupinfo', desc: 'Informasi grup', role: 'group', requiredRole: ROLE_LEVELS.USER },
      { cmd: '!tagall', desc: 'Mention semua member grup', role: 'group', requiredRole: ROLE_LEVELS.VIP },
      { cmd: '!rolelist', desc: 'Tampilkan daftar role yang tersedia', role: 'all', requiredRole: ROLE_LEVELS.MODERATOR },
      { cmd: '!welcome', desc: 'Pengaturan pesan selamat datang', role: 'group', requiredRole: ROLE_LEVELS.MODERATOR },
      { cmd: '!antispam', desc: 'Pengaturan sistem anti-spam', role: 'group', requiredRole: ROLE_LEVELS.MODERATOR },
      { cmd: '!setrole', desc: 'Set role pengguna lain', role: 'all', requiredRole: ROLE_LEVELS.ADMIN },
      { cmd: '!kick', desc: 'Keluarkan user dari grup', role: 'group', requiredRole: ROLE_LEVELS.ADMIN },
      { cmd: '!setsuperadmin', desc: 'Set role super admin di grup', role: 'group', requiredRole: ROLE_LEVELS.SUPER_ADMIN },
    ];
    
    switch (category) {
      case 'group':
        helpText += '🏠 *Command Khusus Grup*\n\n';
        commands.filter(cmd => cmd.role === 'group').forEach(({ cmd, desc, requiredRole }) => {
          const roleName = getRoleName(requiredRole);
          helpText += `• ${cmd} — ${desc} (${roleName})\n`;
        });
        break;
        
      case 'private':
        helpText += '💬 *Command Khusus Chat Pribadi*\n\n';
        helpText += '💡 *Tidak ada command khusus chat pribadi*\n';
        helpText += 'Semua command bisa digunakan di chat pribadi kecuali yang khusus grup.\n\n';
        helpText += '🔓 *Command yang Bisa Digunakan:*\n';
        commands.filter(cmd => cmd.role === 'all').forEach(({ cmd, desc, requiredRole }) => {
          const roleName = getRoleName(requiredRole);
          helpText += `• ${cmd} — ${desc} (${roleName})\n`;
        });
        break;
        
      case 'all':
        helpText += '🔓 *Semua Command*\n\n';
        commands.forEach(({ cmd, desc, role, requiredRole }) => {
          const roleName = getRoleName(requiredRole);
          const location = role === 'group' ? '🏠' : role === 'all' ? '💬' : '❓';
          helpText += `• ${cmd} — ${desc} (${roleName}) ${location}\n`;
        });
        break;
        
      case 'user':
        helpText += '👤 *Command untuk User*\n\n';
        commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.USER).forEach(({ cmd, desc, role }) => {
          const location = role === 'group' ? '🏠' : '💬';
          helpText += `• ${cmd} — ${desc} ${location}\n`;
        });
        break;
        
      case 'vip':
        helpText += '⭐ *Command untuk VIP*\n\n';
        commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.VIP).forEach(({ cmd, desc, role }) => {
          const location = role === 'group' ? '🏠' : '💬';
          helpText += `• ${cmd} — ${desc} ${location}\n`;
        });
        break;
        
      case 'moderator':
        helpText += '🛡️ *Command untuk Moderator*\n\n';
        commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.MODERATOR).forEach(({ cmd, desc, role }) => {
          const location = role === 'group' ? '🏠' : '💬';
          helpText += `• ${cmd} — ${desc} ${location}\n`;
        });
        break;
        
      case 'admin':
        helpText += '👑 *Command untuk Admin*\n\n';
        commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.ADMIN).forEach(({ cmd, desc, role }) => {
          const location = role === 'group' ? '🏠' : '💬';
          helpText += `• ${cmd} — ${desc} ${location}\n`;
        });
        break;
        
      case 'superadmin':
        helpText += '🚀 *Command untuk Super Admin*\n\n';
        commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.SUPER_ADMIN).forEach(({ cmd, desc, role }) => {
          const location = role === 'group' ? '🏠' : '💬';
          helpText += `• ${cmd} — ${desc} ${location}\n`;
        });
        break;
        
      case 'role':
        helpText += '🎭 *Command Role Management*\n\n';
        commands.filter(cmd => cmd.cmd.includes('role') || cmd.cmd.includes('admin')).forEach(({ cmd, desc, requiredRole }) => {
          const roleName = getRoleName(requiredRole);
          helpText += `• ${cmd} — ${desc} (${roleName})\n`;
        });
        break;
        
      case 'groupinfo':
        helpText += '📊 *Command Informasi Grup*\n\n';
        helpText += '• !groupinfo — Informasi grup (👤 User)\n';
        helpText += '• !myrole — Cek role Anda (👤 User)\n';
        helpText += '• !rolelist — Daftar role (🛡️ Moderator)\n';
        break;
        
      case 'tagall':
        helpText += '📢 *Command Mention Grup*\n\n';
        helpText += '• !tagall — Mention semua member grup (⭐ VIP)\n';
        helpText += '• !kick — Keluarkan user dari grup (👑 Admin)\n';
        break;
        
      case 'welcome':
        helpText += '👋 *Command Welcome Message*\n\n';
        helpText += '• !welcome — Pengaturan pesan selamat datang (🛡️ Moderator)\n';
        helpText += '• !welcome on — Aktifkan welcome message\n';
        helpText += '• !welcome off — Nonaktifkan welcome message\n';
        helpText += '• !welcome set "pesan" — Set custom message\n';
        break;
        
      case 'antispam':
        helpText += '🛡️ *Command Anti-Spam*\n\n';
        helpText += '• !antispam — Pengaturan sistem anti-spam (🛡️ Moderator)\n';
        helpText += '• !antispam on — Aktifkan anti-spam\n';
        helpText += '• !antispam off — Nonaktifkan anti-spam\n';
        helpText += '• !antispam set 5 60 warn — Set pengaturan\n';
        break;
        
      case 'kick':
        helpText += '👢 *Command Kick User*\n\n';
        helpText += '• !kick — Keluarkan user dari grup (👑 Admin)\n';
        helpText += '• !kick @user — Kick user tertentu\n';
        helpText += '• !kick 628xxxxxxxxx — Kick berdasarkan nomor HP\n';
        break;
        
      case 'setsuperadmin':
        helpText += '🚀 *Command Set Super Admin*\n\n';
        helpText += '• !setsuperadmin — Set role super admin di grup (🚀 Super Admin)\n';
        helpText += '• !setsuperadmin 628xxxxxxxxx — Set super admin\n';
        break;
        
      case 'sticker':
        helpText += '🖼️ *Command Sticker*\n\n';
        helpText += '• !sticker — Ubah foto jadi stiker (👤 User)\n';
        helpText += '• Kirim foto dengan caption !sticker\n';
        helpText += '• Reply foto dengan !sticker\n';
        break;
        
      default:
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ *Kategori tidak ditemukan!*\n\n` +
          `📋 *Kategori yang tersedia:*\n` +
            `• group, private, all\n` +
            `• user, vip, moderator, admin, superadmin\n` +
            `• role, groupinfo, tagall, welcome\n` +
            `• antispam, kick, setsuperadmin, sticker\n\n` +
            `💡 *Contoh:* !commands group`
        });
        return;
    }
    
    helpText += '\n💡 *Cara Penggunaan:*\n';
    helpText += '• Ketik command sesuai dengan tempat (grup/chat pribadi)\n';
    helpText += '• Role menentukan akses command yang tersedia\n';
    helpText += '• Gunakan *!myrole* untuk cek role Anda\n';
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: helpText
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !commands:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan daftar command.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}

// Helper function untuk mendapatkan nama role
function getRoleName(roleLevel) {
  const roleNames = {
    [ROLE_LEVELS.USER]: '👤 User',
    [ROLE_LEVELS.VIP]: '⭐ VIP',
    [ROLE_LEVELS.MODERATOR]: '🛡️ Moderator',
    [ROLE_LEVELS.ADMIN]: '👑 Admin',
    [ROLE_LEVELS.OWNER]: '🏆 Owner',
    [ROLE_LEVELS.SUPER_ADMIN]: '🚀 Super Admin'
  };
  return roleNames[roleLevel] || '👤 Unknown';
}