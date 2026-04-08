import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFileAlt,
  FaUserTie,
  FaHistory,
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import clientService from '../services/clientService';
import './Dashboard.css';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('requests');
  const [myRequests, setMyRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    availableTime: 'Flexible'
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'requests') {
        const res = await clientService.getMyRequests();
        setMyRequests(res.data);
      } else if (activeTab === 'technicians') {
        const res = await clientService.searchTechnicians('', '');
        setTechnicians(res.data);
      } else if (activeTab === 'history') {
        const res = await clientService.getHistory();
        setHistory(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      await clientService.createServiceRequest(formData);
      setFormData({ description: '', location: '', availableTime: 'Flexible' });
      setShowNewRequest(false);
      loadData();
      alert('Solicitud creada exitosamente');
    } catch (err) {
      alert(err.response?.data?.error || 'Error creando solicitud');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="brand-panel">
          <div className="logo-wrapper">
            <img src="/logo.png" alt="PlomApp" className="dashboard-logo" />
          </div>
          <div>
            <span className="dashboard-title">Cliente</span>
            <span className="dashboard-subtitle">Gestiona tus solicitudes, técnicos y el historial desde un panel claro y enfocado.</span>
          </div>
        </div>
        <div className="user-info">
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'requests' ? 'active' : ''}
            onClick={() => setActiveTab('requests')}
          >
            <FaFileAlt /> Mis Solicitudes
          </button>
          <button 
            className={activeTab === 'technicians' ? 'active' : ''}
            onClick={() => setActiveTab('technicians')}
          >
            <FaUserTie /> Buscar Técnicos
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            <FaHistory /> Historial
          </button>
        </nav>

        <main className="dashboard-content">
          {/* Solicitudes */}
          {activeTab === 'requests' && (
            <section>
              <div className="section-header">
                <h2>Mis Solicitudes de Servicio</h2>
                <button 
                  className="btn-primary"
                  onClick={() => setShowNewRequest(true)}
                >
                  + Nueva Solicitud
                </button>
              </div>

              {showNewRequest && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>Crear Nueva Solicitud</h3>
                    <form onSubmit={handleCreateRequest}>
                      <div className="form-group">
                        <label>Descripción del Problema</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          required
                          placeholder="Describe el problema..."
                          rows="4"
                        />
                      </div>

                      <div className="form-group">
                        <label>Ubicación/Dirección</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          required
                          placeholder="Tu dirección"
                        />
                      </div>

                      <div className="form-group">
                        <label>Disponibilidad</label>
                        <select
                          value={formData.availableTime}
                          onChange={(e) => setFormData({...formData, availableTime: e.target.value})}
                        >
                          <option>Flexible</option>
                          <option>Mañana (8-12)</option>
                          <option>Tarde (12-17)</option>
                          <option>Noche (17-21)</option>
                        </select>
                      </div>

                      <div className="form-buttons">
                        <button type="submit" className="btn-primary">Crear</button>
                        <button 
                          type="button" 
                          className="btn-secondary"
                          onClick={() => setShowNewRequest(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="requests-grid">
                {myRequests.map(req => (
                  <div key={req.id} className="request-card">
                    <div className="card-header">
                      <h4>{req.description}</h4>
                      <span className={`status status-${req.status}`}>{req.status}</span>
                    </div>
                    <p><strong><FaMapMarkerAlt style={{marginRight: '0.5rem'}} /> Ubicación:</strong> {req.location}</p>
                    <p><strong>🗐 Disponibilidad:</strong> {req.availableTime}</p>
                    {req.technicianName && (
                      <p><strong><FaUserTie style={{marginRight: '0.5rem'}} /> Técnico:</strong> {req.technicianName}</p>
                    )}
                    <p><strong>📅 Fecha:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Técnicos */}
          {activeTab === 'technicians' && (
            <section>
              <h2>Técnicos Disponibles</h2>
              <div className="technicians-grid">
                {technicians.map(tech => (
                  <div key={tech.id} className="tech-card">
                    <h4>{tech.name}</h4>
                    <p><strong>Técnica:</strong> {tech.specialty}</p>
                    <p><strong><FaStar style={{color: '#fbbf24', marginRight: '0.5rem'}} /> Calificación:</strong> {tech.rating}</p>
                    <p><strong>Reseñas:</strong> {tech.reviews}</p>
                    <p><strong><FaMapMarkerAlt style={{marginRight: '0.5rem'}} /> Zona:</strong> {tech.location}</p>
                    <p><strong>Teléfono:</strong> {tech.phone}</p>
                    <div className={`availability ${tech.available ? 'available' : 'unavailable'}`}>
                      {tech.available ? <><FaCheck /> Disponible</> : <><FaTimes /> No disponible</>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Historial */}
          {activeTab === 'history' && (
            <section>
              <h2>Historial de Servicios</h2>
              <div className="history-grid">
                {history.map(item => (
                  <div key={item.id} className="history-card">
                    <h4>{item.description}</h4>
                    <p><strong><FaUserTie style={{marginRight: '0.5rem'}} /> Técnico:</strong> {item.technicianName}</p>
                    <p><strong><FaStar style={{color: '#fbbf24', marginRight: '0.5rem'}} /> Calificación:</strong> {item.rating || 'Sin calificar'}</p>
                    <p><strong>Comentario:</strong> {item.comment || 'Sin comentarios'}</p>
                    <p><strong>Fecha:</strong> {new Date(item.completedDate).toLocaleDateString()}</p>
                  </div>
                ))}}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
