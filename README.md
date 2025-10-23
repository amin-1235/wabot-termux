
# 🤖 WhatsApp Bot - Modular Edition (Termux Compatible)

Bot WhatsApp modular berbasis Baileys yang kompatibel dengan Termux dan memiliki sistem role management yang lengkap.

## ✨ Fitur Utama

- 🎭 **Sistem Role Management** - 6 level role (User, VIP, Moderator, Admin, Owner, Super Admin)
- 🏠 **Group Management** - Welcome message, anti-spam, kick user, tag all
- 🛡️ **Access Control** - Command berdasarkan role dan tempat (grup/private)
- 🎨 **Sticker Maker** - Convert gambar ke sticker WhatsApp
- 📊 **Group Info** - Informasi lengkap grup dan member
- 🔧 **Modular Design** - Command terpisah per file untuk mudah maintenance
- 📱 **Termux Compatible** - Optimized untuk Termux Android

## 🚀 Quick Start

### Prerequisites

- **Termux** (Android) atau **Linux/MacOS**
- **Node.js** (versi 16+)
- **WhatsApp** account

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/username/wa-bot-termux-by-tzka.git
cd wa-bot-termux-by-tzka
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment**
```bash
# Copy dan edit file .env
cp .env.example .env
nano .env
```

4. **Configure Super Admin**
Edit file `.env` dan tambahkan nomor HP Super Admin:
```bash
SUPER_ADMIN_NUMBERS=6281234567890,6289876543210
```

5. **Run Bot**
```bash
# Menggunakan script optimized
chmod +x start-optimized.sh
./start-optimized.sh

# Atau manual
npm start
```

## 📋 Command List

### 🔓 Command Umum (👤 User)
- `!help` - Tampilkan daftar bantuan
- `!ping` - Cek koneksi bot
- `!myrole` - Cek role Anda saat ini
- `!commands` - Daftar command berdasarkan kategori
- `!list` - Daftar command berdasarkan tempat
- `!rolecommands` - Daftar command berdasarkan role
- `!placecommands` - Command berdasarkan tempat
- `!categories` - Daftar kategori command
- `!groupinfo` - Informasi grup (grup only)
- `!sticker` - Convert gambar ke sticker

### ⭐ Command VIP (⭐ VIP)
- `!tagall` - Mention semua member grup (grup only)

### 🛡️ Command Moderator (🛡️ Moderator)
- `!rolelist` - Tampilkan daftar role yang tersedia
- `!welcome` - Pengaturan pesan selamat datang (grup only)
- `!antispam` - Pengaturan sistem anti-spam (grup only)

### 👑 Command Admin (👑 Admin)
- `!setrole` - Set role pengguna lain
- `!kick` - Keluarkan user dari grup (grup only)

### 🚀 Command Super Admin (🚀 Super Admin)
- `!setsuperadmin` - Set role super admin di grup (grup only)
- `!debugrole` - Debug role detection

## 🎭 Role System

Bot menggunakan sistem role dengan 6 level:

| Level | Role | Emoji | Description |
|-------|------|-------|-------------|
| 0 | User | 👤 | Command dasar |
| 1 | VIP | ⭐ | Command VIP |
| 2 | Moderator | 🛡️ | Command moderator |
| 3 | Admin | 👑 | Command admin |
| 4 | Owner | 🏆 | Owner grup |
| 5 | Super Admin | 🚀 | Kontrol penuh |

### Role Assignment

- **User**: Default role untuk semua user
- **VIP**: Dapat di-set oleh Moderator ke atas
- **Moderator**: Dapat di-set oleh Admin ke atas
- **Admin**: Dapat di-set oleh Super Admin
- **Owner**: Role otomatis untuk owner grup
- **Super Admin**: Dapat di-set oleh Super Admin lain

## 🔧 Configuration

### Environment Variables (.env)

```bash
# Bot Configuration
NODE_ENV=production
LOG_LEVEL=info
HEADLESS=true

# Super Admin Numbers (comma separated)
SUPER_ADMIN_NUMBERS=6281234567890,6289876543210

# Bot Settings
BOT_NAME=Tzkaa-Bot
BOT_VERSION=1.0.0
```

### Customization

1. **Super Admin**: Edit `SUPER_ADMIN_NUMBERS` di `.env`
2. **Welcome Message**: Gunakan `!welcome` di grup
3. **Anti-Spam**: Gunakan `!antispam` di grup
4. **Role Management**: Gunakan `!setrole` untuk mengubah role

## 📱 Termux Setup

### Install Termux
```bash
# Download dari F-Droid atau Google Play
# Install Termux
```

