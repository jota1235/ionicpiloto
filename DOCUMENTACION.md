# 📱 Ionic Piloto - Aplicación de Autenticación con Roles

## 📋 Descripción del Proyecto

**Ionic Piloto** es una aplicación web/móvil desarrollada con **Ionic Framework** y **Angular**, que implementa un sistema completo de autenticación, gestión de usuarios, control de roles y dashboards diferenciados según el tipo de usuario.

La aplicación cuenta con una interfaz moderna y responsive utilizando exclusivamente componentes de Ionic, con animaciones fluidas y una experiencia de usuario optimizada.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

### Framework Principal
- **Ionic Framework 8.0.0** - Framework para desarrollo de aplicaciones híbridas
- **Angular 20.0.0** - Framework de desarrollo web con arquitectura standalone
- **Capacitor 7.4.4** - Runtime nativo para aplicaciones móviles

### Lenguajes
- **TypeScript 5.8.0** - Superset de JavaScript con tipado estático
- **HTML5** - Estructura de las vistas
- **SCSS** - Preprocesador CSS para estilos avanzados

### Bibliotecas y Dependencias
- **RxJS 7.8.0** - Programación reactiva con observables
- **Ionicons 7.0.0** - Biblioteca de iconos de Ionic
- **@capacitor/preferences** - Almacenamiento de preferencias del usuario
- **Zone.js 0.15.0** - Contextos de ejecución para Angular

### Herramientas de Desarrollo
- **Angular CLI 20.0.0** - Herramienta de línea de comandos para Angular
- **ESLint 9.16.0** - Linter para calidad de código
- **Jasmine 5.1.0** - Framework de testing
- **Karma 6.4.0** - Test runner para pruebas unitarias

### Almacenamiento
- **localStorage** - Almacenamiento local del navegador para datos (Web)
- **SQLite** - Base de datos local (preparado para móvil)

---

## 📁 Estructura del Proyecto

```
ionicpiloto/
├── src/
│   ├── app/
│   │   ├── core/                          # Núcleo de la aplicación
│   │   │   ├── guards/                    # Protección de rutas
│   │   │   │   ├── auth.guard.ts          # Guard de autenticación
│   │   │   │   ├── role.guard.ts          # Guard de roles
│   │   │   │   └── index.ts               # Barrel export
│   │   │   ├── models/                    # Interfaces y tipos
│   │   │   │   ├── user.model.ts          # Modelo de usuario
│   │   │   │   ├── auth.model.ts          # Modelos de autenticación
│   │   │   │   └── index.ts               # Barrel export
│   │   │   └── services/                  # Servicios de negocio
│   │   │       ├── database.service.ts    # Servicio de base de datos
│   │   │       ├── auth.service.ts        # Servicio de autenticación
│   │   │       └── index.ts               # Barrel export
│   │   ├── pages/                         # Páginas de la aplicación
│   │   │   ├── login/                     # Página de inicio de sesión
│   │   │   │   ├── login.page.ts          # Lógica del componente
│   │   │   │   ├── login.page.html        # Template HTML
│   │   │   │   ├── login.page.scss        # Estilos SCSS
│   │   │   │   └── login.page.spec.ts     # Tests unitarios
│   │   │   ├── register/                  # Página de registro
│   │   │   │   ├── register.page.ts
│   │   │   │   ├── register.page.html
│   │   │   │   ├── register.page.scss
│   │   │   │   └── register.page.spec.ts
│   │   │   ├── dashboard-user/            # Dashboard de usuario
│   │   │   │   ├── dashboard-user.page.ts
│   │   │   │   ├── dashboard-user.page.html
│   │   │   │   ├── dashboard-user.page.scss
│   │   │   │   └── dashboard-user.page.spec.ts
│   │   │   └── dashboard-admin/           # Dashboard de administrador
│   │   │       ├── dashboard-admin.page.ts
│   │   │       ├── dashboard-admin.page.html
│   │   │       ├── dashboard-admin.page.scss
│   │   │       └── dashboard-admin.page.spec.ts
│   │   ├── app.component.ts               # Componente raíz
│   │   ├── app.component.html             # Template del componente raíz
│   │   ├── app.component.scss             # Estilos del componente raíz
│   │   └── app.routes.ts                  # Configuración de rutas
│   ├── assets/                            # Recursos estáticos
│   │   ├── icon/                          # Iconos
│   │   └── shapes.svg                     # Formas decorativas
│   ├── environments/                      # Configuraciones de entorno
│   │   ├── environment.ts                 # Desarrollo
│   │   └── environment.prod.ts            # Producción
│   ├── theme/                             # Temas de Ionic
│   │   └── variables.scss                 # Variables de tema
│   ├── global.scss                        # Estilos globales
│   ├── index.html                         # HTML principal
│   ├── main.ts                            # Punto de entrada de la app
│   ├── polyfills.ts                       # Polyfills del navegador
│   └── zone-flags.ts                      # Configuración de Zone.js
├── angular.json                           # Configuración de Angular CLI
├── capacitor.config.ts                    # Configuración de Capacitor
├── ionic.config.json                      # Configuración de Ionic
├── package.json                           # Dependencias del proyecto
├── tsconfig.json                          # Configuración de TypeScript
└── README.md                              # Documentación básica
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** (versión 18 o superior)
- **npm** (versión 9 o superior)
- **Angular CLI** (opcional, pero recomendado)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ionicpiloto
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   # o
   ionic serve
   ```

