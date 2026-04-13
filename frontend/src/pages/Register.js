import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css';

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'client';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: defaultRole,
    address: defaultRole === 'client' ? '' : undefined,
    specialty: defaultRole === 'technician' ? '' : undefined
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const dataToSend = { ...formData };
      delete dataToSend.confirmPassword;

      const response = await authService.register(dataToSend);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setSuccess('¡Registro exitoso!');
      setTimeout(() => {
        navigate(formData.role === 'admin' ? '/admin/dashboard' : 
                 formData.role === 'technician' ? '/technician/dashboard' : 
                 '/client/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <img src="/logo.png" alt="PlomApp" className="auth-logo" />
        <h2>Crear Cuenta</h2>
        <p className="auth-subtitle">Únete a PlomApp y resuelve tus problemas de plomería</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label>Teléfono de Contacto</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Ej: 3001234567"
            />
          </div>

          <div className="form-group">
            <label>Selecciona tu perfil</label>
            <div className="role-selector">
              <div className={`role-option ${formData.role === 'client' ? 'selected' : ''}`} onClick={() => setFormData(prev => ({...prev, role: 'client'}))}>
                <label>
                  <input 
                    type="radio"
                    name="role" 
                    value="client" 
                    checked={formData.role === 'client'}
                    onChange={handleChange}
                  />
                  Soy Cliente
                </label>
                <small>Buscar servicios</small>
              </div>
              <div className={`role-option ${formData.role === 'technician' ? 'selected' : ''}`} onClick={() => setFormData(prev => ({...prev, role: 'technician'}))}>
                <label>
                  <input 
                    type="radio"
                    name="role" 
                    value="technician" 
                    checked={formData.role === 'technician'}
                    onChange={handleChange}
                  />
                  Soy Técnico
                </label>
                <small>Ofrecer servicios</small>
              </div>
            </div>
          </div>

          {formData.role === 'client' && (
            <div className="form-group">
              <label>Dirección de Residencia</label>
              <input 
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej: Calle Principal 123, Apartamento 4B"
              />
            </div>
          )}

          {formData.role === 'technician' && (
            <div className="form-group">
              <label>Área de Especialización</label>
              <select name="specialty" value={formData.specialty || ''} onChange={handleChange} required >
                <option value="">Selecciona tu especialidad</option>
                <option value="Plomería">Plomería General</option>
                <option value="Electricidad">Electricidad</option>
                <option value="Gas">Sistemas de Gas</option>
                <option value="Reparaciones Generales">Reparaciones Generales</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repite tu contraseña"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="divider">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
