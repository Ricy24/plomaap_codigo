USE plomapp;

INSERT INTO usuarios (correo, contrasena, rol, estado) VALUES
('admin@plomapp.com',       SHA2('Admin2024*',256),    'administrador', 'activo'),
('soporte@plomapp.com',     SHA2('Soporte2024*',256),  'administrador', 'activo'),
('carlos.ruiz@plomapp.com', SHA2('Carlos123*',256),    'tecnico',       'activo'),
('jorge.mesa@plomapp.com',  SHA2('Jorge123*',256),     'tecnico',       'activo'),
('luis.pardo@plomapp.com',  SHA2('Luis123*',256),      'tecnico',       'activo'),
('mario.vega@plomapp.com',  SHA2('Mario123*',256),     'tecnico',       'activo'),
('pedro.rios@plomapp.com',  SHA2('Pedro123*',256),     'tecnico',       'bloqueado'),
('ana.garcia@gmail.com',    SHA2('Ana12345*',256),     'cliente',       'activo'),
('juan.lopez@gmail.com',    SHA2('Juan12345*',256),    'cliente',       'activo'),
('maria.torres@gmail.com',  SHA2('Maria12345*',256),   'cliente',       'activo'),
('pedro.silva@hotmail.com', SHA2('Pedro12345*',256),   'cliente',       'activo'),
('laura.rojas@gmail.com',   SHA2('Laura12345*',256),   'cliente',       'activo'),
('diego.mora@gmail.com',    SHA2('Diego12345*',256),   'cliente',       'activo'),
('sofia.nunez@gmail.com',   SHA2('Sofia12345*',256),   'cliente',       'activo'),
('camila.reyes@gmail.com',  SHA2('Camila12345*',256),  'cliente',       'activo');

INSERT INTO perfiles (usuario_id, nombre_completo, telefono, direccion_texto, latitud, longitud) VALUES
(1,'Administrador Principal','3014872351','Bogota Centro',4.65,-74.05),
(2,'Soporte PlomApp','3024619872','Bogota Centro',4.65,-74.05),
(3,'Carlos Ruiz','3112847653','Chapinero',4.64,-74.05),
(4,'Jorge Mesa','3124093817','Usaquen',4.69,-74.04),
(5,'Luis Pardo','3139274056','Kennedy',4.62,-74.10),
(6,'Mario Vega','3148365291','Engativa',4.70,-74.10),
(7,'Pedro Rios','3157482036','Teusaquillo',4.63,-74.07),
(8,'Ana Garcia','3161938472','Suba',4.74,-74.04),
(9,'Juan Lopez','3178304916','Usaquen',4.70,-74.03),
(10,'Maria Torres','3189472036','Barrios Unidos',4.66,-74.06),
(11,'Pedro Silva','3190836147','Bosa',4.59,-74.17),
(12,'Laura Rojas','3104729381','Teusaquillo',4.64,-74.07),
(13,'Diego Mora','3113847265','Puente Aranda',4.62,-74.09),
(14,'Sofia Nunez','3124039817','Usaquen',4.75,-74.04),
(15,'Camila Reyes','3135764829','Barrios Unidos',4.66,-74.08);

INSERT INTO solicitudes_servicio (cliente_id, tecnico_id, descripcion_inicial, estado, valor_visita_fijo) VALUES
(8,3,'Fuga en cocina','finalizado',50000),
(9,4,'Sanitario dañado','finalizado',50000),
(10,3,'Instalacion ducha','finalizado',50000),
(11,5,'Humedad en pared','en_progreso',50000),
(12,4,'Llave goteando','anticipo_pagado',50000),
(13,6,'Desague tapado','cotizado',50000),
(8,5,'Cambio tuberias','finalizado',50000),
(9,3,'Instalar calentador','visita_programada',50000),
(14,6,'Baja presion agua','diagnosticado',50000),
(15,4,'Inodoro tapado','pendiente_pago_visita',50000);

INSERT INTO diagnosticos (solicitud_id, especificaciones_tecnico, mano_de_obra_estimada) VALUES
(1,'Cambio de codo PVC',80000),
(2,'Cambio de flotador',60000),
(3,'Instalacion completa',150000),
(4,'Reparacion tuberia',220000),
(5,'Cambio de cartucho',45000),
(6,'Destape mecanico',40000),
(7,'Cambio total tuberia',380000),
(8,'Instalacion calentador',120000),
(9,'Ajuste presion',70000),
(10,'Destape sanitario',50000);

INSERT INTO cotizaciones (solicitud_id, costo_transporte, total_materiales_ia, monto_total_proyecto, anticipo_calculado) VALUES
(1,15000,35000,130000,26000),
(2,12000,25000,97000,19400),
(3,18000,120000,288000,57600),
(4,20000,180000,420000,84000),
(5,10000,15000,70000,14000),
(6,10000,5000,55000,11000),
(7,25000,280000,685000,137000),
(8,15000,85000,230000,46000),
(9,12000,40000,122000,24400),
(10,10000,20000,80000,16000);

INSERT INTO pagos (solicitud_id, tipo_pago, monto, estado_pago) VALUES
(1,'visita_inicial',50000,'aprobado'),
(1,'anticipo_20',26000,'aprobado'),
(2,'visita_inicial',50000,'aprobado'),
(2,'anticipo_20',19400,'aprobado'),
(3,'visita_inicial',50000,'aprobado'),
(4,'visita_inicial',50000,'aprobado'),
(5,'visita_inicial',50000,'aprobado'),
(6,'visita_inicial',50000,'aprobado'),
(7,'visita_inicial',50000,'aprobado'),
(8,'visita_inicial',50000,'aprobado');

INSERT INTO registros_chat (solicitud_id, emisor_id, mensaje) VALUES
(1,8,'Tengo una fuga'),
(2,9,'Necesito ayuda'),
(3,10,'Quiero instalar ducha'),
(4,11,'Hay humedad'),
(5,12,'Llave dañada'),
(6,13,'Cocina tapada'),
(7,8,'Tuberias viejas'),
(8,9,'Instalar calentador'),
(9,14,'No hay presion'),
(10,15,'Inodoro tapado');

INSERT INTO resenas (solicitud_id, puntuacion, comentario) VALUES
(1,5,'Excelente'),
(2,4,'Bueno'),
(3,5,'Perfecto'),
(4,3,'Regular'),
(5,4,'Bien'),
(6,3,'Aceptable'),
(7,5,'Muy bueno'),
(8,4,'Recomendado'),
(9,3,'Normal'),
(10,4,'Buen servicio');

INSERT INTO garantias (solicitud_id, fecha_expiracion) VALUES
(1,'2026-07-01'),
(2,'2026-07-02'),
(3,'2026-07-03'),
(4,'2026-07-04'),
(5,'2026-07-05'),
(6,'2026-07-06'),
(7,'2026-07-07'),
(8,'2026-07-08'),
(9,'2026-07-09'),
(10,'2026-07-10');