4. **Acceder a la aplicación**
   - Abrir el navegador en: `http://localhost:4200`

### Compilación para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `www/`.

---

## ✨ Características Implementadas

### 1. Sistema de Autenticación
- ✅ **Login** con validación de credenciales
- ✅ **Registro** de nuevos usuarios
- ✅ **Validación de formularios** (email, contraseña, campos requeridos)
- ✅ **Persistencia de sesión** con Capacitor Preferences
- ✅ **Logout** con confirmación
- ✅ **Redirección automática** según rol del usuario

### 2. Gestión de Roles
- ✅ **Dos roles definidos:**
  - **Admin**: Acceso completo al sistema
  - **User**: Acceso limitado a su perfil
- ✅ **Control de acceso** mediante guards
- ✅ **Dashboards diferenciados** por rol

### 3. Dashboard de Usuario (User)
- ✅ Vista de **perfil personal**
- ✅ Información del usuario (nombre, email, rol, fecha de creación)
- ✅ **Avatar con iniciales** generadas automáticamente
- ✅ **Cards de estadísticas** básicas
- ✅ **Diseño responsive** y moderno
- ✅ Opción de **logout**

### 4. Dashboard de Administrador (Admin)
- ✅ **CRUD completo de usuarios:**
  - ➕ Crear nuevos usuarios
  - 📝 Editar usuarios existentes
  - 🗑️ Eliminar usuarios
  - 👁️ Visualizar listado completo
- ✅ **Búsqueda en tiempo real** de usuarios
- ✅ **Estadísticas del sistema** (total usuarios, admins, users)
- ✅ **Pull-to-refresh** para actualizar datos
- ✅ **FAB (Floating Action Button)** para acceso rápido
- ✅ **Validación de roles** al crear/editar
- ✅ **Confirmaciones** para acciones destructivas

### 5. Base de Datos
- ✅ **localStorage** para almacenamiento en web
- ✅ **Usuario administrador por defecto**
- ✅ **Persistencia de datos** entre sesiones
- ✅ **IDs autoincrementales**
- ✅ **Validación de email único**

### 6. Interfaz de Usuario
- ✅ **Diseño moderno** con gradientes y sombras
- ✅ **Animaciones fluidas** (fadeIn, slideUp)
- ✅ **Responsive design** (móvil, tablet, desktop)
- ✅ **Loading states** durante operaciones
- ✅ **Toast notifications** para feedback
- ✅ **Modal alerts** para confirmaciones
- ✅ **Componentes Ionic exclusivamente**

---

## 🎯 Guía de Uso

### Credenciales por Defecto

Al iniciar la aplicación por primera vez, se crea automáticamente un usuario administrador:

- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Rol:** Admin

### Flujo de Usuario Estándar

1. **Iniciar Sesión**
   - Ingresar email y contraseña
   - Click en "Login"
   - Redirección automática al dashboard correspondiente

