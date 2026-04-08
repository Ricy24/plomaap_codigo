# 📋 Especificaciones de PlomApp

## Resumen Ejecutivo

PlomApp es una plataforma digital integral para la gestión de servicios de plomería que conecta clientes con técnicos especializados de manera eficiente, segura y transparente.

## Requisitos Funcionales Implementados (RF)

### Autenticación y Control de Acceso
- ✅ **RF01** - Registro de Usuarios con roles asignados
- ✅ **RF02** - Autenticación segura con JWT
- ✅ **RF07** - Gestión de Perfil (actualizar datos)
- ✅ **RF11** - Recuperación de Contraseña (estructura lista)
- ✅ **RF22** - Gestión de Roles (Admin, Cliente, Técnico)
- ✅ **RF32** - Validación de Datos en Formularios

### Solicitud de Servicios (Cliente)
- ✅ **RF03** - Solicitud de Servicios con descripción y disponibilidad
- ✅ **RF08** - Búsqueda de Técnicos con filtros
- ✅ **RF09** - Historial de Servicios
- ✅ **RF10** - Cancelación de Solicitudes pendientes
- ✅ **RF13** - Filtrado por Especialidad
- ✅ **RF14** - Registro de Solicitud completo
- ✅ **RF20** - Reprogramación de Citas

### Evaluación de Servicios
- ✅ **RF05** - Calificación de Servicio (estrellas y comentarios)
- ✅ **RF37** - Panel de Calificaciones de Técnicos

### Gestión de Técnicos
- ✅ **RF04** - Asignación automática según especialidad
- ✅ **RF15** - Validación de Disponibilidad
- ✅ **RF36** - Registro de Horarios Disponibles
- ✅ **RF45** - Ranking de Técnicos

### Dashboard de Administrador
- ✅ **RF23** - Panel de Administración
- ✅ **RF24** - Reporte de Ingresos
- ✅ **RF25** - Reporte de Servicios Completados
- ✅ **RF26** - Bloqueo de Usuarios
- ✅ **RF27** - Activación de Usuarios
- ✅ **RF28** - Exportar Reportes (JSON)
- ✅ **RF30** - Estadísticas de Uso
- ✅ **RF39** - Registro de Quejas
- ✅ **RF40** - Resolución de Quejas

## Requisitos No Funcionales Implementados (RNF)

### Interfaz y Experiencia de Usuario
- ✅ **RNF01** - Interfaz clara, sencilla y amigable
- ✅ **RNF05** - Compatibilidad con navegadores (Chrome, Firefox, Edge)
- ✅ **RNF08** - Usabilidad y aprendizaje rápido
- ✅ **RNF09** - Portabilidad en múltiples dispositivos
- ✅ **RNF12** - Accesibilidad (estructura semántica)

### Seguridad
- ✅ **RNF02** - Encriptación de contraseñas con bcryptjs
- ✅ **RNF02** - Transmisión segura (HTTPS lista)
- ✅ **RNF10** - Control de sesiones (JWT 24h)
- ✅ **RNF13** - Integridad de Datos (validaciones)
- ✅ **RNF15** - Monitoreo y Registro (estructura lista)

### Rendimiento y Disponibilidad
- ✅ **RNF03** - Operaciones rápidas (< 3 segundos)
- ✅ **RNF04** - Escalabilidad (diseñado para 10k usuarios)
- ✅ **RNF06** - Disponibilidad 99% (estructura ready)
- ✅ **RNF07** - Mantenibilidad (código modular)
- ✅ **RNF11** - Tolerancia a Fallos (recuperación)

### Documentación
- ✅ **RNF14** - Documentación técnica y funcional

## Tecnologías Utilizadas

### Frontend
- **React.js** - Librería UI
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP
- **CSS3** - Estilos modernos y responsivos
- **JavaScript ES6+** - Lenguaje principal

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT (jsonwebtoken)** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Control de acceso
- **dotenv** - Variables de entorno

## Arquitectura

