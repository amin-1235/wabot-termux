// ======================================================
// 👥 Role Management System — Sistem Pengelolaan Role (Baileys Compatible)
// ======================================================

import chalk from 'chalk';

// 🎭 Level Role dari terendah ke tertinggi
export const ROLE_LEVELS = {
  USER: 0,        // User biasa
  VIP: 1,         // VIP user
  MODERATOR: 2,   // Moderator grup
  ADMIN: 3,       // Admin grup
  OWNER: 4,       // Owner grup
  SUPER_ADMIN: 5  // Super admin (developer)
};

// 📋 Daftar Role dengan nama yang mudah dipahami
export const ROLE_NAMES = {
  [ROLE_LEVELS.USER]: '👤 User',
  [ROLE_LEVELS.VIP]: '⭐ VIP',
  [ROLE_LEVELS.MODERATOR]: '🛡️ Moderator',
  [ROLE_LEVELS.ADMIN]: '👑 Admin',
  [ROLE_LEVELS.OWNER]: '🏆 Owner',
  [ROLE_LEVELS.SUPER_ADMIN]: '🚀 Super Admin'
};

// 🗄️ Database role sederhana (bisa diganti dengan database nyata)
const roleDatabase = new Map();

// 📱 Database super admin (nomor HP yang bisa jadi super admin)
// Baca dari environment variable
const superAdminNumbers = process.env.SUPER_ADMIN_NUMBERS || '';
export const SUPER_ADMINS = superAdminNumbers ? superAdminNumbers.split(',').map(num => num.trim()) : [];

// Debug: Log super admin numbers
console.log('🔍 Super Admin Numbers loaded:', SUPER_ADMINS);

/**
 * Mendapatkan role level pengguna
 * @param {string} userId - ID pengguna WhatsApp
 * @param {object} chat - Objek chat (untuk grup)
 * @returns {Promise<number>} - Level role pengguna
 */
export async function getUserRoleLevel(userId, chat = null) {
  try {
    // Debug: Log user ID
    console.log('🔍 Checking role for user:', userId);
    
    // Ekstrak nomor HP dengan benar - handle multiple formats
    let phoneNumber = '';
    if (userId.includes('@c.us')) {
      // ID pribadi: [phone]@c.us
      phoneNumber = userId.replace('@c.us', '');
    } else if (userId.includes('@s.whatsapp.net')) {
      // ID pribadi: [phone]@s.whatsapp.net (format baru)
      phoneNumber = userId.replace('@s.whatsapp.net', '');
    } else if (userId.includes('@g.us')) {
      // ID grup: [group_id]@g.us
      // Untuk grup, kita perlu cek apakah user adalah super admin berdasarkan nomor HP
      
      // Cek role dari database terlebih dahulu
      if (roleDatabase.has(userId)) {
        return roleDatabase.get(userId);
      }
      
      // Jika di grup, cek role berdasarkan status grup
      if (chat && chat.isGroup) {
        const participant = chat.participants.find(p => p.id === userId);
        if (participant) {
          // Cek apakah user adalah super admin berdasarkan nomor HP
          let participantPhoneNumber = '';
          if (participant.id.includes('@c.us')) {
            participantPhoneNumber = participant.id.replace('@c.us', '');
          } else if (participant.id.includes('@s.whatsapp.net')) {
            participantPhoneNumber = participant.id.replace('@s.whatsapp.net', '');
          }
          
          if (SUPER_ADMINS.includes(participantPhoneNumber)) {
            return ROLE_LEVELS.SUPER_ADMIN;
          }
          
          return participant.admin === 'admin' ? ROLE_LEVELS.ADMIN : ROLE_LEVELS.USER;
        }
      }
      
      // Default role untuk user baru di grup
      return ROLE_LEVELS.USER;
    }

    console.log('📱 Extracted phone number:', phoneNumber);
    console.log('🚀 Is super admin?', SUPER_ADMINS.includes(phoneNumber));

    // Cek apakah super admin (untuk ID pribadi)
    if (phoneNumber && SUPER_ADMINS.includes(phoneNumber)) {
      console.log('✅ User is SUPER_ADMIN!');
      return ROLE_LEVELS.SUPER_ADMIN;
    }

    // Cek role dari database
    if (roleDatabase.has(userId)) {
      return roleDatabase.get(userId);
    }

    // Jika di grup, cek role berdasarkan status grup
    if (chat && chat.isGroup) {
      const participant = chat.participants.find(p => p.id === userId);
      if (participant) {
        // Cek apakah user adalah super admin berdasarkan nomor HP
        let participantPhoneNumber = '';
        if (participant.id.includes('@c.us')) {
          participantPhoneNumber = participant.id.replace('@c.us', '');
        } else if (participant.id.includes('@s.whatsapp.net')) {
          participantPhoneNumber = participant.id.replace('@s.whatsapp.net', '');
        }
        
        if (SUPER_ADMINS.includes(participantPhoneNumber)) {
          return ROLE_LEVELS.SUPER_ADMIN;
        }
        
        return participant.admin === 'admin' ? ROLE_LEVELS.ADMIN : ROLE_LEVELS.USER;
      }
    }

    // Default role untuk user baru
    return ROLE_LEVELS.USER;
  } catch (err) {
    console.error('❌ Error getting user role:', err);
    return ROLE_LEVELS.USER;
  }
}