2. **Registrar Nuevo Usuario**
   - Click en "Create Account" desde login
   - Completar formulario (nombre, email, contraseña)
   - El nuevo usuario será creado con rol "user"
   - Redirección automática al dashboard de usuario

3. **Dashboard de Usuario (User)**
   - Ver información del perfil
   - Navegar por las opciones del menú
   - Cerrar sesión cuando sea necesario

4. **Dashboard de Administrador (Admin)**
   - Ver estadísticas del sistema
   - Buscar usuarios en el buscador
   - Crear nuevo usuario (FAB verde inferior derecho)
   - Editar usuario (icono de lápiz)
   - Eliminar usuario (icono de papelera)
   - Pull-to-refresh para actualizar datos

---

## 🏗️ Arquitectura

### Patrón de Arquitectura

La aplicación sigue una **arquitectura modular y basada en componentes standalone** de Angular 20:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Components, Pages, Templates)     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Business Logic Layer        │
│  (Services, Guards, Interceptors)   │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Data Layer                  │
│  (Models, LocalStorage, API)        │
└─────────────────────────────────────┘
```

### Componentes Standalone

Todos los componentes utilizan la API standalone de Angular 20, eliminando la necesidad de NgModules:

```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicComponents...],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
```

### Inyección de Dependencias

Los servicios se proporcionan a nivel raíz:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService { ... }
```

---

## 🔐 Servicios Principales

### 1. DatabaseService

**Ubicación:** `src/app/core/services/database.service.ts`

**Responsabilidades:**
- Gestión de almacenamiento de datos (localStorage en web)
- Operaciones CRUD sobre usuarios
- Inicialización de la base de datos
- Creación de usuario admin por defecto

**Métodos principales:**
```typescript
// Inicializar base de datos
initializeDatabase(): Promise<void>

// Crear usuario
createUser(user: User): Promise<number>

// Obtener usuario por email
getUserByEmail(email: string): Promise<UserProfile | null>

// Validar credenciales
validateCredentials(email: string, password: string): Promise<UserProfile | null>

// Obtener todos los usuarios
getAllUsers(): Promise<UserProfile[]>

// Actualizar usuario
updateUser(id: number, updates: Partial<User>): Promise<boolean>

// Eliminar usuario
deleteUser(id: number): Promise<boolean>

// Verificar si existe email
emailExists(email: string): Promise<boolean>
```

### 2. AuthService

**Ubicación:** `src/app/core/services/auth.service.ts`

**Responsabilidades:**
- Gestión de autenticación de usuarios
- Manejo de sesión con Capacitor Preferences
- Control de estado del usuario actual
- Login, registro y logout

**Métodos principales:**
```typescript
// Iniciar sesión
login(credentials: LoginRequest): Promise<AuthResponse>

// Registrar usuario
register(registerData: RegisterRequest): Promise<AuthResponse>

// Cerrar sesión
logout(): Promise<void>

// Obtener usuario actual
getCurrentUser(): UserProfile | null

// Verificar si está autenticado
isAuthenticated(): boolean

// Verificar si es admin
isAdmin(): boolean

// Verificar rol específico
hasRole(role: 'admin' | 'user'): boolean

// Observable del usuario actual
currentUser$: Observable<UserProfile | null>
```

---

## 🛡️ Guards de Seguridad

### 1. AuthGuard

**Ubicación:** `src/app/core/guards/auth.guard.ts`

**Propósito:** Proteger rutas que requieren autenticación

**Funcionamiento:**
- Verifica si el usuario está autenticado
- Si no lo está, redirige a `/login`
- Si lo está, permite el acceso a la ruta

**Uso:**
```typescript
{
  path: 'dashboard-user',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/dashboard-user/dashboard-user.page')
}
```

### 2. RoleGuard

**Ubicación:** `src/app/core/guards/role.guard.ts`

**Propósito:** Proteger rutas según el rol del usuario

**Funcionamiento:**
- Verifica si el usuario tiene el rol requerido
- Si no lo tiene, redirige al dashboard correspondiente
- Si lo tiene, permite el acceso

**Uso:**
```typescript
{
  path: 'dashboard-admin',
  canActivate: [authGuard, roleGuard(['admin'])],
  loadComponent: () => import('./pages/dashboard-admin/dashboard-admin.page')
}
```

