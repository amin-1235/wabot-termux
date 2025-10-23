// ======================================================
// 🔐 Command Access Control — Validasi role command (Baileys Compatible)
// ======================================================

import chalk from 'chalk';
import { getChatContext } from './context.js';
import { getUserRoleLevel, hasAccess, getRoleName, ROLE_LEVELS } from './roles.js';

/**
 * Validasi apakah command boleh dijalankan sesuai role-nya
 * @param {object} entry - Data command (cmd, role, handler, dll)
 * @param {object} sock - Socket Baileys
 * @param {object} msg - Objek pesan dari Baileys
 * @returns {Promise<boolean>} - True jika diizinkan, false jika tidak
 */
export async function validateAccess(entry, sock, msg) {
  const { role, cmd, requiredRole = ROLE_LEVELS.USER } = entry;
  const { isGroup, chat } = await getChatContext(sock, msg);
  
  // Cek role level pengguna
  const userRoleLevel = await getUserRoleLevel(msg.key.remoteJid, chat);
  
  // Cek apakah pengguna memiliki akses berdasarkan role level
  if (!hasAccess(userRoleLevel, requiredRole)) {
    const userRoleName = getRoleName(userRoleLevel);
    const requiredRoleName = getRoleName(requiredRole);
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🚫 *Akses Ditolak!*\n\n` +
      `👤 Role Anda: ${userRoleName}\n` +
      `🔒 Role Diperlukan: ${requiredRoleName}\n\n` +
      `💡 Hubungi admin untuk mendapatkan akses.`
    });
    
    return false;
  }

  // Cek akses berdasarkan tempat (group/private)
  if (role === 'group' && !isGroup) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `⚠️ Perintah *${cmd}* hanya bisa digunakan di *grup*!`
    });
    return false;
  }

  if (role === 'private' && isGroup) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `⚠️ Perintah *${cmd}* hanya bisa digunakan di *chat pribadi*!`
    });
    return false;
  }

  return true;
}