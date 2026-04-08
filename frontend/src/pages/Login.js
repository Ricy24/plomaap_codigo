import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('admin@plomaap.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirigir según rol
      const role = response.data.user.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'technician') {
        navigate('/technician/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <img src="/logo.png" alt="PlomApp" className="auth-logo" />
        <h2>Bienvenido de vuelta</h2>
        <p className="auth-subtitle">Accede a tu cuenta para gestionar solicitudes de plomería</p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="divider">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>


      </div>
    </div>
  );
};

export default Login;