---

## 🗺️ Configuración de Rutas

**Ubicación:** `src/app/app.routes.ts`

```typescript
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page')
      .then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page')
      .then((m) => m.RegisterPage),
  },
  {
    path: 'dashboard-user',
    loadComponent: () => import('./pages/dashboard-user/dashboard-user.page')
      .then((m) => m.DashboardUserPage),
    canActivate: [authGuard, roleGuard(['user', 'admin'])],
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./pages/dashboard-admin/dashboard-admin.page')
      .then((m) => m.DashboardAdminPage),
    canActivate: [authGuard, roleGuard(['admin'])],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
```

**Características:**
- ✅ Lazy loading para optimización
- ✅ Guards de protección
- ✅ Redirección por defecto a login
- ✅ Wildcard para rutas no encontradas

---

## 📦 Modelos de Datos

### UserRole
```typescript
type UserRole = 'admin' | 'user';
```

### User
```typescript
interface User {
  id?: number;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  createdAt?: string;
}
```

### UserProfile
```typescript
interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}
```

### LoginRequest
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

### RegisterRequest
```typescript
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
```

### AuthResponse
```typescript
interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
}
```

---

## 🎨 Componentes Ionic Utilizados

### Navegación y Estructura
- `IonApp` - Contenedor principal de la aplicación
- `IonHeader` - Encabezado de las páginas
- `IonToolbar` - Barra de herramientas
- `IonTitle` - Título de la página
- `IonContent` - Contenido principal
- `IonButtons` - Grupo de botones
- `IonBackButton` - Botón de retroceso

### Formularios
- `IonInput` - Campos de entrada de texto
- `IonItem` - Contenedor de elementos de formulario
- `IonLabel` - Etiquetas de campos

### Datos y Listas
- `IonList` - Lista de elementos
- `IonItem` - Elemento de lista
- `IonLabel` - Etiqueta de elemento
- `IonAvatar` - Avatar de usuario
- `IonChip` - Chip/Badge de información
- `IonBadge` - Badge numérico

### Diseño
- `IonCard` - Tarjeta de contenido
- `IonCardHeader` - Encabezado de tarjeta
- `IonCardTitle` - Título de tarjeta
- `IonCardContent` - Contenido de tarjeta
- `IonGrid` - Sistema de grid
- `IonRow` - Fila del grid
- `IonCol` - Columna del grid

### Interacción
- `IonButton` - Botón de acción
- `IonIcon` - Iconos
- `IonFab` - Floating Action Button
- `IonFabButton` - Botón FAB
- `IonSearchbar` - Barra de búsqueda
- `IonRefresher` - Control de pull-to-refresh
- `IonRefresherContent` - Contenido del refresher

### Feedback
- `LoadingController` - Indicadores de carga
- `ToastController` - Notificaciones toast
- `AlertController` - Alertas y confirmaciones
- `ModalController` - Modales

---

## 🎭 Estilos y Temas

### Variables de Tema

**Ubicación:** `src/theme/variables.scss`

El proyecto utiliza las variables CSS de Ionic para mantener consistencia:

```scss
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc2ff;
  --ion-color-tertiary: #5260ff;
  --ion-color-success: #2dd36f;
  --ion-color-warning: #ffc409;
  --ion-color-danger: #eb445a;
  --ion-color-light: #f4f5f8;
  --ion-color-medium: #92949c;
  --ion-color-dark: #222428;
}
```

### Características de Diseño

1. **Gradientes**
   ```scss
   background: linear-gradient(135deg,
     var(--ion-color-primary) 0%,
     var(--ion-color-secondary) 100%);
   ```

2. **Animaciones**
   ```scss
   @keyframes fadeInDown {
     from {
       opacity: 0;
       transform: translateY(-20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```

3. **Sombras**
   ```scss
   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
   ```

4. **Responsive**
   ```scss
   @media (max-width: 768px) {
     // Estilos para móvil
   }
   ```

---

## 🧪 Testing

### Ejecutar Tests

```bash
npm test
```

### Estructura de Tests

Cada componente tiene su archivo de test:
- `*.spec.ts` - Pruebas unitarias de componentes