/**
 * Set role level pengguna
 * @param {string} userId - ID pengguna WhatsApp
 * @param {number} roleLevel - Level role baru
 * @returns {boolean} - True jika berhasil
 */
export function setUserRole(userId, roleLevel) {
  try {
    if (roleLevel < ROLE_LEVELS.USER || roleLevel > ROLE_LEVELS.SUPER_ADMIN) {
      return false;
    }
    
    roleDatabase.set(userId, roleLevel);
    console.log(chalk.green(`✅ Role updated: ${userId} -> ${ROLE_NAMES[roleLevel]}`));
    return true;
  } catch (err) {
    console.error('❌ Error setting user role:', err);
    return false;
  }
}

/**
 * Cek apakah pengguna memiliki akses ke command
 * @param {number} userRoleLevel - Level role pengguna
 * @param {number} requiredRoleLevel - Level role yang dibutuhkan
 * @returns {boolean} - True jika memiliki akses
 */
export function hasAccess(userRoleLevel, requiredRoleLevel) {
  return userRoleLevel >= requiredRoleLevel;
}

/**
 * Mendapatkan nama role berdasarkan level
 * @param {number} roleLevel - Level role
 * @returns {string} - Nama role
 */
export function getRoleName(roleLevel) {
  return ROLE_NAMES[roleLevel] || '👤 Unknown';
}

/**
 * Mendapatkan semua role yang tersedia
 * @returns {Array} - Array berisi semua role
 */
export function getAllRoles() {
  return Object.entries(ROLE_NAMES).map(([level, name]) => ({
    level: parseInt(level),
    name: name
  }));
}

/**
 * Mendapatkan nomor HP dari user ID
 * @param {string} userId - ID pengguna WhatsApp
 * @returns {string} - Nomor HP atau empty string
 */
export function getPhoneNumberFromUserId(userId) {
  if (userId.includes('@c.us')) {
    return userId.replace('@c.us', '');
  }
  return '';
}

/**
 * Cek apakah pengguna adalah super admin
 * @param {string} userId - ID pengguna WhatsApp
 * @returns {boolean} - True jika super admin
 */
export function isSuperAdmin(userId) {
  const phoneNumber = getPhoneNumberFromUserId(userId);
  return SUPER_ADMINS.includes(phoneNumber);
}

/**
 * Cek apakah nomor HP adalah super admin
 * @param {string} phoneNumber - Nomor HP
 * @returns {boolean} - True jika super admin
 */
export function isPhoneNumberSuperAdmin(phoneNumber) {
  return SUPER_ADMINS.includes(phoneNumber);
}