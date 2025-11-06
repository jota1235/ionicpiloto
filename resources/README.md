# Recursos de la Aplicación

## Iconos y Splash Screens

Este directorio contiene los recursos gráficos de la aplicación:

- **icon.png**: Icono de la aplicación (1024x1024 px recomendado)
- **splash.png**: Splash screen (2732x2732 px recomendado)

## Generación automática

Para generar automáticamente todos los tamaños de iconos y splash screens:

```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
```

O usando Capacitor Assets:

```bash
npx @capacitor/assets generate --android
```

## Nota para AppFlow

AppFlow puede generar estos recursos automáticamente si se proporciona:
- icon.png (1024x1024)
- splash.png (2732x2732)
