use plomapp;

call sp_registrar_usuario('alberteinstein@mail.com', 'hash123', 'cliente', 'juan pérez', '3001234567', 'calle 10 #5-20');
call sp_registrar_usuario('tecnichian1222@mail.com', 'hash456', 'tecnico', 'pedro técnico', '3109876543', 'carrera 15 #10-30');

call sp_registrar_solicitud(1, 'se dañó el sifón del baño principal');

call sp_asignar_tecnico(13, 4);

call sp_registrar_diagnostico(1, 'https://fotos/antes.jpg', 'tubería oxidada, requiere cambio', 80000);

call sp_generar_cotizacion(1, 15000, 45000, 'empresa');

call sp_pagar_visita(1, 'payu-ref-001');

call sp_pagar_anticipo(1, 'payu-ref-002');

call sp_programar_trabajo(1, 2, '2026-04-10', '08:00:00', '17:00:00', 'disponible toda la mañana');

call sp_finalizar_servicio(6, 'payu-ref-003');

call sp_registrar_resena(6, 5, 'excelente trabajo, muy puntual');
