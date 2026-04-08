# 📁 Estructura del Código - PlomApp

## Vista General del Proyecto

```
plomaap/
│
├── 📂 backend/                      # Servidor Node.js - API REST
│   ├── 📂 routes/
│   │   ├── auth.js                 # Rutas de autenticación
│   │   ├── client.js               # Rutas para clientes
│   │   ├── technician.js           # Rutas para técnicos
│   │   └── admin.js                # Rutas para administradores
│   │
│   ├── 📂 middleware/
│   │   └── auth.js                 # Validación de JWT y roles
│   │
│   ├── server.js                   # Archivo principal del servidor
│   ├── .env                        # Variables de entorno
│   ├── package.json                # Dependencias del backend
│   └── package-lock.json
│
├── 📂 frontend/                     # Aplicación React
│   ├── 📂 src/
│   │   │
│   │   ├── 📂 components/
│   │   │   └── PrivateRoute.js     # Componente para rutas protegidas
│   │   │
│   │   ├── 📂 pages/               # Páginas principales
│   │   │   ├── LandingPage.js      # Página de inicio
│   │   │   ├── LandingPage.css
│   │   │   ├── Login.js            # Página de login
│   │   │   ├── Register.js         # Página de registro
│   │   │   ├── Auth.css            # Estilos para auth
│   │   │   ├── ClientDashboard.js  # Dashboard del cliente
│   │   │   ├── TechnicianDashboard.js # Dashboard del técnico
│   │   │   ├── AdminDashboard.js   # Dashboard del admin
│   │   │   └── Dashboard.css       # Estilos compartidos
│   │   │
│   │   ├── 📂 services/            # Servicios de API
│   │   │   ├── api.js              # Configuración de axios
│   │   │   ├── authService.js      # Llamadas auth
│   │   │   ├── clientService.js    # Llamadas cliente
│   │   │   ├── technicianService.js # Llamadas técnico
│   │   │   └── adminService.js     # Llamadas admin
│   │   │
│   │   ├── App.js                  # App principal con rutas
│   │   ├── App.css                 # Estilos globales
│   │   ├── index.js                # Punto de entrada React
│   │   └── index.css               # Estilos base
│   │
│   ├── 📂 public/
│   │   ├── index.html              # HTML principal
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── package.json                # Dependencias del frontend
│   └── package-lock.json
│
├── README.md                        # Documentación principal
├── QUICK_START.md                   # Guía rápida de inicio
├── SPECIFICATIONS.md                # Especificaciones completas
├── start-windows.bat                # Script para Windows
├── start.sh                         # Script para Mac/Linux
└── ARCHITECTURE.md                  # Este archivo
```

---

## Backend - Estructura de Rutas

### 📍 `/routes/auth.js` - Autenticación

**Endpoints disponibles:**
```javascript
POST   /api/auth/register          // Crear cuenta
POST   /api/auth/login             // Iniciar sesión
GET    /api/auth/profile           // Obtener perfil (protegido)
PUT    /api/auth/profile           // Actualizar perfil (protegido)
POST   /api/auth/change-password   // Cambiar contraseña (protegido)
```

**Datos de usuario que maneja:**
- Registro seguro con validación
- Contraseñas encriptadas con bcrypt
- Generación de JWT token
- Asignación de roles (admin, client, technician)

---

### 📍 `/routes/client.js` - Operaciones del Cliente

**Endpoints disponibles:**
```javascript
POST   /api/client/service-request        // Crear solicitud
GET    /api/client/my-requests            // Ver mis solicitudes
GET    /api/client/history                // Historial completado
GET    /api/client/search-technicians     // Buscar técnicos
GET    /api/client/technician/:id         // Detalles técnico
POST   /api/client/assign-technician      // Asignar técnico
POST   /api/client/rate-service           // Calificar servicio
POST   /api/client/cancel-request/:id     // Cancelar solicitud
```

