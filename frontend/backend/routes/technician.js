const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Datos simulados
let technicianRequests = [
  {
    id: 1,
    technicianId: 3,
    clientName: 'Juan Cliente',
    clientPhone: '9876543210',
    description: 'Fuga en la cocina',
    location: 'Calle 123 #456',
    status: 'completed',
    assignedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    clientRating: 5
  }
];

let technicianAvailability = [
  {
    technicianId: 3,
    monday: { start: '08:00', end: '17:00', available: true },
    tuesday: { start: '08:00', end: '17:00', available: true },
    wednesday: { start: '08:00', end: '17:00', available: true },
    thursday: { start: '08:00', end: '17:00', available: true },
    friday: { start: '08:00', end: '17:00', available: true },
    saturday: { start: '09:00', end: '14:00', available: false },
    sunday: { start: null, end: null, available: false }
  }
];

// Obtener solicitudes asignadas al técnico
router.get('/my-requests', verifyToken, verifyRole(['technician']), (req, res) => {
  const requests = technicianRequests.filter(r => r.technicianId === req.user.id);
  res.json(requests);
});

// Obtener solicitudes pendientes
router.get('/pending-requests', verifyToken, verifyRole(['technician']), (req, res) => {
  const pending = technicianRequests.filter(r => 
    r.technicianId === req.user.id && r.status === 'pending'
  );
  res.json(pending);
});

// Obtener historial de solicitudes completadas
router.get('/completed-requests', verifyToken, verifyRole(['technician']), (req, res) => {
  const completed = technicianRequests.filter(r => 
    r.technicianId === req.user.id && r.status === 'completed'
  );
  res.json(completed);
});

// Actualizar estado de solicitud
router.put('/request/:id/status', verifyToken, verifyRole(['technician']), (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'in-progress', 'completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  const request = technicianRequests.find(r => 
    r.id === parseInt(req.params.id) && r.technicianId === req.user.id
  );

  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  request.status = status;

  if (status === 'completed') {
    request.completedDate = new Date();
  }

  res.json({
    message: `Estado actualizado a ${status}`,
    request
  });
});

// Obtener disponibilidad del técnico
router.get('/availability', verifyToken, verifyRole(['technician']), (req, res) => {
  const availability = technicianAvailability.find(a => a.technicianId === req.user.id);

  if (!availability) {
    return res.status(404).json({ error: 'Disponibilidad no encontrada' });
  }

  res.json(availability);
});

// Actualizar disponibilidad
router.put('/availability', verifyToken, verifyRole(['technician']), (req, res) => {
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

  let availability = technicianAvailability.find(a => a.technicianId === req.user.id);

  if (!availability) {
    availability = { technicianId: req.user.id };
    technicianAvailability.push(availability);
  }

  if (monday) availability.monday = monday;
  if (tuesday) availability.tuesday = tuesday;
  if (wednesday) availability.wednesday = wednesday;
  if (thursday) availability.thursday = thursday;
  if (friday) availability.friday = friday;
  if (saturday) availability.saturday = saturday;
  if (sunday) availability.sunday = sunday;

  res.json({
    message: 'Disponibilidad actualizada',
    availability
  });
});

// Obtener perfil del técnico
router.get('/profile', verifyToken, verifyRole(['technician']), (req, res) => {
  const technicianProfile = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    specialty: 'Plomería',
    experience: 'Más de 5 años',
    rating: 4.8,
    completedServices: technicianRequests.filter(r => 
      r.technicianId === req.user.id && r.status === 'completed'
    ).length,
    totalReviews: 42,
    profileComplete: true
  };

  res.json(technicianProfile);
});

// Obtener calificaciones y reseñas
router.get('/ratings', verifyToken, verifyRole(['technician']), (req, res) => {
  const completedRequests = technicianRequests.filter(r => 
    r.technicianId === req.user.id && r.status === 'completed' && r.clientRating
  );

  const ratings = completedRequests.map(r => ({
    clientName: r.clientName,
    rating: r.clientRating,
    date: r.completedDate
  }));

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  res.json({
    averageRating,
    totalReviews: ratings.length,
    ratings
  });
});

module.exports = router;
