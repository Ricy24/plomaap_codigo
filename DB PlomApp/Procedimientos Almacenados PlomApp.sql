use plomapp;

delimiter $$

create procedure sp_registrar_usuario(
    in p_correo         varchar(100),
    in p_contraseña     varchar(255),
    in p_rol            enum('cliente','tecnico','administrador'),
    in p_nombre_completo varchar(150),
    in p_telefono       varchar(20),
    in p_direccion_texto text
)
begin
    declare v_usuario_id int;

    insert into usuarios (correo, contraseña, rol)
    values (p_correo, p_contraseña, p_rol);

    set v_usuario_id = last_insert_id();

    insert into perfiles (usuario_id, nombre_completo, telefono, direccion_texto)
    values (v_usuario_id, p_nombre_completo, p_telefono, p_direccion_texto);

    select v_usuario_id as nuevo_usuario_id, 'usuario registrado exitosamente' as mensaje;
end$$

create procedure sp_registrar_solicitud(
    in p_cliente_id        int,
    in p_descripcion       text
)
begin
    insert into solicitudes_servicio (cliente_id, descripcion_inicial, estado)
    values (p_cliente_id, p_descripcion, 'pendiente_pago_visita');

    select last_insert_id() as nueva_solicitud_id,
           'solicitud creada. pendiente pago de visita ($50.000)' as mensaje;
end$$

create procedure sp_asignar_tecnico(
    in p_solicitud_id int,
    in p_tecnico_id int
)
begin
    if not exists (select 1 from usuarios where usuario_id = p_tecnico_id and rol = 'tecnico' and estado = 'activo') then
        signal sqlstate '45000'
        set message_text = 'el usuario no es un técnico activo válido';
    end if;

    update solicitudes_servicio
    set tecnico_id = p_tecnico_id,
        estado     = 'visita_programada'
    where id = p_solicitud_id;

    select 'técnico asignado y visita programada' as mensaje;
end$$

create procedure sp_registrar_diagnostico(
    in p_solicitud_id          int,
    in p_foto_antes_url        varchar(255),
    in p_especificaciones      text,
    in p_mano_de_obra_estimada decimal(12,2)
)
begin
    insert into diagnosticos (solicitud_id, foto_antes_url, especificaciones_tecnico, mano_de_obra_estimada)
    values (p_solicitud_id, p_foto_antes_url, p_especificaciones, p_mano_de_obra_estimada);

    update solicitudes_servicio
    set estado = 'diagnosticado'
    where id = p_solicitud_id;

    select last_insert_id() as diagnostico_id, 'diagnóstico registrado exitosamente' as mensaje;
end$$

create procedure sp_generar_cotizacion(
    in p_solicitud_id           int,
    in p_costo_transporte       decimal(12,2),
    in p_total_materiales       decimal(12,2),
    in p_proveedor_materiales   enum('cliente','empresa')
)
begin
    declare v_mano_de_obra   decimal(12,2) default 0;
    declare v_monto_total    decimal(12,2);
    declare v_anticipo_20    decimal(12,2);

    select coalesce(mano_de_obra_estimada, 0)
    into v_mano_de_obra
    from diagnosticos
    where solicitud_id = p_solicitud_id
    order by id desc limit 1;

    set v_monto_total = p_costo_transporte + p_total_materiales + v_mano_de_obra;
    set v_anticipo_20 = v_monto_total * 0.20;

    insert into cotizaciones (solicitud_id, costo_transporte, total_materiales_ia,
                        monto_total_proyecto, anticipo_calculado, proveedor_materiales)
    values (p_solicitud_id, p_costo_transporte, p_total_materiales,
            v_monto_total, v_anticipo_20, p_proveedor_materiales);

    update solicitudes_servicio set estado = 'cotizado' where id = p_solicitud_id;

    select last_insert_id() as cotizacion_id,
           v_monto_total    as total,
           v_anticipo_20    as anticipo_requerido,
           'cotización generada exitosamente' as mensaje;
end$$

