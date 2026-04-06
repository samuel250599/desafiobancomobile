# iOS App Directory

Coloque o app iOS (.app) neste diretório.

## Download

Baixe o app para simulator do repositório oficial:

```
https://github.com/webdriverio/native-demo-app/releases
```

## Setup

1. Baixe o arquivo `ios-wdio-demo-app-*.zip`
2. Descompacte
3. Renomeie a pasta para `ios-wdio-demo-app.app`
4. Coloque neste diretório

## Estrutura esperada

```
app/ios/ios-wdio-demo-app.app/
├── ios-wdio-demo-app
├── Info.plist
├── Frameworks/
└── ...
```

## Notas

- iOS requer macOS com Xcode instalado
- Testes iOS só funcionam em simulators (não em devices físicos sem assinatura)
- O bundleId esperado é: `org.wdio.native.demo.app`