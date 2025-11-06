# 📱 Guía de Compilación para AppFlow

Esta guía te ayudará a compilar tu aplicación Ionic Piloto en AppFlow y generar el APK.

## 🎯 Configuración de AppFlow

### 1. Conectar Repositorio de GitHub

1. Ve a [Ionic AppFlow](https://ionic.io/appflow)
2. Crea una nueva aplicación o selecciona tu app existente
3. Conecta tu repositorio de GitHub
4. Selecciona la rama `master` (o la rama principal que uses)

### 2. Configuración de Build

En AppFlow, configura tu build con estos parámetros:

#### Build Configuration

```yaml
Platform: Android
Build Type: Release
Target: APK
```

#### Environment Variables (Opcional)

Si necesitas variables de entorno, añádelas aquí:

```
NODE_VERSION=18
```

### 3. Configuración de Android

AppFlow usará la configuración de tu archivo `capacitor.config.ts`:

- **App ID**: `com.jafet.ionicpiloto`
- **App Name**: Ionic Piloto
- **Version**: La definida en `android/app/build.gradle`

## 🚀 Proceso de Build en AppFlow

### Paso 1: Hacer Push de tus Cambios

```bash
# Asegúrate de que todos los cambios estén commiteados
git status

# Si hay cambios pendientes
git add .
git commit -m "Configuración lista para AppFlow"

# Push a GitHub
git push origin master
```

### Paso 2: Crear Build en AppFlow

1. Ve a AppFlow Dashboard
2. Click en "Start Build"
3. Selecciona:
   - **Commit**: Latest (o el commit específico)
   - **Platform**: Android
   - **Build Type**: Release
   - **Build Stack**: Latest Capacitor

4. Click en "Build"

### Paso 3: Descargar APK

Una vez completado el build:

1. Ve a "Builds" en el dashboard
2. Click en el build completado
3. Descarga el APK generado
4. Instala en tu dispositivo Android

## 🔧 Build Local (Opcional)

Si quieres probar el build localmente antes de AppFlow:

### Prerequisitos

- Node.js 18+
- npm
- Android Studio (con Android SDK)
- Java JDK 17+

### Comandos

```bash
# 1. Instalar dependencias
npm install

# 2. Build de producción
npm run build:prod

# 3. Sincronizar con Android
npm run cap:sync:android

# 4. Abrir en Android Studio (opcional)
npm run cap:open:android

# 5. Build APK release (requiere Android Studio configurado)
cd android
./gradlew assembleRelease
cd ..

# El APK estará en: android/app/build/outputs/apk/release/
```

## ⚙️ Scripts Disponibles

```bash
# Development
npm start                  # Servidor de desarrollo
npm run build:dev         # Build desarrollo

# Production
npm run build             # Build producción (default)
npm run build:prod        # Build producción (explícito)

# Capacitor
npm run cap:sync          # Sincronizar web con native
npm run cap:sync:android  # Sincronizar solo Android
npm run cap:copy          # Copiar web a native
npm run cap:open:android  # Abrir Android Studio

# Android Build
npm run android:build     # Build completo para Android
npm run android:release   # Build release APK
```

## 📋 Checklist Pre-Build

Antes de hacer push y build en AppFlow, verifica:

- [ ] Todos los archivos necesarios están commiteados
- [ ] La carpeta `android/` está en el repositorio (no ignorada)
- [ ] `package.json` tiene todas las dependencias correctas
- [ ] `capacitor.config.ts` tiene la configuración correcta
- [ ] El build local funciona: `npm run build:prod`
- [ ] No hay errores de TypeScript: `npm run lint`

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module '@capacitor/core'"

```bash
npm install
npx cap sync
```

### Error: "Android SDK not found"

AppFlow tiene el SDK preconfigurado, este error solo ocurre en build local.
Para local: Instala Android Studio y configura las variables de entorno.

### Error: "Build failed - npm install"

Verifica que:
- `package.json` no tenga dependencias con versiones incorrectas
- No haya conflictos en `package-lock.json`
- El archivo `.npmrc` esté configurado correctamente

### Warnings de Paquetes Deprecados

Los warnings de paquetes deprecados (como `inflight`, `rimraf`, `glob`) son normales y no impiden la compilación. AppFlow los mostrará pero el build continuará.

```
npm warn deprecated inflight@1.0.6
npm warn deprecated rimraf@3.0.2
npm warn deprecated glob@7.2.3
```

Estos son causados por dependencias transitivas de Angular y se resolverán en futuras versiones.

## 📊 Configuración de Android Build

### Versiones

Edita `android/app/build.gradle` para cambiar versiones:

```gradle
android {
    defaultConfig {
        applicationId "com.jafet.ionicpiloto"
        versionCode 1        // Incrementa para cada release
        versionName "1.0"    // Versión visible para usuarios
    }
}
```

### Firma de APK (Para Production)

Para generar un APK firmado:

1. Crea un keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configura en `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("my-release-key.keystore")
            storePassword "password"
            keyAlias "my-key-alias"
            keyPassword "password"
        }
    }
}
```

3. En AppFlow, sube el keystore en "Native Configs"

## 📱 Instalación del APK

### En Dispositivo Físico

1. Habilita "Orígenes desconocidos" en Android
2. Transfiere el APK al dispositivo
3. Abre el APK y sigue las instrucciones

### En Emulador

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

## 🔄 Actualización de la App

Para actualizar la app después de cambios:

1. Incrementa `versionCode` en `build.gradle`
2. Actualiza `versionName` si es necesario
3. Commit y push los cambios
4. Crea un nuevo build en AppFlow

## 📚 Recursos Adicionales

- [Documentación de AppFlow](https://ionic.io/docs/appflow)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Ionic CLI Documentation](https://ionicframework.com/docs/cli)
- [Android Build Process](https://developer.android.com/studio/build)

---

## ✅ Tu App Está Lista

Tu aplicación Ionic Piloto está configurada y lista para:

1. ✅ Build en AppFlow
2. ✅ Generación de APK
3. ✅ Instalación en dispositivos Android
4. ✅ Publicación en Google Play (con firma adecuada)

**Credenciales de prueba:**
- Email: `admin@test.com`
- Password: `admin123`

---

**Última actualización:** Noviembre 2025
**Versión de la app:** 1.0.0
