# Native Demo App - Mobile Test Automation

Framework de automação mobile para testes do aplicativo WebdriverIO Native Demo App, implementado com WebdriverIO, Appium, Mocha, Chai e Allure Report.

## Stack

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| WebdriverIO | 8.x | Framework de automação |
| Appium | 2.x | Driver mobile |
| Mocha | - | Test runner |
| Chai | 4.x | Assertions |
| Allure | 2.x | Relatórios |
| GitLab CI | - | CI/CD |

## Pré-requisitos

### Android
- Node.js 18+
- Java JDK 11+
- Android SDK com emulador AVD
- Appium 2.x

### iOS (macOS apenas)
- Xcode 15+
- iOS Simulator
- Carthage (instalado via Appium)

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Instalar drivers Appium

```bash
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS
```

### 3. Baixar o app

```bash
# Android APK
mkdir -p app/android
# Baixar de: https://github.com/webdriverio/native-demo-app/releases
# Salvar como: app/android/android-wdio-demo-app.apk

# iOS (macOS apenas)
mkdir -p app/ios
# Baixar o .app e salvar em: app/ios/ios-wdio-demo-app.app
```

### 4. Iniciar Appium

```bash
appium --base-path=/wd/hub
```

## Execução

### Todos os testes

```bash
npm test                    # Configuração padrão
npm run test:android        # Android
npm run test:ios            # iOS (macOS)
```

### Por suíte

```bash
npm run test:smoke          # Smoke tests
npm run test:regression     # Regression tests
```

### Por feature

```bash
npm run test:login          # Login tests
npm run test:forms          # Forms tests
npm run test:swipe          # Swipe tests
npm run test:drag           # Drag tests
npm run test:navigation     # Navigation tests
```

### Seletores específicos

```bash
npx wdio wdio.conf.js --spec tests/specs/login.spec.js
npx wdio wdio.conf.js --grep "@smoke"
npx wdio wdio.conf.js --grep "@regression"
```

## Estrutura do Projeto

```
native-demo-app-tests/
├── config/
│   ├── wdio.android.conf.js    # Config Android
│   ├── wdio.ios.conf.js        # Config iOS
│   └── capabilities/            # Capabilities por plataforma
├── src/
│   ├── pages/                  # Page Objects
│   │   ├── base.page.js        # Classe base
│   │   ├── home.page.js        # Tela Home
│   │   ├── login.page.js       # Tela Login
│   │   ├── forms.page.js       # Tela Forms
│   │   ├── swipe.page.js       # Tela Swipe
│   │   ├── drag.page.js        # Tela Drag
│   │   ├── webview.page.js     # Tela WebView
│   │   └── menu.page.js        # Menu lateral
│   ├── utils/                  # Utilitários
│   │   ├── gestures.js         # Gestos touch
│   │   ├── helpers.js          # Helpers gerais
│   │   └── logger.js            # Logging
│   └── data/
│       └── test-data.json       # Data-driven
├── tests/
│   └── specs/                  # Testes
│       ├── login.spec.js        # Login tests
│       ├── forms.spec.js        # Forms tests
│       ├── swipe.spec.js        # Swipe tests
│       ├── drag.spec.js         # Drag tests
│       ├── navigation.spec.js   # Navigation tests
│       └── webview.spec.js      # WebView tests
├── .gitlab-ci.yml              # Pipeline CI/CD
├── wdio.conf.js                # Config principal
└── package.json
```

## Cenários de Teste

| # | Cenário | Descrição |
|---|---------|-----------|
| 1 | Login válido | Fluxo completo de autenticação |
| 2 | Login inválido | Validação de erro com credenciais erradas |
| 3 | Campos obrigatórios | Validação de campos vazios |
| 4 | Forms - preenchimento | Submit de formulário válido |
| 5 | Forms - validação | Erros em campos obrigatórios |
| 6 | Swipe - carrossel | Navegação horizontal |
| 7 | Drag - puzzle | Drag and drop de peças |
| 8 | Navigation - fluxo | Navegação entre telas |
| 9 | WebView - contexto | Troca entre contextos |
| 10 | Menu - side panel | Navegação lateral |

## Page Objects

### Estrutura base

