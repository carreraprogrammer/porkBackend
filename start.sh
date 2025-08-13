#!/bin/sh
echo "▶️ EJECUTANDO START.SH..."
echo "🔁 Ejecutando migraciones..."
npx prisma migrate deploy || exit 1

echo "✅ Migración exitosa."

echo "🌱 Ejecutando seeds..."
node dist/prisma/seed.js || exit 1

echo "✅ Seeds ejecutadas."

exec node dist/src/main.js
