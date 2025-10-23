// ======================================================
// 📢 Command: !tagall — Mention semua member grup (Baileys Compatible)
// ======================================================

import { getChatContext } from '../core/context.js';

export async function handleTagAll(sock, msg) {
  try {
    const { isGroup, chat } = await getChatContext(sock, msg);
    if (!isGroup) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Perintah ini hanya bisa digunakan di grup.'
      });
      return;
    }

    let text = '📢 *Mention Semua Member:*\n\n';
    const mentions = [];

    for (const participant of chat.participants) {
      try {
        mentions.push(participant.id);
        // Gunakan ID participant untuk mention
        const displayName = participant.id.split('@')[0];
        text += `@${displayName}\n`;
      } catch (contactErr) {
        console.error('❌ Gagal mendapatkan kontak:', contactErr);
        // Skip kontak yang bermasalah
        continue;
      }
    }

    if (mentions.length === 0) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Tidak ada member yang bisa di-mention.'
      });
      return;
    }

    await sock.sendMessage(chat.id._serialized, {
      text: text,
      mentions: mentions
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !tagall:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat mention semua member.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}