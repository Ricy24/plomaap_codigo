# 🚀 Guía Rápida de Inicio - PlomApp

## Inicio Rápido en 3 Pasos

### Paso 1: Abra 2 Terminales

**Terminal 1 - Backend:**
```bash
cd c:\Users\SENA\Desktop\plomaap\backend
npm start
```

Verá: `✅ PlomApp Backend running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd c:\Users\SENA\Desktop\plomaap\frontend
npm start
```

Verá: La app abrirá automáticamente en http://localhost:3000

---

## Acceso Rápido con Cuentas Demo

### 👨‍💼 Admin - Panel de Control
- **Email:** admin@plomaap.com
- **Contraseña:** admin123
- **Acceso a:** Dashboard completo, gestión de usuarios, reportes
- **URL:** http://localhost:3000/login

### 😊 Cliente - Solicitar Servicios
- **Email:** client@plomaap.com
- **Contraseña:** client123
- **Acceso a:** Solicitar servicios, buscar técnicos, calificar
- **URL:** http://localhost:3000/login

### 🔧 Técnico - Gestionar Trabajos
- **Email:** tech@plomaap.com
- **Contraseña:** tech123
- **Acceso a:** Ver solicitudes, actualizar estado, calificaciones
- **URL:** http://localhost:3000/login

---

## ¿Qué Puedo Hacer?

### Como Cliente
✅ Ver landing page con información
✅ Registrarse como cliente
✅ Crear solicitud de servicio
✅ Buscar técnicos disponibles
✅ Ver historial de servicios
✅ Calificar servicios completados

### Como Técnico
✅ Ver solicitudes asignadas
✅ Cambiar estado del trabajo (pendiente → en progreso → completado)
✅ Ver calificaciones de clientes
✅ Gestionar disponibilidad
✅ Ver perfil y estadísticas

### Como Admin
✅ Ver estadísticas del sistema (usuarios, solicitudes, ingresos)
✅ Gestionar usuarios (bloquear/desbloquear)
✅ Ver todas las solicitudes
✅ Resolver quejas
✅ Exportar datos

---

## API Endpoints para Probar

### Con Postman o cURL

**1. Login y obtener token:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@plomaap.com","password":"client123"}'
```

**2. Crear solicitud de servicio:**
```bash
curl -X POST http://localhost:5000/api/client/service-request \
  -H "Authorization: Bearer [tu-token-aqui]" \
  -H "Content-Type: application/json" \
  -d '{
    "description":"Reparar grifo en cocina",
    "location":"Calle 123 #456",
    "availableTime":"Flexible"
  }'
```

**3. Buscar técnicos:**
```bash
curl -X GET "http://localhost:5000/api/client/search-technicians?specialty=Plomería" \
  -H "Authorization: Bearer [tu-token-aqui]"
