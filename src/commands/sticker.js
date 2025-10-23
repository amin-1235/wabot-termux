// ======================================================
// 🖼️ Command: !sticker — Ubah gambar menjadi stiker (Baileys Compatible)
// ======================================================

import { downloadMediaMessage } from '@whiskeysockets/baileys';

export async function handleSticker(sock, msg, args) {
  try {
    // Cek apakah pesan memiliki media
    if (!msg.message.imageMessage && !msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '⚠️ Kirim atau balas gambar dengan caption *!sticker* untuk membuat stiker.'
      });
      return;
    }

    let imageMessage;
    
    // Cek apakah ada quoted message (reply)
    if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
      imageMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
    } else if (msg.message.imageMessage) {
      imageMessage = msg.message.imageMessage;
    }

    if (!imageMessage) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Tidak ada gambar yang ditemukan.'
      });
      return;
    }

    // Download media menggunakan Baileys
    const media = await downloadMediaMessage(msg, 'buffer', {}, {
      logger: console,
      reuploadRequest: sock.updateMediaMessage
    });
    
    if (!media) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Gagal mengunduh media.'
      });
      return;
    }

    // Kirim sebagai sticker dengan format yang benar untuk Baileys
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        sticker: media
      });
    } catch (stickerErr) {
      console.error('❌ Error sending sticker:', stickerErr);
      // Fallback: kirim sebagai gambar biasa
      await sock.sendMessage(msg.key.remoteJid, {
        image: media,
        caption: '⚠️ Gagal membuat sticker, dikirim sebagai gambar'
      });
      return;
    }
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: '✅ Sticker berhasil dibuat!'
    });
  } catch (err) {
    console.error('❌ Gagal membuat stiker:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat membuat stiker.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}