```javascript
// src/pages/base.page.js
class BasePage {
  async waitForElement(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async clickElement(selector) {
    const element = await this.waitForClickable(selector);
    await element.click();
  }

  async setValue(selector, value) {
    const element = await this.waitForElement(selector);
    await element.clearValue();
    await element.setValue(value);
  }
}
```

### Exemplo de uso

```javascript
// tests/specs/login.spec.js
const LoginPage = require('../../src/pages/login.page');

describe('Login Screen', () => {
  it('should login successfully', async () => {
    await LoginPage.goToLogin();
    await LoginPage.enterEmail('test@example.com');
    await LoginPage.enterPassword('password');
    await LoginPage.tapLoginButton();
    expect(await LoginPage.isLoginSuccessful()).to.be.true;
  });
});
```

## Relatórios

### Gerar relatório Allure

```bash
npm run allure:generate
npm run allure:open
```

### Servir relatório

```bash
npm run allure:serve
```

### Conteúdo do relatório

- Resumo de testes executados
- Screenshots de falhas
- Logs de execução
- Informações do dispositivo
- Timeline de execução

## CI/CD

### GitLab CI

Pipeline configurado com os seguintes estágios:

1. **Setup**: Instalação de dependências
2. **Test**: Execução dos testes (Android/iOS)
3. **Report**: Geração do relatório Allure

### Execução automática

- Push para `main` ou `develop`
- Merge requests
- Manual via interface

### Configurar emulador Android no CI

Adicionar no `.gitlab-ci.yml`:

```yaml
before_script:
  - apt-get update && apt-get install -y android-sdk
  - echo no | android create avd --force -n test -t android-30
  - emulator -avd test -no-audio -no-window &
  - adb wait-for-device
```

## Configuração por Plataforma

### Android (config/wdio.android.conf.js)

```javascript
capabilities: [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'emulator-5554',
  'appium:platformVersion': '14',
  'appium:app': './app/android/android-wdio-demo-app.apk',
}]
```

### iOS (config/wdio.ios.conf.js)

```javascript
capabilities: [{
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': 'iPhone 15',
  'appium:platformVersion': '17.2',
  'appium:app': './app/ios/ios-wdio-demo-app.app',
}]
```

## Data-Driven

Os dados de teste estão em `src/data/test-data.json`:

```json
{
  "users": {
    "valid": {
      "email": "test@example.com",
      "password": "Test1234!"
    }
  }
}
```

Uso nos testes:

```javascript
const testData = require('../../src/data/test-data.json');

it('should login', async () => {
  await LoginPage.login(
    testData.users.valid.email,
    testData.users.valid.password
  );
});
```

## Tags

Os testes são organizados por tags:

- `@smoke` - Smoke tests (críticos)
- `@regression` - Regression tests (completos)

Execução por tag:

```bash
npx wdio wdio.conf.js --grep "@smoke"
npx wdio wdio.conf.js --grep "@regression"
```

## Melhorias Futuras

1. **Parallel Execution**: Execução paralela de testes
2. **Visual Testing**: Integração com Percy/Applitools
3. **Performance Testing**: Métricas de performance mobile
4. **Device Farm**: Integração com BrowserStack/Sauce Labs
5. **Accessibility Testing**: Validação de acessibilidade
6. **Biometrics**: Testes de TouchID/FaceID
7. **Notifications**: Testes de push notifications
8. **Deep Links**: Testes de deep linking
9. **Offline Mode**: Testes de comportamento offline
10. **Localization**: Testes multi-idioma

## Troubleshooting

### Appium não inicia

```bash
appium driver list
appium driver install uiautomator2
```

### Emulador não encontrado

```bash
adb devices
adb -s emulator-5554 shell
```

### Elemento não encontrado

- Verificar seletores com `driver.getPageSource()`
- Aumentar timeout em `waitForElement`
- Verificar contexto (native/webview)

### iOS não encontra elemento

- Verificar bundleId correto
- Reiniciar simulator
- Limpar build: `xcodebuild clean`

## Referências

- [WebdriverIO Docs](https://webdriver.io/)
- [Appium Docs](https://appium.io/docs/)
- [Native Demo App](https://github.com/webdriverio/native-demo-app)
- [Allure Report](https://docs.qameta.io/allure/)

## Licença

MIT