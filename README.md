# 🔧 PlomApp - Sistema de Gestión de Servicios de Plomería

## Descripción

PlomApp es una plataforma web completa para gestionar servicios de plomería, conectando clientes con técnicos especializados. Incluye autenticación, búsqueda de técnicos, solicitud de servicios, calificación de servicios y panel de administración.

## Características

✅ **Landing Page** - Página de inicio atractiva y responsiva
✅ **Sistema de Autenticación** - Login y registro con 3 roles
✅ **Dashboard Cliente** - Solicitar servicios, buscar técnicos, calificar servicios
✅ **Dashboard Técnico** - Gestionar solicitudes, ver calificaciones y disponibilidad
✅ **Dashboard Administrador** - Gestión de usuarios, estadísticas y quejas
✅ **API REST** - Backend con Express.js y Node.js
✅ **Base de datos simulada** - Datos en memoria para demostración
✅ **Autenticación JWT** - Seguridad con tokens JWT
✅ **Responsive Design** - Compatible con móvil, tablet y desktop

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

### 1. Clonar o descargar el proyecto

```bash
cd plomaap
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

## Ejecución

### Terminal 1 - Backend (http://localhost:5000)

```bash
cd backend
npm start
```

Deberías ver:
```
✅ PlomApp Backend running on port 5000
📍 Base URL: http://localhost:5000/api
```

### Terminal 2 - Frontend (http://localhost:3000)

```bash
cd frontend
npm start
```

La aplicación se abrirá automáticamente en http://localhost:3000

## Cuentas de Demostración

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@plomaap.com | admin123 |
| Cliente | client@plomaap.com | client123 |
| Técnico | tech@plomaap.com | tech123 |

## Estructura del Proyecto

```
plomaap/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Autenticación
│   │   ├── client.js        # Rutas del cliente
│   │   ├── technician.js    # Rutas del técnico
│   │   └── admin.js         # Rutas del administrador
│   ├── middleware/
│   │   └── auth.js          # Middleware de autenticación
│   ├── server.js            # Servidor principal
│   ├── .env                 # Variables de entorno
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── PrivateRoute.js
    │   ├── pages/
    │   │   ├── LandingPage.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── ClientDashboard.js
    │   │   ├── TechnicianDashboard.js
    │   │   ├── AdminDashboard.js
    │   │   └── *.css          # Estilos
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── clientService.js
    │   │   ├── technicianService.js
    │   │   └── adminService.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Funcionalidades Principales

### Cliente
- ✅ Registrarse y crear cuenta
- ✅ Solicitar servicios de plomería
- ✅ Buscar técnicos disponibles
- ✅ Ver historial de servicios
- ✅ Calificar servicios
- ✅ Cancelar solicitudes pendientes

### Técnico
- ✅ Ver solicitudes asignadas
- ✅ Actualizar estado de trabajos
- ✅ Ver calificaciones y reseñas
- ✅ Gestionar disponibilidad
- ✅ Ver perfil y estadísticas

### Administrador
- ✅ Dashboard con estadísticas del sistema
- ✅ Gestionar usuarios (bloquear/desbloquear)
- ✅ Ver todas las solicitudes de servicio
- ✅ Gestionar quejas y reclamos
- ✅ Generar reportes
- ✅ Exportar datos

## API Endpoints

### Autenticación
```
POST   /api/auth/register         # Registrarse
POST   /api/auth/login            # Iniciar sesión
GET    /api/auth/profile          # Obtener perfil
PUT    /api/auth/profile          # Actualizar perfil
POST   /api/auth/change-password  # Cambiar contraseña
```

### Cliente
```
POST   /api/client/service-request      # Crear solicitud
GET    /api/client/my-requests          # Ver mis solicitudes
GET    /api/client/history              # Historial
GET    /api/client/search-technicians   # Buscar técnicos
GET    /api/client/technician/:id       # Detalles técnico
POST   /api/client/rate-service         # Calificar
POST   /api/client/cancel-request/:id   # Cancelar
```

### Técnico
```
GET    /api/technician/my-requests       # Ver solicitudes
GET    /api/technician/pending-requests  # Ver pendientes
GET    /api/technician/completed-requests # Ver completadas
PUT    /api/technician/request/:id/status # Actualizar estado
GET    /api/technician/profile          # Mi perfil
GET    /api/technician/ratings          # Mis calificaciones
```

### Admin
```
GET    /api/admin/users                 # Ver usuarios
GET    /api/admin/users/:role           # Filtrar por rol
POST   /api/admin/users/:id/block       # Bloquear usuario
POST   /api/admin/users/:id/unblock     # Desbloquear
GET    /api/admin/dashboard/stats       # Estadísticas
GET    /api/admin/service-requests      # Solicitudes
GET    /api/admin/complaints            # Quejas
```

## Notas Importantes

- Los datos se almacenan en memoria, se pierden al reiniciar el servidor
- Para producción, se debe conectar a una base de datos real
- Los tokens JWT expiran en 24 horas
- La contraseña se encripta con bcryptjs (saltos: 10)
- CORS está habilitado para localhost:3000

## Requisitos de Seguridad Implementados

✅ Contraseñas encriptadas
✅ Autenticación con JWT
✅ CORS configurado
✅ Validación de datos
✅ Middleware de autenticación
✅ Protección de rutas
✅ Cierre de sesión automático

## Desarrollo Futuro

- [ ] Integración con base de datos (MongoDB/PostgreSQL)
- [ ] Soporte para múltiples idiomas
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Chat integrado
- [ ] Pasarela de pagos
- [ ] Mapas interactivos
- [ ] Aplicación móvil nativa
- [ ] Sistema de calificación avanzado
- [ ] Análisis y reportes avanzados

## Troubleshooting

### Backend no conecta
- Verificar que el puerto 5000 esté disponible
- Revisar la consola para errores
- Reiniciar el servidor

### Frontend no se conecta con el backend
- Verificar que el backend esté corriendo en puerto 5000
- Revisar la URL base en `services/api.js`
- Limpiar caché del navegador

### Problemas de token
- Limpiar localStorage en DevTools
- Cerrar sesión y volver a iniciar

## Soporte y Contacto

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

## Licencia

Todos los derechos reservados © 2024 PlomApp
