use plomapp;

insert into usuarios (correo, contraseña, rol, estado) values
('admin@plomapp.com',        '$2b$10$adminHash001xxxxxxxxxxxxxxxxxxxxxAAAAAAAAAA', 'administrador', 'activo'),
('soporte@plomapp.com',      '$2b$10$adminHash002xxxxxxxxxxxxxxxxxxxxxBBBBBBBBBB', 'administrador', 'activo'),
('carlos.ruiz@plomapp.com',  '$2b$10$techHash001xxxxxxxxxxxxxxxxxxxxxxCCCCCCCCCC', 'tecnico',        'activo'),
('jorge.mesa@plomapp.com',   '$2b$10$techHash002xxxxxxxxxxxxxxxxxxxxxxDDDDDDDDDD', 'tecnico',        'activo'),
('luis.pardo@plomapp.com',   '$2b$10$techHash003xxxxxxxxxxxxxxxxxxxxxxEEEEEEEEEE', 'tecnico',        'activo'),
('mario.vega@plomapp.com',   '$2b$10$techHash004xxxxxxxxxxxxxxxxxxxxxxFFFFFFFFFF', 'tecnico',        'activo'),
('pedro.rios@plomapp.com',   '$2b$10$techHash005xxxxxxxxxxxxxxxxxxxxxxGGGGGGGGGG', 'tecnico',        'bloqueado'),
('ana.garcia@gmail.com',     '$2b$10$clientHash01xxxxxxxxxxxxxxxxxxxxxHHHHHHHHHH', 'cliente',        'activo'),
('juan.lopez@gmail.com',     '$2b$10$clientHash02xxxxxxxxxxxxxxxxxxxxxIIIIIIIIII', 'cliente',        'activo'),
('maria.torres@gmail.com',   '$2b$10$clientHash03xxxxxxxxxxxxxxxxxxxxxJJJJJJJJJJ', 'cliente',        'activo'),
('pedro.silva@hotmail.com',  '$2b$10$clientHash04xxxxxxxxxxxxxxxxxxxxxKKKKKKKKKK', 'cliente',        'activo'),
('laura.rojas@gmail.com',    '$2b$10$clientHash05xxxxxxxxxxxxxxxxxxxxxLLLLLLLLLL', 'cliente',        'activo'),
('diego.mora@gmail.com',     '$2b$10$clientHash06xxxxxxxxxxxxxxxxxxxxxMMMMMMMMMM', 'cliente',        'activo'),
('sofia.nunez@gmail.com',    '$2b$10$clientHash07xxxxxxxxxxxxxxxxxxxxxNNNNNNNNNN', 'cliente',        'activo'),
('camila.reyes@gmail.com',   '$2b$10$clientHash08xxxxxxxxxxxxxxxxxxxxxOOOOOOOOOO', 'cliente',        'activo');

insert into perfiles (usuario_id, nombre_completo, telefono, direccion_texto, latitud, longitud) values
(1,  'Administrador Principal',  '3001000001', 'Oficina PlomApp - Calle 72 #10-07, Bogota',    4.65486,  -74.05647),
(2,  'Soporte PlomApp',          '3001000002', 'Oficina PlomApp - Calle 72 #10-07, Bogota',    4.65486,  -74.05647),
(3,  'Carlos Ruiz Montoya',      '3112345678', 'Carrera 13 #45-20, Chapinero, Bogota',         4.64620,  -74.05280),
(4,  'Jorge Mesa Castillo',      '3123456789', 'Calle 100 #15-30, Usaquen, Bogota',            4.69430,  -74.04850),
(5,  'Luis Pardo Herrera',       '3134567890', 'Av. Primero de Mayo #32-10, Kennedy, Bogota',  4.62150,  -74.10230),
(6,  'Mario Vega Ospina',        '3145678901', 'Calle 80 #68-45, Engativa, Bogota',            4.70120,  -74.10900),
(7,  'Pedro Rios Gutierrez',     '3156789012', 'Carrera 30 #19-20, Teusaquillo, Bogota',       4.63780,  -74.07560),
(8,  'Ana Garcia Perez',         '3167890123', 'Calle 134 #55-10, Suba, Bogota',               4.74120,  -74.04930),
(9,  'Juan Lopez Ramirez',       '3178901234', 'Carrera 7 #127-30, Usaquen, Bogota',           4.70050,  -74.03920),
(10, 'Maria Torres Suarez',      '3189012345', 'Calle 63 #24-15, Barrios Unidos, Bogota',      4.66310,  -74.06180),
(11, 'Pedro Silva Vargas',       '3190123456', 'Av. Ciudad de Cali #12-50, Bosa, Bogota',      4.59870,  -74.17230),
(12, 'Laura Rojas Castro',       '3101234567', 'Calle 45 #22-80, Teusaquillo, Bogota',         4.64390,  -74.07010),
(13, 'Diego Mora Pinzon',        '3112345670', 'Carrera 68 #38-21, Puente Aranda, Bogota',     4.62810,  -74.09740),
(14, 'Sofia Nunez Bermudez',     '3123456701', 'Calle 170 #8-75, Usaquen, Bogota',             4.75360,  -74.04560),
(15, 'Camila Reyes Mendoza',     '3134567012', 'Carrera 50 #22-10, Barrios Unidos, Bogota',    4.66870,  -74.08120);

