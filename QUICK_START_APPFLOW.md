# 🚀 Quick Start - AppFlow Deployment

## Pasos Rápidos para Compilar en AppFlow

### 1️⃣ Commit y Push a GitHub

```bash
# Verificar cambios
git status

# Agregar todos los archivos
git add .

# Commit
git commit -m "App lista para AppFlow - Configuración completa"

# Push a GitHub
git push origin master
```

### 2️⃣ Configurar AppFlow

1. Ve a [https://ionic.io/appflow](https://ionic.io/appflow)
2. Login con tu cuenta Ionic
3. Click en "New App"
4. Conecta tu repositorio de GitHub
5. Selecciona el repositorio `ionicpiloto`

### 3️⃣ Crear Build

1. En AppFlow, ve a "Builds"
2. Click en "New Build"
3. Configura:
   - **Commit**: Latest
   - **Target Platform**: Android
   - **Build Type**: Release
   - **Live Update Channel**: None (opcional)
4. Click en "Build"

### 4️⃣ Esperar Compilación

El proceso toma entre 5-15 minutos:
- Installing dependencies...
- Building web assets...
- Syncing Capacitor...
- Building Android APK...

### 5️⃣ Descargar APK

1. Cuando el build termine (✓ Success)
2. Click en "Download" o "Artifacts"
3. Descarga el archivo `.apk`
4. Instala en tu dispositivo Android

---

## 📋 Configuración Actual de tu App

| Configuración | Valor |
|--------------|-------|
| App ID | `com.jafet.ionicpiloto` |
| App Name | Ionic Piloto |
| Platform | Android |
| Version Code | 1 |
| Version Name | 1.0 |
| Node Version | 18+ (recomendado) |
| Angular | 20.3.9 |
| Ionic | 8.7.8 |
| Capacitor | 7.4.4 |

---

## ⚠️ Warnings Esperados

Durante el build en AppFlow verás estos warnings (son normales):

```
npm warn deprecated inflight@1.0.6
npm warn deprecated rimraf@3.0.2
npm warn deprecated glob@7.2.3
```

**Estos NO impiden la compilación.** Son dependencias antiguas de Angular que se actualizarán en futuras versiones.

---

## ✅ Archivos Clave Actualizados

- ✓ `.gitignore` - Configurado para incluir carpeta `android/`
- ✓ `capacitor.config.ts` - Optimizado para AppFlow
- ✓ `package.json` - Scripts de build añadidos
- ✓ `angular.json` - Budgets ajustados
- ✓ `.npmrc` - Configuración de npm
- ✓ `BUILD.md` - Documentación completa

---

## 🐛 Solución Rápida de Problemas

### Build falla en "npm install"
```bash
# Local: Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Build falla en "ng build"
```bash
# Verificar que el build local funcione
npm run build:prod
```

### APK no instala en dispositivo
- Habilita "Orígenes desconocidos" en Android
- Settings > Security > Unknown sources

---

## 📱 Instalar APK en Android

### Método 1: Transferencia directa
1. Descarga el APK en tu PC
2. Conecta tu dispositivo Android por USB
3. Copia el APK al dispositivo
4. Abre el APK desde el dispositivo
5. Permitir instalación

### Método 2: ADB
```bash
adb install app-release.apk
```

### Método 3: Compartir por email/drive
1. Sube el APK a Google Drive o envía por email
2. Descarga en el dispositivo Android
3. Instala desde Downloads

---

## 🔑 Credenciales de Prueba

Una vez instalada la app, usa:

- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Rol:** Administrador (acceso completo)

Para crear usuarios adicionales, usa el botón "Create Account" o desde el dashboard de admin.

---

## 📊 Siguientes Pasos

Después de tu primer build exitoso:

1. **Incrementar versión** para futuras builds:
   - Editar `android/app/build.gradle`
   - Cambiar `versionCode` de 1 a 2, 3, etc.
   - Cambiar `versionName` de "1.0" a "1.1", etc.

2. **Configurar Signing Key** (para Google Play):
   - Ver `BUILD.md` sección "Firma de APK"

3. **Configurar Environments** (opcional):
   - En AppFlow: Settings > Environments
   - Agregar variables como `API_URL`, etc.

4. **Live Updates** (opcional):
   - Configurar canales de actualización OTA
   - No requiere recompilar APK para cambios menores

---

## 📚 Documentación Completa

Para información detallada, ver:
- `BUILD.md` - Guía completa de compilación
- `DOCUMENTACION.md` - Documentación de la app
- [AppFlow Docs](https://ionic.io/docs/appflow)

---

**¡Tu app está lista! 🎉**

Solo necesitas hacer `git push` y crear el build en AppFlow.
