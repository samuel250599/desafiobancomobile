# Guia de Execução dos Testes

## Pré-requisitos Necessários

### 1. Android Studio e SDK

```bash
# macOS
brew install --cask android-studio

# Configure ANDROID_HOME
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

### 2. Criar Emulador Android

```bash
# Listar AVDs disponíveis
emulator -list-avds

# Criar novo AVD (se não existir)
avdmanager create avd -n ci_emulator -k "system-images;android-34;google_apis;x86_64"

# Iniciar emulador
emulator -avd ci_emulator -no-audio -no-boot-anim &
```

### 3. Instalar Dependências

```bash
cd native-demo-app-tests
npm install
npm install -g appium
appium driver install uiautomator2
```

### 4. Baixar o APK

O APK já está em: `app/android/android-wdio-demo-app.apk`

## Executar Testes

### Iniciar Appium

```bash
appium --base-path=/wd/hub
```

### Executar em outro terminal

```bash
# Todos os testes
npm run test:android

# Smoke tests
npm run test:smoke

# Regression tests
npm run test:regression

# Apenas Login
npm run test:login

# Apenas Forms
npm run test:forms
```

## Gerar Relatório Allure

```bash
npm run allure:serve
# ou
npm run allure:generate
npm run allure:open
```

## Estrutura dos Testes

| Arquivo | Cenários | Tags |
|---------|----------|------|
| login.spec.js | Login válido, inválido, campos vazios | @smoke @regression |
| forms.spec.js | Input, switch, dropdown, modal | @smoke @regression |
| swipe.spec.js | Carrossel, swipes múltiplos | @smoke @regression |
| drag.spec.js | Drag and drop | @regression |
| navigation.spec.js | Navegação entre telas | @smoke @regression |
| webview.spec.js | Contexto WebView | @regression |

## Troubleshooting

### Emulador não inicia
```bash
# Reiniciar ADB
adb kill-server
adb start-server

# Verificar processo
adb devices
```

### Appium não conecta
```bash
# Verificar se Appium está rodando
curl http://localhost:4723/status

# Reiniciar Appium
pkill -f appium
appium --base-path=/wd/hub
```

### Elemento não encontrado
- Verificar seletores com `driver.getPageSource()`
- Aumentar timeout em `wdio.conf.js`
- Verificar se o app foi instalado corretamente