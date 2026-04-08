const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Datos simulados de usuarios
let users = [
  {
    id: 1,
    email: 'admin@plomaap.com',
    password: bcrypt.hashSync('admin123', 10),
    name: 'Admin System',
    role: 'admin',
    phone: '1234567890',
    createdAt: new Date()
  },
  {
    id: 2,
    email: 'client@plomaap.com',
    password: bcrypt.hashSync('client123', 10),
    name: 'Juan Cliente',
    role: 'client',
    phone: '9876543210',
    address: 'Calle 123 #456',
    createdAt: new Date()
  },
  {
    id: 3,
    email: 'tech@plomaap.com',
    password: bcrypt.hashSync('tech123', 10),
    name: 'Carlos Técnico',
    role: 'technician',
    phone: '5555555555',
    specialty: 'Plomería',
    rating: 4.8,
    experience: 'Más de 5 años',
    createdAt: new Date()
  }
];

let nextUserId = 4;

// Registro
router.post('/register', (req, res) => {
  const { email, password, name, role, phone, address, specialty } = req.body;

  if (!email || !password || !name || !role || !phone) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'El email ya está registrado' });
  }

  const newUser = {
    id: nextUserId++,
    email,
    password: bcrypt.hashSync(password, 10),
    name,
    role,
    phone,
    address: address || null,
    specialty: specialty || null,
    rating: role === 'technician' ? 0 : null,
    experience: null,
    active: true,
    createdAt: new Date()
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    message: 'Usuario registrado exitosamente',
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      phone: newUser.phone
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  if (!user.active) {
    return res.status(403).json({ error: 'Usuario bloqueado. Contacte al administrador' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone
    }
  });
});

// Obtener perfil del usuario
router.get('/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
    address: user.address,
    specialty: user.specialty,
    rating: user.rating,
    experience: user.experience,
    createdAt: user.createdAt
  });
});

// Cambiar contraseña
router.post('/change-password', verifyToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = users.find(u => u.id === req.user.id);

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    return res.status(401).json({ error: 'Contraseña actual incorrecta' });
  }

  user.password = bcrypt.hashSync(newPassword, 10);

  res.json({ message: 'Contraseña actualizada exitosamente' });
});

// Actualizar perfil
router.put('/profile', verifyToken, (req, res) => {
  const { name, phone, address } = req.body;
  const user = users.find(u => u.id === req.user.id);

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address && user.role === 'client') user.address = address;

  res.json({ message: 'Perfil actualizado', user });
});

module.exports = router;