insert into solicitudes_servicio (cliente_id, tecnico_id, descripcion_inicial, estado, valor_visita_fijo) values
(8,  3, 'Tuberia bajo el lavaplatos tiene fuga constante, moja el piso',              'finalizado',          50000.00),
(9,  4, 'El sanitario no deja de correr agua, lleva 3 dias asi',                      'finalizado',          50000.00),
(10, 3, 'Instalacion de ducha nueva en bano principal',                               'finalizado',          50000.00),
(11, 5, 'Filtracion de agua en la pared del cuarto, mancha de humedad grande',        'en_progreso',         50000.00),
(12, 4, 'Llave del lavamanos gotea aunque este cerrada',                              'anticipo_pagado',     50000.00),
(13, 6, 'Tapon en el desague de la cocina, el agua no baja',                          'cotizado',            50000.00),
(8,  5, 'Cambio de tuberia general de agua fria en apartamento',                     'finalizado',          50000.00),
(9,  3, 'Instalacion de calentador de paso nuevo',                                    'visita_programada',   50000.00),
(14, 6, 'Bano secundario sin presion de agua',                                        'diagnosticado',       50000.00),
(15, 4, 'Inodoro obstruido, no jala bien',                                            'pendiente_pago_visita', 50000.00),
(10, 5, 'Fuga en la union del tubo de gas, hay olor',                                 'cancelado',           50000.00),
(12, 3, 'Instalacion punto hidraulico para lavadora',                                 'finalizado',          50000.00);

insert into diagnosticos (solicitud_id, foto_antes_url, especificaciones_tecnico, ia_render_url, mano_de_obra_estimada) values
(1,  'https://storage.plomapp.com/fotos/req1_antes.jpg',  'Tuberia PVC de 1/2 pulgada fracturada en union. Requiere cambio de codo y 30cm de tubo.',        'https://ia.plomapp.com/render/req1.png',  80000.00),
(2,  'https://storage.plomapp.com/fotos/req2_antes.jpg',  'Valvula interna del sanitario desgastada. Cambio de flapper y flotador completo.',                'https://ia.plomapp.com/render/req2.png',  60000.00),
(3,  'https://storage.plomapp.com/fotos/req3_antes.jpg',  'Instalacion desde cero: mezcladora, ducha y soporte. Pared en buen estado, sin picado.',          'https://ia.plomapp.com/render/req3.png', 150000.00),
(4,  'https://storage.plomapp.com/fotos/req4_antes.jpg',  'Filtracion por junta de tuberia empotrada. Se requiere picar pared 40cm y sellar con impermeabilizante.', 'https://ia.plomapp.com/render/req4.png', 220000.00),
(5,  'https://storage.plomapp.com/fotos/req5_antes.jpg',  'Cartucho ceramico de llave desgastado. Cambio directo, no requiere picado.',                      'https://ia.plomapp.com/render/req5.png',  45000.00),
(6,  'https://storage.plomapp.com/fotos/req6_antes.jpg',  'Tapon de grasa acumulada en sifon. Destape mecanico con espiral.',                                'https://ia.plomapp.com/render/req6.png',  40000.00),
(7,  'https://storage.plomapp.com/fotos/req7_antes.jpg',  'Tuberia galvanizada obsoleta de 3/4 pulgada en toda la red. Cambio completo a PVC presion.',       'https://ia.plomapp.com/render/req7.png', 380000.00),
(9,  'https://storage.plomapp.com/fotos/req9_antes.jpg',  'Bano sin registro propio. Problema en llave de paso general del piso.',                           'https://ia.plomapp.com/render/req9.png',  70000.00),
(12, 'https://storage.plomapp.com/fotos/req12_antes.jpg', 'Instalacion punto hidraulico en cuarto de ropas. Agua fria y caliente con registro individual.',   'https://ia.plomapp.com/render/req12.png', 130000.00);

