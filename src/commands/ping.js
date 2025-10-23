// ======================================================
// 🏓 Command: !ping — Cek koneksi bot (Baileys Compatible)
// ======================================================

export async function handlePing(sock, msg, args) {
  try {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '🏓 *Pong!* Bot aktif dan siap!'
    });
  } catch (err) {
    console.error('❌ Gagal menjalankan !ping:', err);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Terjadi kesalahan saat menjalankan ping.'
      });
    } catch (replyErr) {
      console.error('❌ Gagal mengirim pesan error:', replyErr);
    }
  }
}