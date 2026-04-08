# 📖 ÍNDICE DE DOCUMENTACIÓN - PlomApp

## 🎯 Por Dónde Empezar

### 👉 PRIMERO LEE ESTO:
1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ← EmpiEza aquí
   - Resumen ejecutivo del proyecto
   - Lo que se ha creado
   - Cuentas de demostración
   - Cómo empezar

### 🚀 LUEGO:
2. **[QUICK_START.md](QUICK_START.md)**
   - Guía rápida de 3 pasos
   - Cómo iniciar la aplicación**
   - Características principales
   - Troubleshooting básico

### 📚 DESPUÉS:
3. **[README.md](README.md)**
   - Documentación completa
   - Instalación detallada
   - Estructura del proyecto
   - API endpoints
   - Notas importantes

### 🏗️ SI QUIERES ENTENDER LA ARQUITECTURA:
4. **[ARCHITECTURE.md](ARCHITECTURE.md)**
   - Estructura del código
   - Explicación de cada carpeta
   - Cómo funcionan los servicios
   - Flujo de datos

### 📋 SI NECESITAS REFERENCIA TÉCNICA:
5. **[SPECIFICATIONS.md](SPECIFICATIONS.md)**
   - Requisitos funcionales implementados
   - Requisitos no funcionales
   - Tecnologías utilizadas
   - Base de datos
   - Ejemplos de API

---

## 🗂️ ARCHIVOS IMPORTANTES

### Configuración
```
.env                      → Variables de entorno (backend)
start-windows.bat        → Script para iniciar en Windows
start.sh                 → Script para iniciar en Mac/Linux
```

### Documentación
```
README.md                → Documentación principal ⭐⭐⭐
QUICK_START.md          → Inicio rápido ⭐⭐
PROJECT_SUMMARY.md      → Resumen ejecutivo ⭐
ARCHITECTURE.md         → Explicación del código ⭐
SPECIFICATIONS.md       → Especificaciones técnicas
```

### Backend (Node.js)
```
backend/server.js               → Servidor principal
backend/routes/auth.js          → Rutas de autenticación
backend/routes/client.js        → Rutas del cliente
backend/routes/technician.js    → Rutas del técnico
backend/routes/admin.js         → Rutas del admin
backend/middleware/auth.js      → Validación y seguridad
```

### Frontend (React)
```
frontend/src/App.js                    → App principal con rutas
frontend/src/pages/LandingPage.js      → Página de inicio
frontend/src/pages/Login.js            → Login
frontend/src/pages/Register.js         → Registro
frontend/src/pages/ClientDashboard.js  → Dashboard cliente
frontend/src/pages/TechnicianDashboard.js → Dashboard técnico
frontend/src/pages/AdminDashboard.js   → Dashboard admin
frontend/src/services/api.js           → Config HTTP
frontend/src/services/*Service.js      → Llamadas a API
```

---

## 📊 ELECCIÓN RÁPIDA SEGÚN TU NECESIDAD

### ❓ "Quiero empezar la app ahora mismo"
→ Lee: **QUICK_START.md**
→ Tiempo: 5 minutos

### ❓ "¿Qué es PlomApp exactamente?"
→ Lee: **PROJECT_SUMMARY.md**
→ Tiempo: 10 minutos

### ❓ "¿Cómo instalo y configuro todo?"
→ Lee: **README.md**
→ Tiempo: 20 minutos

### ❓ "¿Cómo está estructurado el código?"
→ Lee: **ARCHITECTURE.md**
→ Tiempo: 30 minutos

### ❓ "¿Cuáles son los requisitos implement**ados?"
→ Lee: **SPECIFICATIONS.md**
→ Tiempo: 45 minutos

### ❓ "Necesito los endpoints de la API"
→ Busca en: **README.md** (sección "API Endpoints")
→ O revisa: **SPECIFICATIONS.md**

### ❓ "Quiero entender el flujo de autenticación"
→ Lee: **ARCHITECTURE.md** (sección "Flujo de Autenticación")

### ❓ "¿Hay problemas al ejecutar?"
→ Lee: **QUICK_START.md** (sección "Troubleshooting")
→ O **README.md** (sección "Troubleshooting")

---

## 🎓 RUTA DE APRENDIZAJE COMPLETA

Si es tu primer proyecto full-stack, sigue este orden:

### Día 1: Entendimiento General
1. **PROJECT_SUMMARY.md** (20 min)
   - Entiende qué es PlomApp
   - Ve las funcionalidades

2. **QUICK_START.md** (15 min)
   - Inicia la aplicación
   - Prueba las 3 cuentas demo

3. **Explora la app** (30 min)
   - Navega por todos los dashboards
   - Prueba crear solicitudes
   - Actualiza estados

### Día 2: Cómo Funciona
1. **README.md** (30 min)
   - Lee la estructura del proyecto
   - Entiende las dependencias
   - Revisa los endpoints

2. **ARCHITECTURE.md - Primeras secciones** (30 min)
   - Backend - Estructura de rutas
   - Frontend - Componentes principales

3. **Revisa el código** (60 min)
   - Abre un archivo de backend: `routes/auth.js`
   - Abre un archivo de frontend: `pages/Login.js`
   - Entiende cómo se conectan

### Día 3: Profundo
1. **SPECIFICATIONS.md** (45 min)
   - Requisitos funcionales
   - Requisitos no funcionales
   - Tecnologías usadas

2. **ARCHITECTURE.md - Completo** (60 min)
   - Flujo de datos
   - Almacenamiento
   - Seguridad

