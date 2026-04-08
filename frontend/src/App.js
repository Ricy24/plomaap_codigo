import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas */}
        <Route
          path="/client/dashboard"
          element={
            <PrivateRoute allowedRoles={['client']}>
              <ClientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/technician/dashboard"
          element={
            <PrivateRoute allowedRoles={['technician']}>
              <TechnicianDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