**Funcionalidades:**
- Crear solicitudes de servicio
- Buscar técnicos con filtros
- Ver historial de trabajos
- Calificar servicios completados
- Cancelar solicitudes pendientes

---

### 📍 `/routes/technician.js` - Operaciones del Técnico

**Endpoints disponibles:**
```javascript
GET    /api/technician/my-requests          // Ver mis solicitudes
GET    /api/technician/pending-requests     // Solicitudes pendientes
GET    /api/technician/completed-requests   // Trabajos completados
PUT    /api/technician/request/:id/status   // Actualizar estado
GET    /api/technician/profile              // Mi perfil
GET    /api/technician/availability         // Mi disponibilidad
PUT    /api/technician/availability         // Actualizar disponibilidad
GET    /api/technician/ratings              // Mis calificaciones
```

**Funcionalidades:**
- Ver solicitudes asignadas
- Cambiar estado del trabajo
- Gestionar disponibilidad
- Ver calificaciones de clientes
- Consultar perfil y estadísticas

---

### 📍 `/routes/admin.js` - Operaciones del Admin

**Endpoints disponibles:**
```javascript
GET    /api/admin/users                    // Todos los usuarios
GET    /api/admin/users/:role              // Usuarios por rol
POST   /api/admin/users/:id/block          // Bloquear usuario
POST   /api/admin/users/:id/unblock        // Desbloquear usuario
GET    /api/admin/service-requests         // Todas las solicitudes
GET    /api/admin/service-requests/:status // Por estado
GET    /api/admin/reports/income           // Reporte ingresos
GET    /api/admin/reports/completed-services // Reporte completados
GET    /api/admin/complaints               // Ver quejas
GET    /api/admin/complaints/:id           // Una queja
PUT    /api/admin/complaints/:id/resolve   // Resolver queja
GET    /api/admin/dashboard/stats          // Estadísticas
GET    /api/admin/export/users             // Exportar usuarios
GET    /api/admin/export/requests          // Exportar solicitudes
```

**Funcionalidades:**
- Gestión completa de usuarios
- Bloqueo/desbloqueo de cuentas
- Control de solicitudes
- Gestión de quejas y reclamos
- Generación de reportes
- Exportación de datos

---

## Middleware - Seguridad

### 📍 `/middleware/auth.js`

```javascript
verifyToken(req, res, next)    // Valida JWT token
verifyRole(roles)              // Verifica rol del usuario
```

**Cómo funciona:**
1. Cliente envía token en header `Authorization: Bearer token`
2. Middleware valida que el token sea válido
3. Decodifica el token y obtiene datos del usuario
4. Verifica que el rol sea permitido
5. Si todo es correcto, continúa con la ruta

---

## Frontend - Estructura de Componentes

### 🎨 Componentes Principales

#### **Pages (Páginas Completas)**

**LandingPage.js**
- Hero section con información
- Características destacadas
- Cómo funciona PlomApp
- Call to action (CTA)
- Footer con links

**Login.js**
- Formulario de login
- Validaciones básicas
- Cuentas de demostración
- Redirige según rol

**Register.js**
- Formulario de registro
- Selección de rol (Client/Technician)
- Campos dinámicos según rol
- Encriptación en backend

**ClientDashboard.js**
- Pestaña: Mis Solicitudes
- Pestaña: Buscar Técnicos
- Pestaña: Historial
- Modal para crear solicitud

**TechnicianDashboard.js**
- Pestaña: Pendientes
- Pestaña: Completados
- Pestaña: Mi Perfil + Calificaciones
- Actualizar estado de trabajos

**AdminDashboard.js**
- Pestaña: Dashboard (Estadísticas)
- Pestaña: Usuarios (Tabla)
- Pestaña: Solicitudes (Lista)
- Pestaña: Quejas (Resolución)

#### **Componentes Reutilizables**