### Setup Termux
```bash
# Update packages
pkg update && pkg upgrade

# Install Node.js
pkg install nodejs

# Install Git
pkg install git

# Install dependencies
npm install
```

### Run Bot di Termux
```bash
# Clone repository
git clone https://github.com/username/wa-bot-termux-by-tzka.git
cd wa-bot-termux-by-tzka

# Install dependencies
npm install

# Setup environment
cp .env.example .env
nano .env

# Run bot
./start-optimized.sh
```

## 🛠️ Development

### Project Structure
```
src/
├── bot.js              # Main bot file
├── commands/           # Command modules
│   ├── antispam.js     # Anti-spam system
│   ├── help.js         # Help command
│   ├── ping.js         # Ping command
│   ├── rolelist.js     # Role list
│   ├── setrole.js      # Set role
│   ├── sticker.js      # Sticker maker
│   ├── tagall.js       # Tag all members
│   ├── welcome.js      # Welcome message
│   └── ...
├── core/               # Core modules
│   ├── access.js       # Access control
│   ├── context.js      # Chat context
│   └── roles.js        # Role management
└── utils/              # Utilities
    └── logger.js       # Logging system
```

### Adding New Commands

1. **Create Command File**
```javascript
// src/commands/newcommand.js
export async function handleNewCommand(sock, msg, args) {
  try {
    await sock.sendMessage(msg.key.remoteJid, {
      text: 'Hello from new command!'
    });
  } catch (err) {
    console.error('❌ Error:', err);
  }
}
```

2. **Register Command**
```javascript
// src/commands/utama.js
import { handleNewCommand } from './newcommand.js';

const commandList = [
  // ... existing commands
  {
    cmd: 'newcommand',
    handler: handleNewCommand,
    role: 'any', // 'group', 'private', 'any'
    requiredRole: ROLE_LEVELS.USER,
    description: 'New command description'
  }
];
```

### Customizing Role System

Edit `src/core/roles.js` untuk mengubah:
- Role levels
- Super admin numbers
- Role names
- Role descriptions

## 🐛 Troubleshooting

### Common Issues

1. **Bot tidak connect**
   - Pastikan nomor HP valid
   - Cek koneksi internet
   - Restart bot

2. **Command tidak work**
   - Cek role user
   - Pastikan command di grup/private sesuai
   - Cek log error

3. **Permission denied**
   - Pastikan user memiliki role yang cukup
   - Cek super admin configuration

4. **Termux issues**
   - Update Termux: `pkg update && pkg upgrade`
   - Install Node.js: `pkg install nodejs`
   - Check permissions

### Debug Mode

Gunakan `!debugrole` untuk debug role detection:
```
!debugrole
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/username/wa-bot-termux-by-tzka/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/wa-bot-termux-by-tzka/discussions)
- **Documentation**: [Wiki](https://github.com/username/wa-bot-termux-by-tzka/wiki)

## 🙏 Acknowledgments

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [Termux](https://termux.com/) - Android terminal emulator
- Community contributors

---

**⚠️ Disclaimer**: Bot ini untuk keperluan edukasi dan personal use. Gunakan dengan bijak dan patuhi ToS WhatsApp.

**🔒 Security**: Jangan share session folder dan file .env ke publik.

**📱 Compatibility**: Tested on Termux Android, Linux, macOS.

## 🔧 Buat File `.env`

```bash:.env
# Bot Configuration
NODE_ENV=production
LOG_LEVEL=info
HEADLESS=true

# Super Admin Numbers (add your phone number here)
SUPER_ADMIN_NUMBERS=6281234567890

# Bot Settings
BOT_NAME=Tzkaa-Bot
BOT_VERSION=1.0.0
```

## 📋 Ringkasan Perbaikan:

### ✅ Menghapus Nomor HP dari Semua Script:
1. **`src/core/roles.js`** - Menghapus nomor HP hardcoded, hanya membaca dari `.env`
2. **`src/commands/setsuperadmin.js`** - Mengganti contoh nomor HP dengan placeholder
3. **`README.md`** - Mengganti contoh nomor HP dengan placeholder

### ✅ Keamanan yang Ditingkatkan:
- Nomor HP hanya tersimpan di file `.env`
- Tidak ada nomor HP yang ter-expose di kode
- Lebih mudah untuk mengubah konfigurasi tanpa edit kode

### 🔧 Langkah Selanjutnya:
1. **Buat file `.env`** dengan nomor HP Anda yang sebenarnya
2. **Restart bot** untuk memuat konfigurasi baru
3. **Test command** untuk memastikan semuanya berfungsi

Sekarang semua nomor HP sudah aman dan hanya tersimpan di file `.env`! 🔒