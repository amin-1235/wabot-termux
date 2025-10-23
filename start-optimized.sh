#!/bin/bash
# 🚀 Bot Performance Optimization Script

echo "🚀 Optimizing WhatsApp Bot Performance..."

# Set environment variables
export NODE_ENV=production
export UV_THREADPOOL_SIZE=16
export LOG_LEVEL=info

# Clear cache
echo "🧹 Clearing cache..."
rm -rf node_modules/.cache
rm -rf .wwebjs_cache

# Clear session if needed (uncomment if having issues)
# echo "🗑️ Clearing session..."
# rm -rf session/

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Start bot with optimizations
echo "🚀 Starting optimized bot..."
node src/bot.js