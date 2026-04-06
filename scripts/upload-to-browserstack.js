#!/usr/bin/env node
/**
 * Script para fazer upload do APK para BrowserStack
 * Execute: node scripts/upload-to-browserstack.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'samuelsilva_AQmP2p';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'ZVFjptUpijjSGaWN3y7u';

const APK_PATH = path.join(__dirname, '..', 'app', 'android', 'android-wdio-demo-app.apk');

function uploadApp() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(APK_PATH)) {
      reject(new Error(`APK não encontrado em: ${APK_PATH}`));
      return;
    }

    const fileSize = fs.statSync(APK_PATH).size;
    console.log(`📁 APK encontrado: ${APK_PATH}`);
    console.log(`📏 Tamanho: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
    console.log('⏳ Enviando para BrowserStack...\n');

    const options = {
      hostname: 'api-cloud.browserstack.com',
      port: 443,
      path: '/app-automate/upload',
      method: 'POST',
      auth: `${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}`,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileSize,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.app_url) {
            console.log('✅ Upload concluído!');
            console.log(`📦 App URL: ${response.app_url}`);
            console.log(`\n📝 Adicione ao seu .env:`);
            console.log(`BROWSERSTACK_APP_URL=${response.app_url}`);
            resolve(response.app_url);
          } else {
            reject(new Error(`Erro na resposta: ${data}`));
          }
        } catch (error) {
          reject(new Error(`Erro ao parsear resposta: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Erro na requisição: ${error.message}`));
    });

    const fileStream = fs.createReadStream(APK_PATH);
    fileStream.pipe(req);
  });
}

// Executar upload
uploadApp()
  .then((appUrl) => {
    // Salvar URL em arquivo para uso posterior
    const envPath = path.join(__dirname, '..', '.env.browserstack');
    fs.writeFileSync(envPath, `BROWSERSTACK_APP_URL=${appUrl}\n`);
    console.log(`\n💾 URL salva em: ${envPath}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  });