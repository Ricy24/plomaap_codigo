import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
} from 'react-icons/fa';
import technicianService from '../services/technicianService';
import './Dashboard.css';

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'pending') {
        const res = await technicianService.getPendingRequests();
        setPendingRequests(res.data);
      } else if (activeTab === 'completed') {
        const res = await technicianService.getCompletedRequests();
        setCompletedRequests(res.data);
      } else if (activeTab === 'profile') {
        const res = await technicianService.getProfile();
        setProfile(res.data);
        const ratingsRes = await technicianService.getRatings();
        setRatings(ratingsRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await technicianService.updateRequestStatus(requestId, newStatus);
      alert(`Estado actualizado a: ${newStatus}`);
      loadData();
    } catch (err) {
      alert(err.response?.data?.error || 'Error actualizando estado');
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
            <span className="dashboard-title">Técnico</span>
            <span className="dashboard-subtitle">Administra trabajos, estados y tu perfil con una interfaz moderna y azulada.</span>
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
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pendientes
          </button>
          <button 
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}
          >
            <FaCheckCircle /> Completados
          </button>
          <button 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            👤 Mi Perfil
          </button>
        </nav>

        <main className="dashboard-content">
          {/* Solicitudes Pendientes */}
          {activeTab === 'pending' && (
            <section>
              <h2>Solicitudes Pendientes</h2>
              {pendingRequests.length === 0 ? (
                <p className="empty-message">No hay solicitudes pendientes</p>
              ) : (
                <div className="requests-grid">
                  {pendingRequests.map(req => (
                    <div key={req.id} className="request-card">
                      <div className="card-header">
                        <h4>{req.description}</h4>
                        <span className="status status-pending">Pendiente</span>
                      </div>
                      <p><strong>Cliente:</strong> {req.clientName}</p>
                      <p><strong><FaMapMarkerAlt style={{marginRight: '0.5rem'}} /> Ubicación:</strong> {req.location}</p>
                      <p><strong>Teléfono:</strong> {req.clientPhone}</p>
                      <p><strong>Fecha:</strong> {new Date(req.assignedDate).toLocaleDateString()}</p>
                      
                      <div className="status-buttons">
                        <button
                          className="btn-primary-small"
                          onClick={() => handleStatusUpdate(req.id, 'in-progress')}
                        >
                          Comenzar
                        </button>
                        <button
                          className="btn-secondary-small"
                          onClick={() => handleStatusUpdate(req.id, 'completed')}
                        >
                          Completar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Solicitudes Completadas */}
          {activeTab === 'completed' && (
            <section>
              <h2>Servicios Completados</h2>
              {completedRequests.length === 0 ? (
                <p className="empty-message">No hay servicios completados</p>
              ) : (
                <div className="requests-grid">
                  {completedRequests.map(req => (
                    <div key={req.id} className="request-card completed">
                      <div className="card-header">
                        <h4>{req.description}</h4>
                        <span className="status status-completed">Completado</span>
                      </div>
                      <p><strong>Cliente:</strong> {req.clientName}</p>
                      <p><strong><FaMapMarkerAlt style={{marginRight: '0.5rem'}} /> Ubicación:</strong> {req.location}</p>
                      {req.clientRating && (
                        <p><strong><FaStar style={{color: '#fbbf24', marginRight: '0.5rem'}} /> Calificación del Cliente:</strong> {req.clientRating}</p>
                      )}
                      <p><strong><FaCheck style={{marginRight: '0.5rem'}} /> Completado:</strong> {new Date(req.completedDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Perfil */}
          {activeTab === 'profile' && profile && (
            <section>
              <h2>Mi Perfil</h2>
              <div className="profile-card">
                <div className="profile-info">
                  <h3>{profile.name}</h3>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Teléfono:</strong> {profile.phone}</p>
                  <p><strong>Especialidad:</strong> {profile.specialty}</p>
                  <p><strong><FaStar style={{color: '#fbbf24', marginRight: '0.5rem'}} /> Calificación Promedio:</strong> {profile.rating}</p>
                  <p><strong>Servicios Completados:</strong> {profile.completedServices}</p>
                  <p><strong>Total de Reseñas:</strong> {profile.totalReviews}</p>
                </div>

                {ratings && (
                  <div className="ratings-section">
                    <h3>Mis Calificaciones</h3>
                    <p className="rating-average">
                      <strong>Promedio:</strong> <span className="rating-number">{ratings.averageRating}</span> <FaStar style={{color: '#fbbf24'}} />
                    </p>
                    <p className="total-reviews">Total de reseñas: {ratings.totalReviews}</p>
                    
                    {ratings.ratings.length > 0 && (
                      <div className="reviews-list">
                        {ratings.ratings.map((review, idx) => (
                          <div key={idx} className="review-item">
                            <p><strong>{review.clientName}</strong></p>
                            <p><FaStar style={{color: '#fbbf24', marginRight: '0.5rem'}} />{review.rating} - {new Date(review.date).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
