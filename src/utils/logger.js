// ======================================================
// 🎨 Logger Utility — Warna & Banner
// ======================================================

import chalk from 'chalk';
import gradient from 'gradient-string';
import pino from 'pino';

// ======================================================
// 🧾 Konfigurasi Pino Pretty Logger
// ======================================================
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      singleLine: true,
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});

// ======================================================
// 🖼️ Banner — Ditampilkan Saat Bot Siap
// ======================================================
export function showBanner() {
  console.clear();

  const title = gradient.pastel.multiline(
    `
╭──────────────────────────────────────────╮
│                                          │
│   🤖  WhatsApp Bot — Modular Edition     │
│                                          │
╰──────────────────────────────────────────╯
`
  );

  console.log(title);
  console.log(chalk.gray('═══════════════════════════════════════════════'));
  console.log(chalk.green('🟢  Status   : ') + chalk.white('Active'));
  console.log(
    chalk.blue('📡  Mode     : ') +
      (process.env.HEADLESS === 'false'
        ? chalk.yellow('Headed')
        : chalk.cyan('Headless'))
  );
  console.log(chalk.magenta('💾  Session  : ') + chalk.white('./session'));
  console.log(chalk.gray('═══════════════════════════════════════════════\n'));
  console.log(chalk.green('✅ Bot sudah aktif dan siap menerima pesan!\n'));
}

// ======================================================
// 🧩 Tambahan helper (optional tapi keren)
// ======================================================
logger.success = (msg) => console.log(chalk.greenBright(`✔ ${msg}`));
logger.warn = (msg) => console.log(chalk.yellowBright(`⚠ ${msg}`));
logger.error = (msg, err = null) => {
  console.error(chalk.redBright(`❌ ${msg}`));
  if (err) console.error(chalk.gray(err.stack || err.message || err));
};