---

## 📱 Despliegue en Móvil

### iOS

```bash
ionic capacitor add ios
ionic capacitor copy ios
ionic capacitor open ios
```

### Android

```bash
ionic capacitor add android
ionic capacitor copy android
ionic capacitor open android
```

---

## 🔄 Scripts Disponibles

```json
{
  "start": "ng serve",              // Servidor de desarrollo
  "build": "ng build",               // Compilar para producción
  "watch": "ng build --watch",       // Compilar en modo watch
  "test": "ng test",                 // Ejecutar tests
  "lint": "ng lint"                  // Linter de código
}
```

---

## 📊 Base de Datos

### Esquema de Datos (localStorage)

Los datos se almacenan en localStorage con la clave: `ionicpiloto_users`

**Estructura:**
```json
[
  {
    "id": 1,
    "email": "admin@test.com",
    "password": "admin123",
    "name": "Administrator",
    "role": "admin",
    "createdAt": "2025-11-04T19:00:00.000Z"
  },
  {
    "id": 2,
    "email": "user@test.com",
    "password": "user123",
    "name": "Usuario Test",
    "role": "user",
    "createdAt": "2025-11-04T19:05:00.000Z"
  }
]
```

---

## 🔒 Seguridad

### Implementaciones de Seguridad

1. **Validación de Formularios**
   - Email format validation
   - Longitud mínima de contraseña (6 caracteres)
   - Campos requeridos
   - Confirmación de contraseña

2. **Guards de Rutas**
   - Protección de rutas autenticadas
   - Control de acceso por roles
   - Redirecciones automáticas

3. **Sesión**
   - Persistencia segura con Capacitor Preferences
   - Logout automático al cerrar sesión
   - Verificación de sesión en cada navegación

### Consideraciones de Producción

⚠️ **IMPORTANTE:** Esta es una aplicación de demostración. Para producción se recomienda:

1. **Hashear contraseñas** (bcrypt, argon2)
2. **Usar JWT tokens** para autenticación
3. **Implementar HTTPS** obligatorio
4. **Backend API** real en lugar de localStorage
5. **Validaciones del lado del servidor**
6. **Rate limiting** en login
7. **2FA** (Two-Factor Authentication)

---

## 🚧 Mejoras Futuras

- [ ] Implementar SQLite real para móvil
- [ ] Backend API REST
- [ ] Recuperación de contraseña
- [ ] Edición de perfil de usuario
- [ ] Cambio de contraseña
- [ ] Avatar personalizado
- [ ] Paginación en listado de usuarios
- [ ] Filtros avanzados
- [ ] Exportación de datos
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Tests E2E
- [ ] CI/CD pipeline

---

## 📝 Notas de Desarrollo

### Comandos Útiles

```bash
# Generar nuevo componente
ionic generate component nombre

# Generar nueva página
ionic generate page nombre

# Generar servicio
ionic generate service nombre

# Ver en el navegador
ionic serve

# Ver en dispositivo
ionic capacitor run android
ionic capacitor run ios
```

### Herramientas de Desarrollo

- **Ionic DevApp** - App para testing en dispositivos reales
- **Chrome DevTools** - Depuración en el navegador
- **Angular DevTools** - Extensión de Chrome para Angular
- **Ionic CLI** - Herramienta de línea de comandos

---

## 👨‍💻 Autor

**Proyecto desarrollado con:**
- Ionic Framework
- Angular
- TypeScript
- Capacitor

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🙏 Agradecimientos

- **Ionic Team** - Por el increíble framework
- **Angular Team** - Por el robusto framework de desarrollo
- **Capacitor Team** - Por la integración nativa
- **Comunidad Open Source** - Por todas las herramientas y recursos

---

## 📞 Soporte

Para preguntas, problemas o sugerencias:
- Crear un issue en el repositorio
- Revisar la documentación oficial de Ionic
- Visitar el foro de la comunidad

---

## 🔗 Enlaces Útiles

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.dev)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Ionic Components](https://ionicframework.com/docs/components)
- [Ionicons](https://ionic.io/ionicons)

---

**Versión:** 1.0.0
**Última actualización:** Noviembre 2025
