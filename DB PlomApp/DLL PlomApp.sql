drop database if exists plomapp;

create database plomapp
character set utf8mb4 collate utf8mb4_spanish_ci;
use plomapp;

create table usuarios (
    usuario_id int auto_increment primary key,
    correo varchar(100) unique not null,
    contraseña varchar(255) not null,
    rol enum('cliente', 'tecnico', 'administrador') not null,
    estado enum('activo', 'bloqueado') default 'activo',
    fecha_creacion timestamp default current_timestamp
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table perfiles (
    usuario_id int primary key,
    nombre_completo varchar(150) not null,
    telefono varchar(20),
    direccion_texto text,
    latitud decimal(10, 8),
    longitud decimal(11, 8),
    
    foreign key (usuario_id) 
      references usuarios(usuario_id) 
	on delete cascade
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table solicitudes_servicio (
    id int auto_increment primary key,
    cliente_id int not null,
    tecnico_id int,
    descripcion_inicial text not null,
    estado enum('pendiente_pago_visita', 'visita_programada', 'diagnosticado', 'cotizado', 'anticipo_pagado', 'en_progreso', 'finalizado', 'cancelado') default 'pendiente_pago_visita',
    valor_visita_fijo decimal(12, 2) default 50000.00,
    creado_en timestamp default current_timestamp,
    
    foreign key (cliente_id) 
      references usuarios(usuario_id),
      
    foreign key (tecnico_id) 
      references usuarios(usuario_id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table diagnosticos (
    id int auto_increment primary key,
    solicitud_id int not null,
    foto_antes_url varchar(255),
    especificaciones_tecnico text,
    ia_render_url varchar(255),
    mano_de_obra_estimada decimal(12, 2),
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table cotizaciones (
    id int auto_increment primary key,
    solicitud_id int not null,
    costo_transporte decimal(12, 2) default 0,
    total_materiales_ia decimal(12, 2) default 0,
    monto_total_proyecto decimal(12, 2),
    anticipo_calculado decimal(12, 2),
    proveedor_materiales enum('cliente', 'empresa') default 'cliente',
    enviado_whatsapp boolean default false,
    enviado_email boolean default false,
    aceptada_por_cliente boolean default null,
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table materiales_cotizacion (
    id int auto_increment primary key,
    cotizacion_id int not null,
    nombre_material varchar(150),
    precio_promedio_ia decimal(12, 2),
    
    foreign key (cotizacion_id) 
      references cotizaciones(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table agendar_servicio (
    id int auto_increment primary key,
    solicitud_id int not null,
    dias_estimados_trabajo int,
    fecha_inicio_propuesta date,
    hora_inicio time,
    hora_fin time,
    comentarios_cliente_agenda text,
    estado_agenda enum('propuesta', 'confirmada', 'reprogramacion') default 'propuesta',
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table pagos (
    id int auto_increment primary key,
    solicitud_id int not null,
    tipo_pago enum('visita_inicial', 'anticipo_20', 'saldo_final') not null,
    monto decimal(12, 2) not null,
    payu_ref_pol varchar(100),
    estado_pago enum('pendiente', 'aprobado', 'rechazado') default 'pendiente',
    fecha_pago timestamp default current_timestamp,
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table registros_chat (
    id int auto_increment primary key,
    solicitud_id int not null,
    emisor_id int not null,
    mensaje text not null,
    archivo_url varchar(255),
    es_texto_plano boolean default false,
    enviado_en timestamp default current_timestamp,
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table reseñas (
    id int auto_increment primary key,
    solicitud_id int unique not null,
    puntuacion tinyint unsigned not null,
    comentario text,
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;

create table garantias (
    id int auto_increment primary key,
    solicitud_id int unique not null,
    fecha_expiracion date not null,
    estado_garantia enum('activa', 'reclamada', 'vencida') default 'activa',
    
    foreign key (solicitud_id) 
      references solicitudes_servicio(id)
)engine=InnoDB
  default character set utf8mb4 collate utf8mb4_spanish_ci;
