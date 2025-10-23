// ======================================================
// 🔍 Command: !debugrole — Debug role detection (Baileys Compatible)
// ======================================================

import { getUserRoleLevel, getRoleName, SUPER_ADMINS } from '../core/roles.js';
import { getChatContext } from '../core/context.js';

export async function handleDebugRole(sock, msg) {
  try {
    const { chat, isGroup } = await getChatContext(sock, msg);
    
    let response = `🔍 *Debug Role Detection*\n\n`;
    response += `👤 User ID: ${msg.key.remoteJid}\n`;
    
    // Extract phone number properly
    let phoneNumber = '';
    if (msg.key.remoteJid.includes('@c.us')) {
      phoneNumber = msg.key.remoteJid.replace('@c.us', '');
    } else if (msg.key.remoteJid.includes('@s.whatsapp.net')) {
      phoneNumber = msg.key.remoteJid.replace('@s.whatsapp.net', '');
    }
    
    response += `📱 Phone Number: ${phoneNumber}\n`;
    response += `🏠 Is Group: ${isGroup ? 'Yes' : 'No'}\n`;
    
    if (isGroup) {
      response += `📋 Group Name: ${chat.name}\n`;
      response += `👥 Total Participants: ${chat.participants.length}\n\n`;
      
      // Cek participant
      const participant = chat.participants.find(p => p.id === msg.key.remoteJid);
      if (participant) {
        response += `👤 Participant Found: Yes\n`;
        response += `📱 Participant ID: ${participant.id}\n`;
        response += `👑 Is Admin: ${participant.admin === 'admin' ? 'Yes' : 'No'}\n`;
        
        // Cek nomor HP participant
        let participantPhoneNumber = '';
        if (participant.id.includes('@c.us')) {
          participantPhoneNumber = participant.id.replace('@c.us', '');
        } else if (participant.id.includes('@s.whatsapp.net')) {
          participantPhoneNumber = participant.id.replace('@s.whatsapp.net', '');
        }
        
        response += `📱 Participant Phone: ${participantPhoneNumber}\n`;
        response += `🚀 Is Super Admin: ${SUPER_ADMINS.includes(participantPhoneNumber) ? 'Yes' : 'No'}\n`;
      } else {
        response += `👤 Participant Found: No\n`;
      }
    }
    
    response += `\n📋 SUPER_ADMINS: ${JSON.stringify(SUPER_ADMINS)}\n`;
    
    // Cek role level
    const userRoleLevel = await getUserRoleLevel(msg.key.remoteJid, chat);
    const roleName = getRoleName(userRoleLevel);
    
    response += `\n🎭 Detected Role: ${roleName}\n`;
    response += `📊 Role Level: ${userRoleLevel}\n`;
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: response
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !debugrole:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat debug role.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}