**PrivateRoute.js**
- Protege rutas que requieren login
- Verifica rol del usuario
- Redirige a login si no hay token
- Impide acceso sin permisos

---

### 📱 Servicios - Llamadas a API

#### **api.js**
```javascript
// Configuración base de axios
// Interceptor para agregar token en headers
// Interceptor para manejar errores 401
```

#### **authService.js**
```javascript
register()              // Envía datos de registro
login()                 // Envía credenciales
getProfile()            // Obtiene perfil del usuario
updateProfile()         // Actualiza datos personales
changePassword()        // Cambia contraseña
```

#### **clientService.js**
```javascript
createServiceRequest()  // Crea solicitud
getMyRequests()        // Ver solicitudes
getHistory()           // Ver historial
searchTechnicians()    // Buscar técnicos
getTechnicianDetails() // Detalles de técnico
assignTechnician()     // Asignar técnico
rateService()          // Calificar
cancelRequest()        // Cancelar solicitud
```

#### **technicianService.js**
```javascript
getMyRequests()        // Ver mis trabajos
getPendingRequests()   // Ver pendientes
getCompletedRequests() // Ver completados
updateRequestStatus()  // Cambiar estado
getProfile()          // Mi perfil
getAvailability()     // Mi disponibilidad
updateAvailability()  // Cambiar disponibilidad
getRatings()          // Mis calificaciones
```

#### **adminService.js**
```javascript
getUsers()               // Ver todos
getUsersByRole()         // Filtrar por rol
blockUser()              // Bloquear
unblockUser()            // Desbloquear
getServiceRequests()     // Ver solicitudes
getIncomeReport()        // Reporte ingresos
getComplaints()          // Ver quejas
resolveComplaint()       // Resolver queja
getDashboardStats()      // Estadísticas
```

---

## Flujo de Datos

```
┌──────────────────┐
│   Usuario        │
│   (Navegador)    │
└────────┬─────────┘
         │
         │ 1. Interacción
         ↓
┌──────────────────────────────┐
│   React Component            │
│   (Page/Dashboard)           │
└────────┬─────────────────────┘
         │
         │ 2. Llama función de servicio
         ↓
┌──────────────────────────────┐
│   Service (e.g., clientService)
│   clientService.searchTechnicians()
└────────┬─────────────────────┘
         │
         │ 3. Usa api.js (axios)
         ↓
┌──────────────────────────────┐
│   axios                      │
│   GET /api/client/search...  │
│   + Token en header          │
└────────┬─────────────────────┘
         │
         │ 4. HTTP Request
         ↓
┌──────────────────────────────┐
│   Backend (Node.js)          │
│   /routes/client.js          │
└────────┬─────────────────────┘
         │
         │ 5. Middleware valida JWT
         ├─ verifyToken()
         ├─ verifyRole(['client'])
         │
         │ 6. Ejecuta lógica
         ├─ Busca técnicos en memoria
         ├─ Filtra por especialidad
         │
         │ 7. Retorna datos
         ↓
┌──────────────────────────────┐
│   HTTP Response (JSON)       │
│   [{id, name, rating, ...}]  │
└────────┬─────────────────────┘
         │
         │ 8. Recibe en componente
         ↓
┌──────────────────────────────┐
│   setState() con datos       │
│   React renderiza            │
│   Usuario ve técnicos        │
└──────────────────────────────┘
```

---

## Almacenamiento de Datos

### Frontend (localStorage)
```javascript
localStorage.setItem('token', jwtToken)
localStorage.setItem('user', JSON.stringify(userData))
// Se usa para mantener sesión entre recargas
```

### Backend (Memoria en ramLos datos se almacenan en variables JavaScript normales:
```javascript
let users = [...]
let serviceRequests = [...]
let technicians = [...]
// ⚠️ Se pierden al reiniciar el servidor
// Para producción: usar MongoDB, PostgreSQL, etc.
```

---

## Estilos - CSS

