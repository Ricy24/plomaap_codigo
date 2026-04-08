import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChartBar,
  FaUsers,
  FaClipboard,
  FaExclamationTriangle,
  FaWrench,
  FaCheck,
  FaStar,
} from 'react-icons/fa';
import adminService from '../services/adminService';
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'stats') {
        const res = await adminService.getDashboardStats();
        setStats(res.data);
      } else if (activeTab === 'users') {
        const res = await adminService.getUsers();
        setUsers(res.data);
      } else if (activeTab === 'requests') {
        const res = await adminService.getServiceRequests();
        setRequests(res.data);
      } else if (activeTab === 'complaints') {
        const res = await adminService.getComplaints();
        setComplaints(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas bloquear este usuario?')) {
      try {
        await adminService.blockUser(userId);
        alert('Usuario bloqueado');
        loadData();
      } catch (err) {
        alert(err.response?.data?.error || 'Error bloqueando usuario');
      }
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await adminService.unblockUser(userId);
      alert('Usuario desbloqueado');
      loadData();
    } catch (err) {
      alert(err.response?.data?.error || 'Error desbloqueando usuario');
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      await adminService.resolveComplaint(complaintId, 'Resuelta por admin');
      alert('Queja resuelta');
      loadData();
    } catch (err) {
      alert(err.response?.data?.error || 'Error resolviendo queja');
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
        <img src="/logo.png" alt="PlomApp" className="dashboard-logo" />
        <span className="dashboard-title">Administrador</span>
        <div className="user-info">
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            <FaChartBar /> Dashboard
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Usuarios
          </button>
          <button 
            className={activeTab === 'requests' ? 'active' : ''}
            onClick={() => setActiveTab('requests')}
          >
            <FaClipboard /> Solicitudes
          </button>
          <button 
            className={activeTab === 'complaints' ? 'active' : ''}
            onClick={() => setActiveTab('complaints')}
          >
            <FaExclamationTriangle /> Quejas
          </button>
        </nav>

        <main className="dashboard-content">
          {/* Stats */}
          {activeTab === 'stats' && stats && (
            <section>
              <h2>Dashboard del Sistema</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon"><FaUsers /></div>
                  <div className="stat-value">{stats.totalUsers}</div>
                  <div className="stat-label">Usuarios Totales</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">😊</div>
                  <div className="stat-value">{stats.clients}</div>
                  <div className="stat-label">Clientes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon"><FaWrench /></div>
                  <div className="stat-value">{stats.technicians}</div>
                  <div className="stat-label">Técnicos</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon"><FaCheck /></div>
                  <div className="stat-value">{stats.activeUsers}</div>
                  <div className="stat-label">Usuarios Activos</div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon"><FaClipboard /></div>
                  <div className="stat-value">{stats.totalRequests}</div>
                  <div className="stat-label">Total de Solicitudes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon"><FaCheck /></div>
                  <div className="stat-value">{stats.completedRequests}</div>
                  <div className="stat-label">Completadas</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-value">{stats.pendingRequests}</div>
                  <div className="stat-label">Pendientes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-value">$ {stats.totalIncome}</div>
                  <div className="stat-label">Ingresos Totales</div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">⚠️</div>
                  <div className="stat-value">{stats.totalComplaints}</div>
                  <div className="stat-label">Total de Quejas</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✓</div>
                  <div className="stat-value">{stats.resolvedComplaints}</div>
                  <div className="stat-label">Quejas Resueltas</div>
                </div>
              </div>
            </section>
          )}

          {/* Usuarios */}
          {activeTab === 'users' && (
            <section>
              <h2>Gestión de Usuarios</h2>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Teléfono</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                        <td>{u.phone}</td>
                        <td>
                          <span className={`status ${u.active ? 'active' : 'inactive'}`}>
                            {u.active ? 'Activo' : 'Bloqueado'}
                          </span>
                        </td>
                        <td>
                          {u.active ? (
                            <button 
                              className="btn-danger-small"
                              onClick={() => handleBlockUser(u.id)}
                            >
                              Bloquear
                            </button>
                          ) : (
                            <button 
                              className="btn-success-small"
                              onClick={() => handleUnblockUser(u.id)}
                            >
                              Desbloquear
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Solicitudes */}
          {activeTab === 'requests' && (
            <section>
              <h2>Solicitudes de Servicio</h2>
              <div className="requests-count">
                <p>Total de solicitudes: <strong>{requests.length}</strong></p>
              </div>
              <div className="requests-list">
                {requests.map(req => (
                  <div key={req.id} className="request-item">
                    <div>
                      <h4>ID: {req.id}</h4>
                      <p><strong>Estado:</strong> <span className={`status-badge status-${req.status}`}>{req.status}</span></p>
                      <p><strong>Monto:</strong> $ {req.amount}</p>
                      {req.rating && <p><strong><FaStar style={{color: '#fbbf24', marginRight: '0.5rem'}} /> Calificación:</strong> {req.rating}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quejas */}
          {activeTab === 'complaints' && (
            <section>
              <h2>Gestión de Quejas</h2>
              {complaints.length === 0 ? (
                <p className="empty-message">No hay quejas registradas</p>
              ) : (
                <div className="complaints-list">
                  {complaints.map(comp => (
                    <div key={comp.id} className={`complaint-card ${comp.status}`}>
                      <div className="complaint-header">
                        <h4>{comp.subject}</h4>
                        <span className={`status status-${comp.status}`}>{comp.status}</span>
                      </div>
                      <p><strong>Descripción:</strong> {comp.description}</p>
                      <p><strong>Usuario:</strong> ID {comp.userId}</p>
                      <p><strong>Fecha:</strong> {new Date(comp.createdAt).toLocaleDateString()}</p>
                      
                      {comp.status !== 'resolved' && (
                        <button 
                          className="btn-primary-small"
                          onClick={() => handleResolveComplaint(comp.id)}
                        >
                          Marcar como Resuelto
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
