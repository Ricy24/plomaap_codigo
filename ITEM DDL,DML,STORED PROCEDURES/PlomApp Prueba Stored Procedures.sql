CALL registrar_usuario('nuevo@gmail.com','Clave123*','cliente');

SELECT correo, contrasena
FROM usuarios;

SELECT * FROM usuarios
WHERE correo = 'admin@plomapp.com'
AND contrasena = SHA2('Admin2024*',256);

CALL registrar_perfil(16,'Nuevo Usuario','3001112222','Bogota');

CALL crear_solicitud(8,'Fuga en baño principal');

CALL asignar_tecnico(1,3);

CALL registrar_diagnostico(1,'Cambio de tuberia',90000);

CALL generar_cotizacion(1,20000,50000);

CALL registrar_pago(1,'visita_inicial',50000);

CALL agendar_servicio_sp(1,'2026-05-01','08:00:00','10:00:00');

CALL finalizar_servicio(1);
