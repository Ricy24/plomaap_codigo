USE plomapp;

DELIMITER $$

CREATE PROCEDURE registrar_usuario(
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(100),
    IN p_rol ENUM('cliente','tecnico','administrador')
)
BEGIN
    INSERT INTO usuarios (correo, contrasena, rol)
    VALUES (p_correo, SHA2(p_contrasena,256), p_rol);
END $$

CREATE PROCEDURE registrar_perfil(
    IN p_usuario_id INT,
    IN p_nombre VARCHAR(150),
    IN p_telefono VARCHAR(20),
    IN p_direccion TEXT
)
BEGIN
    INSERT INTO perfiles(usuario_id,nombre_completo,telefono,direccion_texto)
    VALUES (p_usuario_id,p_nombre,p_telefono,p_direccion);
END $$

CREATE PROCEDURE crear_solicitud(
    IN p_cliente INT,
    IN p_descripcion TEXT
)
BEGIN
    INSERT INTO solicitudes_servicio(cliente_id,descripcion_inicial)
    VALUES (p_cliente,p_descripcion);
END $$

CREATE PROCEDURE asignar_tecnico(
    IN p_solicitud INT,
    IN p_tecnico INT
)
BEGIN
    UPDATE solicitudes_servicio
    SET tecnico_id = p_tecnico
    WHERE id = p_solicitud;
END $$

CREATE PROCEDURE registrar_diagnostico(
    IN p_solicitud INT,
    IN p_descripcion TEXT,
    IN p_mano_obra DECIMAL(12,2)
)
BEGIN
    INSERT INTO diagnosticos(solicitud_id,especificaciones_tecnico,mano_de_obra_estimada)
    VALUES (p_solicitud,p_descripcion,p_mano_obra);
END $$

CREATE PROCEDURE generar_cotizacion(
    IN p_solicitud INT,
    IN p_transporte DECIMAL(12,2),
    IN p_materiales DECIMAL(12,2)
)
BEGIN
    INSERT INTO cotizaciones(
        solicitud_id,
        costo_transporte,
        total_materiales_ia,
        monto_total_proyecto,
        anticipo_calculado
    )
    VALUES (
        p_solicitud,
        p_transporte,
        p_materiales,
        p_transporte + p_materiales,
        (p_transporte + p_materiales)*0.2
    );
END $$

CREATE PROCEDURE registrar_pago(
    IN p_solicitud INT,
    IN p_tipo ENUM('visita_inicial','anticipo_20','saldo_final'),
    IN p_monto DECIMAL(12,2)
)
BEGIN
    INSERT INTO pagos(solicitud_id,tipo_pago,monto,estado_pago)
    VALUES (p_solicitud,p_tipo,p_monto,'aprobado');
END $$

CREATE PROCEDURE agendar_servicio_sp(
    IN p_solicitud INT,
    IN p_fecha DATE,
    IN p_hora_inicio TIME,
    IN p_hora_fin TIME
)
BEGIN
    INSERT INTO agendar_servicio(
        solicitud_id,
        fecha_inicio_propuesta,
        hora_inicio,
        hora_fin
    )
    VALUES (p_solicitud,p_fecha,p_hora_inicio,p_hora_fin);
END $$

CREATE PROCEDURE finalizar_servicio(
    IN p_solicitud INT
)
BEGIN
    UPDATE solicitudes_servicio
    SET estado = 'finalizado'
    WHERE id = p_solicitud;
END $$

CREATE PROCEDURE registrar_resena(
    IN p_solicitud INT,
    IN p_puntuacion INT,
    IN p_comentario TEXT
)
BEGIN
    INSERT INTO resenas(solicitud_id,puntuacion,comentario)
    VALUES (p_solicitud,p_puntuacion,p_comentario);
END $$

DELIMITER ;
