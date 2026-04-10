use plomapp;

select usuario_id, correo, rol, estado, fecha_creacion
from usuarios
order by fecha_creacion desc;

select usuario_id, correo, estado, fecha_creacion
from usuarios
where rol = 'cliente'
order by fecha_creacion desc;

select u.usuario_id, p.nombre_completo, u.correo, u.estado
from usuarios u
join perfiles p 
  on u.usuario_id = p.usuario_id
where u.rol = 'tecnico'
order by p.nombre_completo;

select sr.id, p.nombre_completo as cliente, sr.descripcion_inicial, sr.creado_en
from solicitudes_servicio sr
join perfiles p on sr.cliente_id = p.usuario_id
where sr.estado = 'pendiente_pago_visita'
order by sr.creado_en;

select sr.id, p.nombre_completo as cliente, sr.creado_en
from solicitudes_servicio sr
join perfiles p on sr.cliente_id = p.usuario_id
where sr.estado = 'finalizado'
order by sr.creado_en desc;

select sr.id, p.nombre_completo as cliente, u.correo,
       sr.estado, sr.descripcion_inicial, sr.creado_en
from solicitudes_servicio sr
join usuarios    u on sr.cliente_id = u.usuario_id
join perfiles p on u.usuario_id = p.usuario_id
order by sr.creado_en desc;

select sr.id,
       pc.nombre_completo as cliente,
       pt.nombre_completo as tecnico,
       sr.estado
from solicitudes_servicio sr
join  perfiles pc on sr.cliente_id  = pc.usuario_id
left join perfiles pt on sr.tecnico_id = pt.usuario_id
where sr.tecnico_id is not null
order by sr.id;

select sr.id, p.nombre_completo as cliente,
       sr.estado as tipo_estado,
       sr.descripcion_inicial, sr.creado_en
from solicitudes_servicio sr
join perfiles p on sr.cliente_id = p.usuario_id
order by sr.estado, sr.creado_en;

select py.id, p.nombre_completo as cliente,
       py.tipo_pago, py.monto, py.estado_pago, py.fecha_pago
from pagos py
join solicitudes_servicio sr on py.solicitud_id = sr.id
join perfiles p on sr.cliente_id = p.usuario_id
order by py.fecha_pago desc;

select sr.id, p.nombre_completo as cliente,
       sr.estado, sr.descripcion_inicial, sr.creado_en
from solicitudes_servicio sr
join perfiles p on sr.cliente_id = p.usuario_id
order by sr.creado_en desc;


select p.nombre_completo as cliente,
       count(sr.id) as total_solicitudes
from solicitudes_servicio sr
join perfiles p on sr.cliente_id = p.usuario_id
group by sr.cliente_id, p.nombre_completo
order by total_solicitudes desc;


select sr.id, p.nombre_completo as cliente,
       sr.estado, sr.descripcion_inicial, sr.creado_en
from solicitudes_servicio sr
join perfiles p on sr.cliente_id = p.usuario_id
where sr.cliente_id = (
    select cliente_id
    from solicitudes_servicio
    group by cliente_id
    order by count(id) desc
    limit 1
)
order by sr.creado_en;


select p.nombre_completo as tecnico,
       round(avg(r.puntuacion), 2) as promedio_tecnico
from reseñas r
join solicitudes_servicio sr on r.solicitud_id = sr.id
join perfiles p on sr.tecnico_id = p.usuario_id
group by sr.tecnico_id, p.nombre_completo
having avg(r.puntuacion) > (
    select avg(puntuacion) from reseñas
)
order by promedio_tecnico desc;
