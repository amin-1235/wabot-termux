// ======================================================
// 💬 Context Detector — Deteksi Jenis Chat (Baileys Compatible)
// ======================================================

import chalk from 'chalk';
import { logger } from '../utils/logger.js';

// ======================================================
// 🧠 Fungsi Utama: Deteksi Konteks Chat
// ======================================================
export async function getChatContext(sock, msg) {
  try {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    let chatName = 'Chat Pribadi';
    let chat = null;
    
    if (isGroup) {
      try {
        const groupMetadata = await sock.groupMetadata(from);
        chatName = groupMetadata.subject || 'Tanpa Nama Grup';
        chat = {
          id: { _serialized: from },
          isGroup: true,
          name: chatName,
          participants: groupMetadata.participants || []
        };
      } catch (err) {
        chatName = 'Grup Tidak Diketahui';
        chat = {
          id: { _serialized: from },
          isGroup: true,
          name: chatName,
          participants: []
        };
      }
    } else {
      chat = {
        id: { _serialized: from },
        isGroup: false,
        name: 'Chat Pribadi',
        participants: []
      };
    }

    // Label warna untuk log
    const label = isGroup ? chalk.yellow('[GROUP]') : chalk.green('[PRIVATE]');

    return {
      chat,
      isGroup,
      chatName,
      label,
    };
  } catch (err) {
    logger.error('Gagal mendapatkan konteks chat', err);
    return {
      chat: null,
      isGroup: false,
      chatName: 'Unknown',
      label: chalk.red('[UNKNOWN]'),
    };
  }
}