### Estructura de Estilos
```
LandingPage.css       // Página de inicio
Auth.css              // Login, Register
Dashboard.css         // Todos los dashboards
App.css               // Estilos globales
index.css             // Estilos base
```

### Sistema de Diseño

**Colores:**
- Primario: `#667eea` (Azul)
- Secundario: `#764ba2` (Púrpura)
- Éxito: `#51cf66` (Verde)
- Peligro: `#ff6b6b` (Rojo)
- Advertencia: `#ffd43b` (Amarillo)

**Gradientes:**
- Principal: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

**Responsive Breakpoints:**
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

---

## Flujo de Autenticación

```
1. Usuario en /register o /login
   │
2. Llena formulario
   │
3. Envía a Backend (/api/auth/register o /login)
   │
4. Backend:
   ├─ Valida email único (register)
   ├─ Compara contraseña (login)
   ├─ Encripta con bcrypt (register)
   ├─ Crea JWT token
   └─ Retorna {token, user}
   │
5. Frontend:
   ├─ Almacena token en localStorage
   ├─ Almacena user data en localStorage
   ├─ Redirige al dashboard
   └─ Todas las peticiones incluyen token
   │
6. Solicitudes posteriores:
   ├─ Interceptor verifica token
   ├─ Lo agrega a header: Authorization: Bearer token
   ├─ Backend verifica con middleware auth
   ├─ Si es válido: procesa solicitud
   └─ Si es inválido: retorna 401
```

---

## Scripts y Comando Útiles

### Backend
```bash
npm start              # Inicia servidor (port 5000)
npm install            # Instala dependencias
```

### Frontend
```bash
npm start              # Inicia dev server (port 3000)
npm run build          # Build para producción
npm test               # Tests
npm install            # Instala dependencias
```

### Full Stack
```bash
start-windows.bat      # Windows: inicia ambos
./start.sh             # Mac/Linux: inicia ambos
```

---

## Seguridad - Implementación

### ✅ Contraseñas
```javascript
// Encriptación con bcryptjs
password: bcrypt.hashSync(password, 10)
// Comparación
bcrypt.compareSync(password, hashedPassword)
```

### ✅ Autenticación
```javascript
// JWT Token
const token = jwt.sign(
  { id, email, role, name },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
)
```

### ✅ Autorización
```javascript
// Middleware verifica rol
export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' })
    }
    next()
  }
}
```

### ✅ CORS
```javascript
app.use(cors())  // Permite solicitudes desde frontend
```

---

## Cómo Extender el Proyecto

### Agregar Nueva Funcionalidad

1. **Backend:**
   - Crear archivo en `/routes/`
   - Agregar endpoints con validación
   - Registrar ruta en `server.js`

2. **Frontend:**
   - Crear componente en `/pages/`
   - Crear servicio en `/services/`
   - Agregar ruta en `App.js`
   - Proteger con `PrivateRoute`

**Ejemplo - Agregar "Chat":**
```javascript
// Backend: /routes/chat.js
router.post('/send-message', verifyToken, (req, res) => {...})

// Frontend: /pages/ChatPage.js
// Import en App.js
<Route path="/chat" element={<ChatPage />} />
```

---

## Checklist de Verificación

- ✅ Backend corriendo en port 5000
- ✅ Frontend corriendo en port 3000
- ✅ Puedes hacer login con cuentas demo
- ✅ Los 3 roles tienen sus dashboards
- ✅ Puedes crear solicitudes
- ✅ Los datos se guardan en memoria
- ✅ Las autenticaciones funcionan
- ✅ CORS configurado
- ✅ Rutas protegidas funcionan

---

## Siguiente Paso

Para empezar a usar:
1. Lee `QUICK_START.md`
2. Lee `README.md` para documentación completa
3. Ejecuta `npm start` en ambas carpetas
4. Prueba con cuentas de demostración
5. ¡Explora todas las funcionalidades!

---

**PlomApp - Desarrollado en 2024**
