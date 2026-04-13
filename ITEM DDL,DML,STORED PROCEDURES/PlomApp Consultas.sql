-- 1. Mostrar todos los usuarios
SELECT * FROM usuarios;

-- 2. Mostrar solo los clientes
SELECT * FROM usuarios
WHERE rol = 'cliente';

-- 3. Mostrar todos los técnicos
SELECT * FROM usuarios
WHERE rol = 'tecnico';

-- 4. Servicios en estado pendiente
SELECT * FROM solicitudes_servicio
WHERE estado = 'pendiente_pago_visita';

-- 5. Servicios completados
SELECT * FROM solicitudes_servicio
WHERE estado = 'finalizado';

-- 6. Servicios con nombre del cliente
SELECT s.id, p.nombre_completo AS cliente, s.descripcion_inicial
FROM solicitudes_servicio s
JOIN perfiles p ON s.cliente_id = p.usuario_id;

-- 7. Servicios con técnico asignado
SELECT s.id, p.nombre_completo AS tecnico, s.descripcion_inicial
FROM solicitudes_servicio s
JOIN perfiles p ON s.tecnico_id = p.usuario_id;

-- 8. Servicios con tipo de servicio (simulado con descripción)
SELECT id, descripcion_inicial AS tipo_servicio
FROM solicitudes_servicio;

-- 9. Mostrar todos los pagos realizados
SELECT * FROM pagos
WHERE estado_pago = 'aprobado';

-- 10. Servicios ordenados por fecha
SELECT * FROM solicitudes_servicio
ORDER BY creado_en DESC;

-- 11. Cantidad de servicios por cliente
SELECT cliente_id, COUNT(*) AS total_servicios
FROM solicitudes_servicio
GROUP BY cliente_id;

-- 12. Cantidad de servicios por técnico
SELECT tecnico_id, COUNT(*) AS total_servicios
FROM solicitudes_servicio
WHERE tecnico_id IS NOT NULL
GROUP BY tecnico_id;

-- 13. Total de ingresos (solo pagos aprobados)
SELECT SUM(monto) AS total_ingresos
FROM pagos
WHERE estado_pago = 'aprobado';

-- 14. Cantidad de servicios por tipo (usando descripción como referencia)
SELECT descripcion_inicial, COUNT(*) AS total
FROM solicitudes_servicio
GROUP BY descripcion_inicial;

-- 15. Promedio de calificación por técnico
SELECT s.tecnico_id, AVG(r.puntuacion) AS promedio
FROM resenas r
JOIN solicitudes_servicio s ON r.solicitud_id = s.id
GROUP BY s.tecnico_id;

-- 16. Servicios con valor mayor al promedio
SELECT *
FROM solicitudes_servicio
WHERE valor_visita_fijo > (
    SELECT AVG(valor_visita_fijo)
    FROM solicitudes_servicio
);

-- 17. Clientes con más de un servicio
SELECT cliente_id
FROM solicitudes_servicio
GROUP BY cliente_id
HAVING COUNT(*) > 1;

-- 18. Técnico con más servicios realizados
SELECT tecnico_id
FROM solicitudes_servicio
GROUP BY tecnico_id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- 19. Servicios del cliente con más solicitudes
SELECT *
FROM solicitudes_servicio
WHERE cliente_id = (
    SELECT cliente_id
    FROM solicitudes_servicio
    GROUP BY cliente_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);

-- 20. Técnicos con promedio de calificación mayor al promedio general
SELECT tecnico_id
FROM (
    SELECT s.tecnico_id, AVG(r.puntuacion) AS promedio
    FROM resenas r
    JOIN solicitudes_servicio s ON r.solicitud_id = s.id
    GROUP BY s.tecnico_id
) AS promedios
WHERE promedio > (
    SELECT AVG(puntuacion) FROM resenas
);