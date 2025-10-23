// ======================================================
// 🧩 Command Registry — Daftar semua command bot
// ======================================================

import { handlePing } from './ping.js';
import { handleHelp } from './help.js';
import { handleTagAll } from './tagall.js';
import { handleSticker } from './sticker.js';
import { handleSetRole } from './setrole.js';
import { handleMyRole } from './myrole.js';
import { handleRoleList } from './rolelist.js';
import { handleWelcome } from './welcome.js';
import { handleAntispam } from './antispam.js';
import { handleGroupInfo } from './groupinfo.js';
import { handleKick } from './kick.js';
import { handleSetSuperAdmin } from './setsuperadmin.js';
import { handleCommands } from './commands.js';
import { handleList } from './list.js';
import { handleRoleCommands } from './rolecommands.js';
import { handlePlaceCommands } from './placecommands.js';
import { handleCategories } from './categories.js';
import { handleDebugRole } from './debugrole.js';
import { ROLE_LEVELS } from '../core/roles.js';

// 📜 Daftar command dengan role akses
export const commandList = [
  // Command untuk semua user
  { cmd: '!help', desc: 'Tampilkan daftar bantuan', handler: handleHelp, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!ping', desc: 'Cek koneksi bot (balas "pong")', handler: handlePing, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!sticker', desc: 'Ubah foto jadi stiker', handler: handleSticker, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!myrole', desc: 'Cek role Anda saat ini', handler: handleMyRole, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!commands', desc: 'Daftar command berdasarkan kategori', handler: handleCommands, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!list', desc: 'Daftar command berdasarkan tempat (grup/chat pribadi)', handler: handleList, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!rolecommands', desc: 'Daftar command berdasarkan role', handler: handleRoleCommands, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!placecommands', desc: 'Daftar command berdasarkan tempat', handler: handlePlaceCommands, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!categories', desc: 'Daftar kategori command', handler: handleCategories, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!debugrole', desc: 'Debug role detection', handler: handleDebugRole, role: 'all', requiredRole: ROLE_LEVELS.USER },
  { cmd: '!groupinfo', desc: 'Informasi grup', handler: handleGroupInfo, role: 'group', requiredRole: ROLE_LEVELS.USER },
  
  // Command untuk VIP
  { cmd: '!tagall', desc: 'Mention semua member grup', handler: handleTagAll, role: 'group', requiredRole: ROLE_LEVELS.VIP },
  
  // Command untuk moderator
  { cmd: '!rolelist', desc: 'Tampilkan daftar role yang tersedia', handler: handleRoleList, role: 'all', requiredRole: ROLE_LEVELS.MODERATOR },
  { cmd: '!welcome', desc: 'Pengaturan pesan selamat datang', handler: handleWelcome, role: 'group', requiredRole: ROLE_LEVELS.MODERATOR },
  { cmd: '!antispam', desc: 'Pengaturan sistem anti-spam', handler: handleAntispam, role: 'group', requiredRole: ROLE_LEVELS.MODERATOR },
  
  // Command untuk admin (SUPER_ADMIN juga bisa)
  { cmd: '!setrole', desc: 'Set role pengguna lain', handler: handleSetRole, role: 'all', requiredRole: ROLE_LEVELS.ADMIN },
  { cmd: '!kick', desc: 'Keluarkan user dari grup', handler: handleKick, role: 'group', requiredRole: ROLE_LEVELS.ADMIN },
  
  // Command untuk super admin
  { cmd: '!setsuperadmin', desc: 'Set role super admin di grup', handler: handleSetSuperAdmin, role: 'group', requiredRole: ROLE_LEVELS.SUPER_ADMIN },
];

// 🔍 Fungsi pencari command
export function findCommand(text) {
  if (!text || typeof text !== 'string') return null;

  for (const { cmd } of commandList) {
    if (text === cmd || text.startsWith(cmd + ' ')) {
      const args = text.slice(cmd.length).trim().split(/\s+/).filter(Boolean);
      return { cmd, args };
    }
  }

  return null;
}
