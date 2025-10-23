// ======================================================
// 📖 Command: !help — Tampilkan daftar bantuan (Baileys Compatible)
// ======================================================

import { ROLE_LEVELS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleHelp(sock, msg) {
  try {
    const { isGroup } = await getChatContext(sock, msg);
    
    let helpText = '📖 *Daftar Perintah Bot*\n\n';
    
    // Hardcode command list untuk menghindari circular import
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
    
    if (isGroup) {
      // Help untuk grup
      helpText += '🏠 *Command untuk Grup*\n\n';
      
      helpText += '🔓 *Command Umum:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.USER && cmd.role === 'group').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n⭐ *Command VIP:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.VIP && cmd.role === 'group').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n🛡️ *Command Moderator:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.MODERATOR && cmd.role === 'group').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n👑 *Command Admin:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.ADMIN && cmd.role === 'group').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n🚀 *Command Super Admin:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.SUPER_ADMIN && cmd.role === 'group').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n💬 *Command yang Bisa Digunakan di Grup dan Chat Pribadi:*\n';
      commands.filter(cmd => cmd.role === 'all').forEach(({ cmd, desc, requiredRole }) => {
        const roleName = getRoleName(requiredRole);
        helpText += `• ${cmd} — ${desc} (${roleName})\n`;
      });
      
    } else {
      // Help untuk chat pribadi
      helpText += '💬 *Command untuk Chat Pribadi*\n\n';
      
      helpText += '🔓 *Command Umum:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.USER && cmd.role === 'all').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n🛡️ *Command Moderator:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.MODERATOR && cmd.role === 'all').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n👑 *Command Admin:*\n';
      commands.filter(cmd => cmd.requiredRole === ROLE_LEVELS.ADMIN && cmd.role === 'all').forEach(({ cmd, desc }) => {
        helpText += `• ${cmd} — ${desc}\n`;
      });
      
      helpText += '\n🏠 *Command yang Hanya Bisa Digunakan di Grup:*\n';
      commands.filter(cmd => cmd.role === 'group').forEach(({ cmd, desc, requiredRole }) => {
        const roleName = getRoleName(requiredRole);
        helpText += `• ${cmd} — ${desc} (${roleName})\n`;
      });
    }
    
    helpText += '\n💡 *Cara Penggunaan:*\n';
    helpText += '• Ketik command sesuai dengan tempat (grup/chat pribadi)\n';
    helpText += '• Role menentukan akses command yang tersedia\n';
    helpText += '• Gunakan *!myrole* untuk cek role Anda\n';
    helpText += '• Beberapa command hanya bisa digunakan di grup\n';
    
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
    console.error('❌ Gagal menjalankan !help:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menampilkan bantuan.'
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