```

**4. Dashboard admin:**
```bash
curl -X GET http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer [tu-token-admin]"
```

---

## Estructura de Carpetas

```
plomaap/
├── backend/              ← Servidor Node.js
│   ├── routes/          ← Endpoints de la API
│   ├── middleware/      ← Validación y auth
│   ├── server.js        ← Archivo principal
│   └── .env             ← Configuración
│
├── frontend/            ← App React
│   ├── src/
│   │   ├── pages/       ← Pantallas principales
│   │   ├── components/  ← Componentes reutilizables
│   │   ├── services/    ← Llamadas a API
│   │   └── App.js       ← App principal
│   └── public/
│
├── README.md            ← Documentación completa
├── SPECIFICATIONS.md    ← Specs del proyecto
└── start-windows.bat    ← Script automático (Windows)
```

---

## Pantallas Disponibles

### Public (sin login)
- `/` - Landing page con info
- `/login` - Iniciar sesión
- `/register` - Crear cuenta

### Cliente (después de login)
- `/client/dashboard` - Panel con solicitudes, buscar técnicos, historial

### Técnico (después de login)
- `/technician/dashboard` - Ver trabajos asignados, completados, perfil

### Admin (después de login)
- `/admin/dashboard` - Estadísticas, usuarios, solicitudes, quejas

---

## Características Principales

### ✨ Landing Page
- Información atractiva sobre el servicio
- Botones para login/registro
- Descripción de características
- Cómo funciona
- Llamadas a acción

### 🔐 Autenticación
- Registro con 3 roles diferentes
- Login seguro con JWT
- Actualizar perfil
- Cambiar contraseña

### 📱 Cliente Dashboard
- **Panel de Solicitudes** - Ver estado de tus solicitudes
- **Buscar Técnicos** - Filtrar por especialidad, ver calificaciones
- **Historial** - Ver servicios pasados con calificaciones

### 👷 Técnico Dashboard
- **Solicitudes Pendientes** - Ver trabajos asignados
- **Trabajos Completados** - Historial de lo que hizo
- **Mi Perfil** - Especialidad, calificación, experiencia
- **Calificaciones** - Promedio de estrellas y comentarios

### 📊 Admin Dashboard
- **Estadísticas** - Total de usuarios, técnicos, solicitudes, ingresos
- **Gestión de Usuarios** - Bloquear/desbloquear
- **Solicitudes** - Ver todas las solicitudes del sistema
- **Quejas** - Resolver reclamos de clientes

---

## Datos Simulados

El sistema viene con 3 usuarios y algunos datos de ejemplo:

### Usuarios Iniciales
- 1 Admin
- 1 Cliente (con solicitudes de ejemplo)
- 2 Técnicos

### Datos de Ejemplo
- Solicitudes de servicio ya completadas
- Técnicos con calificaciones
- Historial de servicios

---

## Troubleshooting

### ❌ "Cannot find module" en backend
```bash
cd backend
npm install
```

### ❌ "Cannot GET /" en frontend
- Espera a que npm compila React (puede tardar 1-2 min)
- Recarga la página (F5)

### ❌ "Connection refused" al conectar
- Asegúrate que backend esté en 5000: `npm start` en `/backend`
- Espera 3 segundos después de iniciar el backend

### ❌ Errores de CORS
- Backend debe estar corriendo primero
- Headers CORS deben estar configurados (ya están)

### ❌ Token inválido
- Borra localStorage: F12 → Application → Local Storage → Clear All
- Vuelve a hacer login

---

## Scripts Útiles

### Windows (automático)
```bash
# Ejecuta esto para iniciar todo de una vez
start-windows.bat
```

### Terminal Manual (Windows)
```bash
# Terminal 1
cd backend && npm start

# Terminal 2 (nueva)
cd frontend && npm start
```

### Terminal Manual (Mac/Linux)
```bash
# Terminal 1
cd backend && npm start

# Terminal 2 (nueva)
cd frontend && npm start
```

---

## ¿Qué Probar Primero?

1. **👀 Landing Page**
   - Abre http://localhost:3000
   - Explora, ve la información

2. **📝 Registrarse**
   - Haz clic en "Regístrate"
   - Crea una cuenta como Cliente
   - Verás tu propio dashboard

3. **🔐 Login Demo**
   - Abre http://localhost:3000/login
   - Usa: `client@plomaap.com` / `client123`
   - Prueba las 3 cuentas (client, tech, admin)

4. **📋 Cliente - Solicitar Servicio**
   - En dashboard cliente
   - Haz clic en "+ Nueva Solicitud"
   - Describe un problema, coloca ubicación
   - ¡Crea tu solicitud!

5. **👷 Técnico - Ver Traba **
   - Login con: `tech@plomaap.com` / `tech123`
   - Ve tus solicitudes pendientes
   - Actualiza estado a "Comenzar" o "Completar"

6. **📊 Admin - Dashboard**
   - Login con: `admin@plomaap.com` / `admin123`
   - Ve estadísticas del sistema
   - Gestiona usuarios
   - Resuelve quejas

---

## URL Útiles

| Función | URL |
|---------|-----|
| Inicio | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Registro | http://localhost:3000/register |
| API Health | http://localhost:5000/api/health |
| API Docs | Revisar routes/ en backend |

---

## Información Importante

📌 **Los datos se pierden si reinicia el servidor** (usa memoria, no database)
📌 **JWT válido por 24 horas**
📌 **CORS habilitado solo para desarrollo**
📌 **Datos iniciales se basan en memoria**

---

## ¿Necesitas Ayuda?

1. Revisa `README.md` para documentación completa
2. Mira `SPECIFICATIONS.md` para detalles técnicos
3. Verifica que ambos servidores estén corriendo
4. Abre DevTools (F12) para ver errores
5. Revisa la consola del backend en la terminal

---

**¡Listo! 🚀 Ahora puedes explorar PlomApp**

Diviértete probando el sistema. Si encuentras algo que no funciona, revisa logs en las terminales.
