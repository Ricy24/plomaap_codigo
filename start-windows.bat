@echo off
echo.
echo ====================================
echo  🔧 PlomApp - Iniciando Proyecto
echo ====================================
echo.

echo [1/2] Iniciando Backend en http://localhost:5000...
start cmd /k "cd backend && npm start"

echo.
echo Esperando 3 segundos...
timeout /t 3

echo.
echo [2/2] Iniciando Frontend en http://localhost:3000...
start cmd /k "cd frontend && npm start"

echo.
echo ====================================
echo  ✅ PlomApp iniciado!
echo ====================================
echo.
echo 🌐 Frontend:  http://localhost:3000
echo 📍 Backend:   http://localhost:5000
echo.
echo Cuentas de demostración:
echo   - Admin:     admin@plomaap.com / admin123
echo   - Cliente:   client@plomaap.com / client123
echo   - Técnico:   tech@plomaap.com / tech123
echo.
pause