insert into cotizaciones (solicitud_id, costo_transporte, total_materiales_ia, monto_total_proyecto, anticipo_calculado, proveedor_materiales, enviado_whatsapp, enviado_email, aceptada_por_cliente) values
(1,  15000.00,  35000.00,  130000.00,  26000.00, 'empresa', true, true, true),
(2,  12000.00,  25000.00,   97000.00,  19400.00, 'empresa', true, true, true),
(3,  18000.00, 120000.00,  288000.00,  57600.00, 'cliente', true, true, true),
(4,  20000.00, 180000.00,  420000.00,  84000.00, 'empresa', true, true, true),
(5,  10000.00,  15000.00,   70000.00,  14000.00, 'empresa', true,  false, true),
(6,  10000.00,   5000.00,   55000.00,  11000.00, 'empresa', true,  true,  null),
(7,  25000.00, 280000.00,  685000.00, 137000.00, 'empresa', true, true, true),
(12, 15000.00,  85000.00,  230000.00,  46000.00, 'cliente', true, true, true);

insert into materiales_cotizacion (cotizacion_id, nombre_material, precio_promedio_ia) values
(1, 'Tubo PVC presion 1/2 pulgada x 1m',  8500.00),
(1, 'Codo PVC 1/2 pulgada',               3200.00),
(1, 'Soldadura PVC 250ml',                5800.00),
(1, 'Union PVC 1/2 pulgada',              2500.00),
(2, 'Flapper universal para sanitario',   12000.00),
(2, 'Flotador plastico 1/2 pulgada',       8500.00),
(3, 'Mezcladora ducha monocontrol',       85000.00),
(3, 'Rociador ducha con brazo',           22000.00),
(3, 'Manguera flexible 1.5m',              8500.00),
(4, 'Impermeabilizante x galon',          45000.00),
(4, 'Mortero sellante x kg',              12000.00),
(4, 'Tuberia PVC presion 3/4 x 2m',       18000.00),
(7, 'Tuberia PVC presion 3/4 x 6m',       48000.00),
(7, 'Registro esfera 3/4 pulgada x2',     34000.00),
(7, 'Adaptadores y codos surtidos',       22000.00),
(7, 'Teflon industrial x rollo',           6000.00),
(8, 'Registro esfera 1/2 pulgada x2',     28000.00),
(8, 'Tubo PVC presion 1/2 x 3m',         24000.00),
(8, 'Tee PVC 1/2 pulgada x2',             9000.00);

insert into agendar_servicio (solicitud_id, dias_estimados_trabajo, fecha_inicio_propuesta, hora_inicio, hora_fin, comentarios_cliente_agenda, estado_agenda) values
(1,  1, '2026-01-10', '08:00:00', '12:00:00', 'Disponible toda la manana',              'confirmada'),
(2,  1, '2026-01-15', '14:00:00', '17:00:00', 'Solo en la tarde',                       'confirmada'),
(3,  2, '2026-01-20', '08:00:00', '17:00:00', 'Estoy en casa todo el dia',              'confirmada'),
(4,  3, '2026-02-05', '09:00:00', '17:00:00', 'Avisen antes de llegar',                 'confirmada'),
(5,  1, '2026-02-12', '10:00:00', '13:00:00', 'Preferible manana',                      'propuesta'),
(7,  4, '2026-02-18', '08:00:00', '17:00:00', 'Trabajo urgente, coordinar acceso',      'confirmada'),
(8,  1, '2026-03-01', '09:00:00', '12:00:00', 'Solo manana del sabado',                 'propuesta'),
(12, 1, '2026-03-10', '08:00:00', '15:00:00', 'Listo para cualquier dia de la semana',  'confirmada');

