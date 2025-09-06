const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Construyendo aplicación para Electron...');

try {
  // 1. Construir la aplicación web
  console.log('📦 Construyendo aplicación web...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Verificar que el directorio dist existe
  if (!fs.existsSync('dist')) {
    throw new Error('El directorio dist no fue creado');
  }

  // 3. Construir la aplicación Electron
  console.log('⚡ Construyendo aplicación Electron...');
  execSync('npx electron-builder --win', { stdio: 'inherit' });

  console.log('✅ ¡Aplicación construida exitosamente!');
  console.log('📁 El instalador está en: dist-electron/');
  
} catch (error) {
  console.error('❌ Error durante la construcción:', error.message);
  process.exit(1);
}