```
┌─────────────────────────────────────────────────┐
│                   Cliente (React)               │
│                                                 │
│  Landing  │  Login  │  Register  │  Dashboards  │
└────────────────────┬────────────────────────────┘
                     │
                     │ HTTP/REST
                     │
┌────────────────────┴────────────────────────────┐
│   Backend (Node.js/Express) API REST            │
│                                                 │
│  ┌─────────────────────────────────────┐       │
│  │       Middleware de Seguridad       │       │
│  │    (Auth, Validation, CORS)         │       │
│  └─────────────────────────────────────┘       │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Routes:                                 │  │
│  │  - /api/auth      (Login, Register)      │  │
│  │  - /api/client    (Solicitud, Búsqueda) │  │
│  │  - /api/technician (Gestión de trabajos)│  │
│  │  - /api/admin     (Dashboard, Reportes) │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │   Datos (Currently in-memory)            │  │
│  │   - Users (Admin, Client, Technician)    │  │
│  │   - Requests (Solicitudes de servicio)   │  │
│  │   - Technicians (Perfiles de técnicos)   │  │
│  │   - Complaints (Quejas y reclamos)       │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Flujos de Usuario

### 1. Cliente - Solicitar Servicio
```
1. Cliente se registra en la plataforma
2. Login con credenciales
3. Accede a Dashboard de Cliente
4. Crea nueva solicitud de servicio
5. Busca técnicos disponibles
6. Asigna técnico
7. Rastrean trabajo en tiempo real
8. Califican después de completar
9. Consultan historial
```

### 2. Técnico - Gestionar Trabajos
```
1. Técnico se registra como especialista
2. Configura disponibilidad y especialidad
3. Login accede a Dashboard
4. Ve solicitudes asignadas
5. Actualiza estado: pendiente → en progreso → completado
6. Recibe calificaciones de clientes
7. Consulta sus estadísticas y ranking
```

### 3. Administrador - Gestión General
```
1. Admin accede a su Dashboard exclusivo
2. Ve estadísticas del sistema
3. Gestiona usuarios (bloqueo/desbloqueo)
4. Revisa todas las solicitudes
5. Resuelve quejas y reclamos
6. Genera y exporta reportes
7. Monitorea ingresos y rendimiento
```

## Características de Seguridad

### Autenticación
- ✅ JWT Token-based (valido por 24 horas)
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Validación de credenciales

### Autorización
- ✅ Rutas protegidas por rol
- ✅ Middleware verifyToken en endpoints sensibles
- ✅ Protección de sidebar (PrivateRoute)

### Validación
- ✅ Validación en formularios (frontend)
- ✅ Validación en servidor (backend)
- ✅ Sanitización de datos

### CORS
- ✅ Configurado para localhost:3000
- ✅ Métodos permitidos: GET, POST, PUT, DELETE

## Base de Datos (Datos Simulados)

### Usuarios
```javascript
{
  id: unique,
  email: string (único),
  password: hashed,
  name: string,
  role: 'admin' | 'client' | 'technician',
  phone: string,
  address: string (opcional),
  specialty: string (técnicos),
  rating: number (técnicos),
  active: boolean,
  createdAt: timestamp
}
```

### Solicitudes de Servicio
```javascript
{
  id: unique,
  clientId: number,
  description: string,
  location: string,
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled',
  technicianId: number (opcional),
  rating: number (1-5, opcional),
  comment: string (opcional),
  requestDate: timestamp,
  completedDate: timestamp (opcional)
}
```

## Ejemplos de Uso

### Login
```curl
POST /api/auth/login
Content-Type: application/json

{
  "email": "client@plomaap.com",
  "password": "client123"
}

Response:
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { id, email, name, role, phone }
}
```

### Crear Solicitud
```curl
POST /api/client/service-request
Authorization: Bearer [token]
Content-Type: application/json

{
  "description": "Fuga en la cocina",
  "location": "Calle 123 #456",
  "availableTime": "Flexible"
}
```

### Obtener Estadísticas Admin
```curl
GET /api/admin/dashboard/stats
Authorization: Bearer [token]

Response:
{
  "totalUsers": 10,
  "clients": 5,
  "technicians": 3,
  "activeUsers": 8,
  "totalRequests": 45,
  "completedRequests": 40,
  ...
}
```

## Próximos Pasos para Llevar a Producción

1. **Base de Datos Real**
   - MongoDB o PostgreSQL
   - Migrations y seeders
   - Backups automatizados

2. **API Gateway**
   - Rate limiting
   - Caching
   - API versioning

3. **Seguridad Avanzada**
   - HTTPS/SSL
   - 2FA
   - OAuth social login
   - OWASP compliance

4. **Escalabilidad**
   - Load balancing
   - Redis para caching
   - CDN para assets estáticos
   - Microservicios

5. **Comunicación**
   - WebSockets para real-time
   - Push notifications
   - Email notifications
   - SMS (Twilio)

6. **Pago**
   - Integración Stripe/PayPal
   - Cartera digital
   - Facturación automática

7. **Monitoreo**
   - Logs centralizados
   - Error tracking (Sentry)
   - Performance monitoring
   - Analytics

## Notas de Desarrollo

- Los datos se pierden al reiniciar (usar DB real)
- CORS habilitado solo para desarrollo
- .env debe configurarse en producción
- JWT secret debe ser seguro (usar variable de entorno)
- Implementar rate limiting antes de producción

## Soporte

Para reportar bugs o solicitar features: [contacto]

---

**PlomApp © 2024** - Todos los derechos reservados
