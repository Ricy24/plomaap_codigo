const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Datos simulados globales (compartidos con otras rutas)
let allUsers = [
  { id: 1, email: 'admin@plomaap.com', name: 'Admin System', role: 'admin', phone: '1234567890', active: true, createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  { id: 2, email: 'client@plomaap.com', name: 'Juan Cliente', role: 'client', phone: '9876543210', active: true, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
  { id: 3, email: 'tech@plomaap.com', name: 'Carlos Técnico', role: 'technician', phone: '5555555555', active: true, createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
];

let allServiceRequests = [
  { id: 1, clientId: 2, status: 'completed', technicianId: 3, amount: 50000, rating: 5, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  { id: 2, clientId: 2, status: 'completed', technicianId: 3, amount: 75000, rating: 4, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
];

let complaints = [
  { id: 1, userId: 2, subject: 'Servicio lento', description: 'El técnico llegó tarde', status: 'resolved', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }
];

// Obtener todos los usuarios
router.get('/users', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json(allUsers);
});

// Obtener usuarios por rol
router.get('/users/:role', verifyToken, verifyRole(['admin']), (req, res) => {
  const { role } = req.params;
  const filtered = allUsers.filter(u => u.role === role);
  res.json(filtered);
});

// Bloquear usuario
router.post('/users/:id/block', verifyToken, verifyRole(['admin']), (req, res) => {
  const user = allUsers.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  user.active = false;

  res.json({
    message: 'Usuario bloqueado exitosamente',
    user
  });
});

// Desbloquear usuario
router.post('/users/:id/unblock', verifyToken, verifyRole(['admin']), (req, res) => {
  const user = allUsers.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  user.active = true;

  res.json({
    message: 'Usuario desbloqueado exitosamente',
    user
  });
});

// Obtener todas las solicitudes de servicio
router.get('/service-requests', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json(allServiceRequests);
});

// Obtener solicitudes por estado
router.get('/service-requests/:status', verifyToken, verifyRole(['admin']), (req, res) => {
  const { status } = req.params;
  const filtered = allServiceRequests.filter(r => r.status === status);
  res.json(filtered);
});

// Obtener reportes de ingresos
router.get('/reports/income', verifyToken, verifyRole(['admin']), (req, res) => {
  const totalIncome = allServiceRequests.reduce((sum, r) => sum + (r.amount || 0), 0);
  
  const byTechnician = {};
  allServiceRequests.forEach(r => {
    if (!byTechnician[r.technicianId]) {
      byTechnician[r.technicianId] = 0;
    }
    byTechnician[r.technicianId] += r.amount || 0;
  });

  res.json({
    totalIncome,
    byTechnician,
    period: 'last-30-days'
  });
});

// Obtener reportes de servicios completados
router.get('/reports/completed-services', verifyToken, verifyRole(['admin']), (req, res) => {
  const completed = allServiceRequests.filter(r => r.status === 'completed');
  
  const stats = {
    totalCompleted: completed.length,
    averageRating: completed.length > 0 
      ? (completed.reduce((sum, r) => sum + (r.rating || 0), 0) / completed.length).toFixed(1)
      : 0,
    byTechnician: {}
  };

  completed.forEach(r => {
    if (!stats.byTechnician[r.technicianId]) {
      stats.byTechnician[r.technicianId] = 0;
    }
    stats.byTechnician[r.technicianId]++;
  });

  res.json(stats);
});

// Obtener quejas registradas
router.get('/complaints', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json(complaints);
});

// Obtener queja por ID
router.get('/complaints/:id', verifyToken, verifyRole(['admin']), (req, res) => {
  const complaint = complaints.find(c => c.id === parseInt(req.params.id));

  if (!complaint) {
    return res.status(404).json({ error: 'Queja no encontrada' });
  }

  res.json(complaint);
});

// Resolver queja
router.put('/complaints/:id/resolve', verifyToken, verifyRole(['admin']), (req, res) => {
  const { resolution } = req.body;

  const complaint = complaints.find(c => c.id === parseInt(req.params.id));

  if (!complaint) {
    return res.status(404).json({ error: 'Queja no encontrada' });
  }

  complaint.status = 'resolved';
  complaint.resolution = resolution;
  complaint.resolvedAt = new Date();

  res.json({
    message: 'Queja resuelta',
    complaint
  });
});

// Obtener estadísticas generales del sistema
router.get('/dashboard/stats', verifyToken, verifyRole(['admin']), (req, res) => {
  const stats = {
    totalUsers: allUsers.length,
    clients: allUsers.filter(u => u.role === 'client').length,
    technicians: allUsers.filter(u => u.role === 'technician').length,
    activeUsers: allUsers.filter(u => u.active).length,
    totalRequests: allServiceRequests.length,
    completedRequests: allServiceRequests.filter(r => r.status === 'completed').length,
    inProgressRequests: allServiceRequests.filter(r => r.status === 'in-progress').length,
    pendingRequests: allServiceRequests.filter(r => r.status === 'pending').length,
    totalComplaints: complaints.length,
    resolvedComplaints: complaints.filter(c => c.status === 'resolved').length,
    totalIncome: allServiceRequests.reduce((sum, r) => sum + (r.amount || 0), 0)
  };

  res.json(stats);
});

// Exportar datos a JSON
router.get('/export/users', verifyToken, verifyRole(['admin']), (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="users.json"');
  res.setHeader('Content-Type', 'application/json');
  res.json(allUsers);
});

// Exportar solicitudes de servicio
router.get('/export/requests', verifyToken, verifyRole(['admin']), (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="requests.json"');
  res.setHeader('Content-Type', 'application/json');
  res.json(allServiceRequests);
});

module.exports = router;
