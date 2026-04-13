import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheck,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaCoins,
  FaStar,
  FaBullseye,
  FaWrench,
} from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <img src="/logo.png" alt="PlomApp" className="logo" />
          <div className="nav-links">
            <Link to="/login" className="btn-login">Inicia Sesión</Link>
            <Link to="/register" className="btn-register">Regístrate</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge"><FaCheck /> Disponible 24/7 en tu zona</div>
          <h2>Soluciona tus problemas de plomería en minutos</h2>
          <p>Desde fugas molestas hasta reparaciones urgentes. Conecta con técnicos certificados sin intermediarios ni sorpresas.</p>
          <div className="hero-buttons">
            <Link to="/register?role=client" className="btn-primary">Necesito un Técnico</Link>
            <Link to="/register?role=technician" className="btn-secondary">Soy Técnico - Ganar Dinero</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2.5K+</span>
              <span className="stat-text">Técnicos verificados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15K+</span>
              <span className="stat-text">Servicios completados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.8 <FaStar style={{ color: '#fbbf24' }} /></span>
              <span className="stat-text">Calificación promedio</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-visual">
            <div className="illustration">
              <div className="pipe-top"></div>
              <div className="pipe-middle"></div>
              <div className="pipe-bottom"></div>
              <div className="wrench"><FaWrench /></div>
            </div>
          </div>
        </div>
      </section>

      {/* For Clients */}
      <section className="for-clients">
        <div className="section-container">
          <div className="section-header">
            <h2>Para Clientes</h2>
            <p>Olvídate de esperar y de pagar de más</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><FaClock /></div>
              <h4>Atención en Minutos</h4>
              <p>Técnicos disponibles cerca de ti. Sin esperas innecesarias.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FaDollarSign /></div>
              <h4>Precio Transparente</h4>
              <p>Conoce el costo antes. Sin cargos ocultos ni sorpresas.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FaCheck /></div>
              <h4>Técnicos Verificados</h4>
              <p>Todos certificados y evaluados por clientes anteriores.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FaMapMarkerAlt /></div>
              <h4>Sigue tu Servicio</h4>
              <p>Rastreo en vivo. Sabe exactamente dónde está el técnico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Technicians */}
      <section className="for-techs">
        <div className="section-container">
          <div className="section-header">
            <h2>Para Técnicos</h2>
            <p>Amplía tu cartera de clientes sin comisiones exageradas</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><FaMobileAlt /></div>
              <h4>Solicitudes Directas</h4>
              <p>Clientes llegan a ti automáticamente. Elige qué trabajos hacer.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FaCoins /></div>
              <h4>Mejor Ganancia</h4>
              <p>Comisión justa. Cobra directo sin intermediarios.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FaStar style={{ color: '#fbbf24' }} /></div>
              <h4>Construye tu Reputación</h4>
              <p>Las calificaciones de clientes te posicionan como favorito.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FaBullseye /></div>
              <h4>Gestiona tu Agenda</h4>
              <p>Controla tus horarios de disponibilidad y especialidades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="how-it-works">
        <div className="section-container">
          <h2>¿Cómo Funciona en 4 Pasos?</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">1</div>
              <h4>Describe tu Problema</h4>
              <p>Cuéntanos qué necesitas reparar y dónde.</p>
              <div className="step-details">
                <small>• Fugas de agua</small>
                <small>• Grifos rotos</small>
                <small>• Destapes</small>
                <small>• Y mucho más...</small>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">2</div>
              <h4>Conectamos un Técnico</h4>
              <p>Encontramos el mejor disponible para ti.</p>
              <div className="step-details">
                <small>• Técnicos con experiencia</small>
                <small>• Especialistas en tu área</small>
                <small>• Alto rating</small>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">3</div>
              <h4>Se Realiza el Servicio</h4>
              <p>Rastreo en vivo de la llegada del técnico.</p>
              <div className="step-details">
                <small>• Chat en la app</small>
                <small>• Ubicación en tiempo real</small>
                <small>• Confirmación al llegar</small>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">4</div>
              <h4>Paga y Califica</h4>
              <p>Seguro, rápido y justo.</p>
              <div className="step-details">
                <small>• Múltiples formas de pago</small>
                <small>• Comprobante inmediato</small>
                <small>• Tu calificación ayuda a otros</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="section-container">
          <h2>¿Por Qué Confían en PlomApp?</h2>
          <div className="trust-cards">
            <div className="trust-card">
              <h4>Seguridad Garantizada</h4>
              <p>Todos los técnicos pasan verificación de antecedentes y validación de credenciales.</p>
            </div>
            <div className="trust-card">
              <h4>Datos Protegidos</h4>
              <p>Encriptación de nivel bancario. Tus datos nunca serán compartidos.</p>
            </div>
            <div className="trust-card">
              <h4>Garantía de Satisfacción</h4>
              <p>No contento? Resolvemos cualquier problema. Tu satisfacción es prioritaria.</p>
            </div>
            <div className="trust-card">
              <h4>Soporte 24/7</h4>
              <p>Nuestro equipo disponible para ayudarte en cualquier momento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a miles que ya resuelven sus problemas con PlomApp</p>
          <div className="cta-buttons">
            <Link to="/register?role=client" className="btn-large btn-primary-large">Buscar Técnico</Link>
            <Link to="/register?role=technician" className="btn-large btn-secondary-large">Convertirme en Técnico</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h5>PlomApp</h5>
            <p>La plataforma moderna para servicios de plomería</p>
          </div>
          <div className="footer-section">
            <h5>Links</h5>
            <a href="#">Sobre Nosotros</a>
            <a href="#">Blog</a>
            <a href="#">Contacto</a>
          </div>
          <div className="footer-section">
            <h5>Legal</h5>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Seguridad</a>
          </div>
          <div className="footer-section">
            <h5>Disponible en</h5>
            <p>iOS • Android • Web</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 PlomApp. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
