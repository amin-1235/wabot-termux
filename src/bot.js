// ======================================================
// 🚀 WhatsApp Bot Starter — Baileys (Termux Compatible)
// ======================================================

import 'dotenv/config';
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';
import chalk from 'chalk';
import qrcode from 'qrcode-terminal';
import Pino from 'pino';

import { logger, showBanner } from './utils/logger.js';
import { findCommand, commandList } from './commands/utama.js';
import { validateAccess } from './core/access.js';
import { sendWelcomeMessage } from './commands/welcome.js';
import { checkSpam } from './commands/antispam.js';

// Debug: Log environment variables
console.log('🔍 Environment check:');
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
console.log('🔍 SUPER_ADMIN_NUMBERS:', process.env.SUPER_ADMIN_NUMBERS);

// ======================================================
// ⚙️ Inisialisasi koneksi Baileys
// ======================================================
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(chalk.cyan(`🌀 Using Baileys v${version.join('.')}, Latest: ${isLatest}`));

  const sock = makeWASocket({
    version,
    logger: Pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ['Tzkaa-Bot', 'Safari', '1.0.0']
  });

  // ======================================================
  // 📱 QR Code Event (Baileys otomatis tampil di terminal)
  // ======================================================
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log(chalk.yellow('\n📱 Scan QR berikut untuk login:\n'));
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red('❌ Logout detected, hapus folder session lalu jalankan ulang.'));
      } else {
        console.log(chalk.yellow('🔄 Reconnecting...'));
        startBot();
      }
    } else if (connection === 'open') {
      console.log(chalk.green('✅ WhatsApp bot siap digunakan!'));
      showBanner();
    }
  });

  // ======================================================
  // 💬 Event — Pesan Masuk
  // ======================================================
  sock.ev.on('messages.upsert', async (msgUpdate) => {
    try {
      const msg = msgUpdate.messages[0];
      if (!msg.message || !msg.key.remoteJid) return;

      const from = msg.key.remoteJid;
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        '';

      if (!text || text.length < 1) return;

      if (text.startsWith('!')) {
        console.log(chalk.blue(`📨 Command diterima: "${text}" dari ${from}`));

        // Cek spam
        const isSpam = await checkSpam(sock, msg);
        if (isSpam) {
          console.log(chalk.red(`🚫 Spam terdeteksi dari: ${from}`));
          return;
        }

        const matched = findCommand(text);
        if (!matched) return;

        const { cmd, args } = matched;
        const entry = commandList.find(c => c.cmd === cmd);
        if (!entry) return;

        const allowed = await validateAccess(entry, sock, msg);
        if (!allowed) return;

        console.log(chalk.yellow(`⚡ Menjalankan command: ${cmd}`));
        await entry.handler(sock, msg, args);
      }
    } catch (err) {
      logger.error('❌ Error memproses pesan:', err);
    }
  });

  // ======================================================
  // 👥 Event — Member Join Group
  // ======================================================
  sock.ev.on('group-participants.update', async (update) => {
    try {
      const { id, participants, action } = update;

      if (action === 'add') {
        for (const user of participants) {
          console.log(chalk.green(`👥 ${user} baru bergabung ke grup ${id}`));
          await sendWelcomeMessage(sock, id, user);
        }
      }

      if (action === 'remove') {
        for (const user of participants) {
          console.log(chalk.red(`👋 ${user} keluar dari grup ${id}`));
          await sock.sendMessage(id, {
            text: `👋 *Member Keluar*\n\n👤 @${user.split('@')[0]} telah keluar.`,
            mentions: [user]
          });
        }
      }
    } catch (err) {
      logger.error('❌ Error pada group event:', err);
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

startBot();