insert into pagos (solicitud_id, tipo_pago, monto, payu_ref_pol, estado_pago) values
(1,  'visita_inicial', 50000.00, 'PAYU-2601-0001', 'aprobado'),
(1,  'anticipo_20',    26000.00, 'PAYU-2601-0002', 'aprobado'),
(1,  'saldo_final',   104000.00, 'PAYU-2601-0003', 'aprobado'),
(2,  'visita_inicial', 50000.00, 'PAYU-2601-0004', 'aprobado'),
(2,  'anticipo_20',    19400.00, 'PAYU-2601-0005', 'aprobado'),
(2,  'saldo_final',    77600.00, 'PAYU-2601-0006', 'aprobado'),
(3,  'visita_inicial', 50000.00, 'PAYU-2601-0007', 'aprobado'),
(3,  'anticipo_20',    57600.00, 'PAYU-2601-0008', 'aprobado'),
(3,  'saldo_final',   230400.00, 'PAYU-2601-0009', 'aprobado'),
(4,  'visita_inicial', 50000.00, 'PAYU-2602-0001', 'aprobado'),
(4,  'anticipo_20',    84000.00, 'PAYU-2602-0002', 'aprobado'),
(5,  'visita_inicial', 50000.00, 'PAYU-2602-0003', 'aprobado'),
(5,  'anticipo_20',    14000.00, 'PAYU-2602-0004', 'aprobado'),
(6,  'visita_inicial', 50000.00, 'PAYU-2602-0005', 'aprobado'),
(7,  'visita_inicial', 50000.00, 'PAYU-2603-0001', 'aprobado'),
(7,  'anticipo_20',   137000.00, 'PAYU-2603-0002', 'aprobado'),
(7,  'saldo_final',   548000.00, 'PAYU-2603-0003', 'aprobado'),
(8,  'visita_inicial', 50000.00, 'PAYU-2603-0004', 'aprobado'),
(12, 'visita_inicial', 50000.00, 'PAYU-2603-0005', 'aprobado'),
(12, 'anticipo_20',    46000.00, 'PAYU-2603-0006', 'aprobado'),
(12, 'saldo_final',   184000.00, 'PAYU-2603-0007', 'aprobado');

insert into registros_chat (solicitud_id, emisor_id, mensaje, es_texto_plano) values
(1, 8,  'Buenas, la fuga esta debajo del lavaplatos, ya puse un balde', true),
(1, 3,  'Recibido, voy el viernes a las 8am a revisarlo', true),
(1, 8,  'Perfecto, muchas gracias', true),
(1, 3,  'Listo, ya quedo arreglado. Cambie el codo y selle la union', true),
(2, 9,  'El sanitario lleva corriendo agua desde el lunes', true),
(2, 4,  'Ese es el flotador, lo cambio en la visita sin problema', true),
(3, 10, 'Quiero instalar una ducha nueva, la anterior era de cortina', true),
(3, 3,  'Perfecto, necesito saber si ya tiene los accesorios o los compro yo', true),
(3, 10, 'Por favor comprelos usted, yo le pago', true),
(4, 11, 'La mancha de humedad ya paso al cuarto del lado', true),
(4, 5,  'Eso es una junta rota, hay que picar la pared para llegar a la tuberia', true),
(7, 8,  'Las tuberias del apartamento son muy viejas, se oxidan constantemente', true),
(7, 5,  'Si, vi que son galvanizadas de los 80s. Mejor cambiamos todo a PVC', true),
(12,12, 'Necesito el punto de agua para mi lavadora nueva', true),
(12, 3, 'Claro, se instala toma de agua fria y caliente con su registro. Listo para el lunes', true);

insert into reseñas (solicitud_id, puntuacion, comentario) values
(1,  5, 'Excelente trabajo de Carlos, muy puntual y dejo todo limpio. 100% recomendado'),
(2,  4, 'Jorge llego a tiempo y soluciono el problema rapido. Buen servicio'),
(3,  5, 'La instalacion de la ducha quedo perfecta, muy profesional el tecnico'),
(7,  5, 'Luis hizo un trabajo increible con las tuberias, muy ordenado y eficiente'),
(12, 4, 'Buen trabajo, el punto de la lavadora quedo perfecto. Leve demora al inicio');

insert into garantias (solicitud_id, fecha_expiracion, estado_garantia) values
(1,  '2026-07-10', 'activa'),
(2,  '2026-07-15', 'activa'),
(3,  '2026-07-20', 'activa'),
(7,  '2026-08-18', 'activa'),
(12, '2026-09-10', 'activa');
