DROP DATABASE IF EXISTS plomapp;

CREATE DATABASE plomapp
CHARACTER SET utf8mb4 
COLLATE utf8mb4_spanish_ci;

USE plomapp;

CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'tecnico', 'administrador') NOT NULL,
    estado ENUM('activo', 'bloqueado') DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE perfiles (
    usuario_id INT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    direccion_texto TEXT,
    latitud DECIMAL(10,8),
    longitud DECIMAL(11,8),
    
    FOREIGN KEY (usuario_id) 
    REFERENCES usuarios(usuario_id) 
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE solicitudes_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    tecnico_id INT,
    descripcion_inicial TEXT NOT NULL,
    estado ENUM(
        'pendiente_pago_visita',
        'visita_programada',
        'diagnosticado',
        'cotizado',
        'anticipo_pagado',
        'en_progreso',
        'finalizado',
        'cancelado'
    ) DEFAULT 'pendiente_pago_visita',
    valor_visita_fijo DECIMAL(12,2) DEFAULT 50000.00,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) 
    REFERENCES usuarios(usuario_id)
    ON DELETE CASCADE,
    
    FOREIGN KEY (tecnico_id) 
    REFERENCES usuarios(usuario_id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE diagnosticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    foto_antes_url VARCHAR(255),
    especificaciones_tecnico TEXT,
    ia_render_url VARCHAR(255),
    mano_de_obra_estimada DECIMAL(12,2),
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE cotizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    costo_transporte DECIMAL(12,2) DEFAULT 0,
    total_materiales_ia DECIMAL(12,2) DEFAULT 0,
    monto_total_proyecto DECIMAL(12,2),
    anticipo_calculado DECIMAL(12,2),
    proveedor_materiales ENUM('cliente', 'empresa') DEFAULT 'cliente',
    enviado_whatsapp BOOLEAN DEFAULT FALSE,
    enviado_email BOOLEAN DEFAULT FALSE,
    aceptada_por_cliente BOOLEAN DEFAULT NULL,
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE materiales_cotizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cotizacion_id INT NOT NULL,
    nombre_material VARCHAR(150),
    precio_promedio_ia DECIMAL(12,2),
    
    FOREIGN KEY (cotizacion_id) 
    REFERENCES cotizaciones(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE agendar_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    dias_estimados_trabajo INT,
    fecha_inicio_propuesta DATE,
    hora_inicio TIME,
    hora_fin TIME,
    comentarios_cliente_agenda TEXT,
    estado_agenda ENUM('propuesta', 'confirmada', 'reprogramacion') DEFAULT 'propuesta',
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    tipo_pago ENUM('visita_inicial', 'anticipo_20', 'saldo_final') NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    payu_ref_pol VARCHAR(100),
    estado_pago ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE registros_chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    emisor_id INT NOT NULL,
    mensaje TEXT NOT NULL,
    archivo_url VARCHAR(255),
    es_texto_plano BOOLEAN DEFAULT FALSE,
    enviado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE,
    
    FOREIGN KEY (emisor_id) 
    REFERENCES usuarios(usuario_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT UNIQUE NOT NULL,
    puntuacion TINYINT UNSIGNED NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE garantias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT UNIQUE NOT NULL,
    fecha_expiracion DATE NOT NULL,
    estado_garantia ENUM('activa', 'reclamada', 'vencida') DEFAULT 'activa',
    
    FOREIGN KEY (solicitud_id) 
    REFERENCES solicitudes_servicio(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ========================
-- INDICES (RENDIMIENTO)
-- ========================
CREATE INDEX idx_cliente ON solicitudes_servicio(cliente_id);
CREATE INDEX idx_tecnico ON solicitudes_servicio(tecnico_id);