create procedure sp_pagar_visita(
    in p_solicitud_id  int,
    in p_payu_ref      varchar(100)
)
begin
    declare v_valor_visita decimal(12,2);

    select valor_visita_fijo into v_valor_visita
    from solicitudes_servicio where id = p_solicitud_id;

    insert into pagos (solicitud_id, tipo_pago, monto, payu_ref_pol, estado_pago)
    values (p_solicitud_id, 'visita_inicial', v_valor_visita, p_payu_ref, 'aprobado');

    select 'pago de visita registrado exitosamente' as mensaje,
           v_valor_visita as monto_pagado;
end$$

create procedure sp_pagar_anticipo(
    in p_solicitud_id int,
    in p_payu_ref    varchar(100)
)
begin
    declare v_anticipo decimal(12,2);

    select anticipo_calculado into v_anticipo
    from cotizaciones
    where solicitud_id = p_solicitud_id
    order by id desc limit 1;

    if v_anticipo is null then
        signal sqlstate '45000'
        set message_text = 'no existe una cotización para esta solicitud';
    end if;

    insert into pagos (solicitud_id, tipo_pago, monto, payu_ref_pol, estado_pago)
    values (p_solicitud_id, 'anticipo_20', v_anticipo, p_payu_ref, 'aprobado');

    update solicitudes_servicio set estado = 'anticipo_pagado' where id = p_solicitud_id;

    select 'anticipo del 20% registrado' as mensaje, v_anticipo as monto_anticipo;
end$$

create procedure sp_programar_trabajo(
    in p_solicitud_id         int,
    in p_dias_estimados       int,
    in p_fecha_inicio         date,
    in p_hora_inicio          time,
    in p_hora_fin             time,
    in p_comentarios_cliente  text
)
begin
    insert into agendar_servicio (solicitud_id, dias_estimados_trabajo, fecha_inicio_propuesta,
                                    hora_inicio, hora_fin, comentarios_cliente_agenda, estado_agenda)
    values (p_solicitud_id, p_dias_estimados, p_fecha_inicio,
            p_hora_inicio, p_hora_fin, p_comentarios_cliente, 'confirmada');

    update solicitudes_servicio set estado = 'en_progreso' where id = p_solicitud_id;

    select 'trabajo programado y estado actualizado a en_progreso' as mensaje;
end$$

create procedure sp_finalizar_servicio(
    in p_solicitud_id int,
    in p_payu_ref     varchar(100)
)
begin
    declare v_total       decimal(12,2);
    declare v_anticipo    decimal(12,2);
    declare v_saldo_final decimal(12,2);
    declare v_expiracion  date;

    select monto_total_proyecto, anticipo_calculado
    into v_total, v_anticipo
    from cotizaciones where solicitud_id = p_solicitud_id order by id desc limit 1;

    set v_saldo_final = v_total - v_anticipo;
    set v_expiracion  = date_add(curdate(), interval 6 month);

    insert into pagos (solicitud_id, tipo_pago, monto, payu_ref_pol, estado_pago)
    values (p_solicitud_id, 'saldo_final', v_saldo_final, p_payu_ref, 'aprobado');
   
    update solicitudes_servicio set estado = 'finalizado' where id = p_solicitud_id;

    insert into garantias (solicitud_id, fecha_expiracion, estado_garantia)
    values (p_solicitud_id, v_expiracion, 'activa');

    select 'servicio finalizado. garantía generada' as mensaje,
           v_expiracion as garantia_hasta,
           v_saldo_final as saldo_cobrado;
end$$

create procedure sp_registrar_resena(
    in p_solicitud_id int,
    in p_puntuacion   tinyint unsigned,
    in p_comentario   text
)
begin
    if not exists (
        select 1 from solicitudes_servicio
        where id = p_solicitud_id and estado = 'finalizado'
    ) then
        signal sqlstate '45000'
        set message_text = 'solo se puede calificar un servicio finalizado';
    end if;

    insert into reseñas (solicitud_id, puntuacion, comentario)
    values (p_solicitud_id, p_puntuacion, p_comentario);

    select 'reseña registrada exitosamente' as mensaje;
end$$

delimiter ;