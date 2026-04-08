const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Datos simulados
let serviceRequests = [
  {
    id: 1,
    clientId: 2,
    description: 'Fuga en la cocina',
    location: 'Calle 123 #456',
    status: 'completed',
    technicianId: 3,
    technicianName: 'Carlos Técnico',
    rating: 5,
    comment: 'Excelente servicio',
    requestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
  }
];

let technicians = [
  {
    id: 3,
    name: 'Carlos Técnico',
    specialty: 'Plomería',
    rating: 4.8,
    experience: 'Más de 5 años',
    location: 'Zona Norte',
    phone: '5555555555',
    available: true,
    reviews: 42
  },
  {
    id: 4,
    name: 'María Técnica',
    specialty: 'Electricidad',
    rating: 4.9,
    experience: 'Más de 8 años',
    location: 'Centro',
    phone: '6666666666',
    available: true,
    reviews: 58
  }
];

let nextRequestId = 2;

// Crear solicitud de servicio
router.post('/service-request', verifyToken, verifyRole(['client']), (req, res) => {
  const { description, location, availableTime } = req.body;

  if (!description || !location) {
    return res.status(400).json({ error: 'Descripción y ubicación requeridas' });
  }

  const newRequest = {
    id: nextRequestId++,
    clientId: req.user.id,
    description,
    location,
    availableTime: availableTime || 'Flexible',
    status: 'pending',
    technicianId: null,
    technicianName: null,
    rating: null,
    comment: null,
    requestDate: new Date()
  };

  serviceRequests.push(newRequest);

  res.status(201).json({
    message: 'Solicitud de servicio creada',
    request: newRequest
  });
});

// Obtener solicitudes del cliente
router.get('/my-requests', verifyToken, verifyRole(['client']), (req, res) => {
  const userRequests = serviceRequests.filter(r => r.clientId === req.user.id);
  res.json(userRequests);
});

// Obtener historial de servicios completados
router.get('/history', verifyToken, verifyRole(['client']), (req, res) => {
  const completedRequests = serviceRequests.filter(
    r => r.clientId === req.user.id && r.status === 'completed'
  );
  res.json(completedRequests);
});

// Buscar técnicos disponibles
router.get('/search-technicians', verifyToken, verifyRole(['client']), (req, res) => {
  const { specialty, location } = req.query;

  let filtered = technicians.filter(t => t.available);

  if (specialty) {
    filtered = filtered.filter(t => 
      t.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  if (location) {
    filtered = filtered.filter(t =>
      t.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.json(filtered);
});

// Obtener detalles de un técnico
router.get('/technician/:id', verifyToken, verifyRole(['client']), (req, res) => {
  const technician = technicians.find(t => t.id === parseInt(req.params.id));

  if (!technician) {
    return res.status(404).json({ error: 'Técnico no encontrado' });
  }

  res.json(technician);
});

// Asignar técnico a solicitud
router.post('/assign-technician', verifyToken, verifyRole(['client']), (req, res) => {
  const { requestId, technicianId } = req.body;

  const request = serviceRequests.find(r => r.id === requestId && r.clientId === req.user.id);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  const technician = technicians.find(t => t.id === technicianId);
  if (!technician) {
    return res.status(404).json({ error: 'Técnico no encontrado' });
  }

  request.technicianId = technicianId;
  request.technicianName = technician.name;
  request.status = 'assigned';

  res.json({
    message: 'Técnico asignado exitosamente',
    request
  });
});

// Calificar servicio
router.post('/rate-service', verifyToken, verifyRole(['client']), (req, res) => {
  const { requestId, rating, comment } = req.body;

  const request = serviceRequests.find(r => r.id === requestId && r.clientId === req.user.id);

  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  request.rating = rating;
  request.comment = comment;
  request.status = 'completed';

  res.json({
    message: 'Servicio calificado',
    request
  });
});

// Cancelar solicitud
router.post('/cancel-request/:id', verifyToken, verifyRole(['client']), (req, res) => {
  const request = serviceRequests.find(r => r.id === parseInt(req.params.id) && r.clientId === req.user.id);

  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  if (request.status !== 'pending' && request.status !== 'assigned') {
    return res.status(400).json({ error: 'No se puede cancelar este tipo de solicitud' });
  }

  request.status = 'cancelled';

  res.json({
    message: 'Solicitud cancelada',
    request
  });
});

module.exports = router;