3. **Experimenta** (60 min)
   - Intenta agregar un botón
   - Intenta crear un nuevo servicio
   - Juega con el código

---

## 💡 TIPS ÚTILES

### Para Desarrolladores
- `F12` en el navegador = Developer Tools
  - Console para ver errores
  - Network para ver requests
  - Application para ver localStorage

- Terminal del backend = Logs del servidor
  - Ve qué rutas se llaman
  - Ve errores en la API

- Chrome DevTools → Application → Local Storage
  - Ve qué datos se almacenan
  - Bórralos para "logout forzado"

### Para Encontrar Cosas
- Busca en GitHub: `Ctrl+Shift+F` (VS Code)
- Busca una palabra clave en todos los archivos
- Ej: busca "clientService" para ver todos sus usos

### Para Modificar
- Cambia colores en `Dashboard.css`
- Agrega campos  en `Register.js`
- Crea nuevos endpoints en `backend/routes/`

---

## 🔍 BÚSQUEDA RÁPIDA POR TEMA

### Autenticación
- Archivo: `backend/routes/auth.js`
- Página: LOGIN.jsh
- Servicio: `frontend/src/services/authService.js`
- Middleware: `backend/middleware/auth.js`

### Dashboard Cliente
- Archivo: `frontend/src/pages/ClientDashboard.js`
- Estilos: `frontend/src/pages/Dashboard.css`
- Backend: `backend/routes/client.js`
- Servicio: `frontend/src/services/clientService.js`

### Dashboard Técnico
- Archivo: `frontend/src/pages/TechnicianDashboard.js`
- Backend: `backend/routes/technician.js`
- Servicio: `frontend/src/services/technicianService.js`

### Dashboard Admin
- Archivo: `frontend/src/pages/AdminDashboard.js`
- Backend: `backend/routes/admin.js`
- Servicio: `frontend/src/services/adminService.js`

### Landing Page
- Archivo: `frontend/src/pages/LandingPage.js`
- Estilos: `frontend/src/pages/LandingPage.css`

### Rutas y Navegación
- Archivo: `frontend/src/App.js`
- Rutas protegidas: `frontend/src/components/PrivateRoute.js`

### Seguridad
- JWT: `backend/middleware/auth.js`
- Contraseñas: `backend/routes/auth.js` (bcryptjs)
- CORS: `backend/server.js`

---

## 🎬 EJEMPLO DE WORKFLOW

**Supongamos que quieres entender cómo alguien crea una solicitud:**

1. Abre `QUICK_START.md` (entiende qué es una solicitud)
2. Lee `ClientDashboard.js` (línea 71 - formulario)
3. Ve la función `handleCreateRequest` (línea 79)
4. Busca en `clientService.js` - `createServiceRequest()`
5. Ve cómo llama al backend con `api.post()`
6. Abre `backend/routes/client.js` (línea 78)
7. Lee el endpoint `POST /api/client/service-request`
8. Entiende la lógica:
   - Valida datos
   - Crea object request
   - Lo guarda en array
   - Retorna respuesta

**Así aprendes el flujo completo frontend → backend → guardado**

---

## 📱 PARA PROBAR LA APP

### Cuentas Listas para Usar
```
Admin:       admin@plomaap.com / admin123
Cliente:     client@plomaap.com / client123
Técnico:     tech@plomaap.com / tech123
```

### URLs Rápidas
```
Inicio:           http://localhost:3000
Login:            http://localhost:3000/login
Register:         http://localhost:3000/register
Admin Panel:      http://localhost:3000/admin/dashboard (después de login)
Backend Health:   http://localhost:5000/api/health
```

---

## ✅ CHECKLIST INICIAL

- [ ] Leí `PROJECT_SUMMARY.md`
- [ ] Leí `QUICK_START.md`
- [ ] Ejecuté `npm start` en backend (puerta 5000)
- [ ] Ejecuté `npm start` en frontend (puerto 3000)
- [ ] Hice login con una cuenta demo
- [ ] Exploré todos los dashboards
- [ ] Leí `README.md`
- [ ] Entendí la estructura en `ARCHITECTURE.md`

---

## 🚀 PRÓXIMO PASO

**¿Ya hiciste el checklist anterior?**

Sí → Felicitaciones! 🎉 Ya puedes:
- Modificar el código
- Agregar funcionalidades
- Personalizar estilos
- Deployar a producción

No → Empieza ahora:
1. Lee `QUICK_START.md`
2. Ejecuta los comandos
3. ¡Abre la app en tu navegador!

---

## 📞 REFERENCIAS RÁPIDAS

| Necesito... | Dónde encontrarlo |
|------------|-----------------|
| Iniciar la app | QUICK_START.md |
| Entender el proyecto | PROJECT_SUMMARY.md |
| Instalar todo | README.md |
| Ver la arquitectura | ARCHITECTURE.md |
| Leer especificaciones | SPECIFICATIONS.md |
| Endpoints de API | README.md o SPECIFICATIONS.md |
| Solucionar problemas | QUICK_START.md o README.md |
| Estructura de carpetas | ARCHITECTURE.md |
| Cómo escribir código nuevo | ARCHITECTURE.md |

---

## 🎯 TU OBJETIVO FINAL

Después de leer toda esta documentación, podrías:
- ✅ Entender cómo funciona PlomApp
- ✅ Modificar funcionalidades existentes
- ✅ Agregar nuevas características
- ✅ Deployar a la nube
- ✅ Explicar el código a otros
- ✅ Lidar con problemas

---

**¡Bienvenido a PlomApp! 🔧**

*Última actualización: 8 de abril de 2026*
