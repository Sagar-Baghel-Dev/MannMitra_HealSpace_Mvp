

import './App.css';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Only allow login if credentials match previous user or are new
  const handleSubmit = e => {
    e.preventDefault();
    // Check if user exists in localStorage
    const stored = localStorage.getItem('healspace-user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email && parsed.password === password) {
        onLogin(email, password);
        setEmail("");
        setPassword("");
        setError("");
        return;
      } else if (parsed.email === email) {
        setError("Incorrect password for this email.");
        return;
      }
    }
    // New user or new email, allow login
    onLogin(email, password);
    setEmail("");
    setPassword("");
    setError("");
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div style={{color:'#EF5350',marginBottom:'0.5rem',fontWeight:600}}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

import { useState as useSidebarState } from 'react';
import { useTranslation as useSidebarTranslation } from 'react-i18next';
function Sidebar({ open, onClose, isLoggedIn, onLogin, onLogout, userEmail, userRole }) {
  const { t } = useSidebarTranslation();
  return (
    <div className={`sidebar-overlay${open ? ' open' : ''}`} onClick={onClose}>
      <div className="sidebar-panel" onClick={e => e.stopPropagation()}>
        <button className="sidebar-close" onClick={onClose} title={t('Close')}>&times;</button>
        <h2 className="sidebar-title">{t('Profile')}</h2>
        {isLoggedIn ? (
          <div className="sidebar-profile">
            <div className="sidebar-field"><span>{t('Email')}:</span> {userEmail}</div>
            <div className="sidebar-field"><span>{t('Role')}:</span> {userRole === 'admin' ? t('Admin') : t('Student')}</div>
            <button className="sidebar-btn logout" onClick={onLogout}>{t('Logout')}</button>
          </div>
        ) : (
          <div className="sidebar-profile">
            <div className="sidebar-field"><span>{t('Please log in to view your profile.')}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

import Features from './Features.jsx';
import Assessment from './Assessment.jsx';
import Relaxation from './Relaxation.jsx';
import BreathingExercise from './BreathingExercise.jsx';
import MusicTherapy from './MusicTherapy.jsx';
import Journals from './Journals.jsx';
import Articles from './Articles.jsx';
import Videos from './Videos.jsx';
import Games from './Games.jsx';
import PeerSupport from './PeerSupport.jsx';
import Appointment from './Appointment.jsx';
import SukoonSaathi from './SukoonSaathi.jsx';
import RoleSelect from './RoleSelect.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminLanding from './AdminLanding.jsx';
import AdminApp from './AdminApp.jsx';
function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <main className="landing-content">
      <h1 className="landing-heading">{t('Heal, Grow, Thrive...')}</h1>
      <p className="landing-subtitle">{t('A Digital Trauma Recovery & Resilience Platform')}</p>
      <div className="cta-buttons">
        <button className="cta cta-primary" onClick={() => navigate('/assessment')}>{t('Start Assessment')}</button>
        <button className="cta cta-secondary" onClick={() => navigate('/features')}>{t('Explore HealSpace')}</button>
      </div>
    </main>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  // Dark mode state and effect
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('healspace-dark-mode');
    return saved === 'true';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // On mount, check localStorage for user and set state
  useEffect(() => {
    const user = localStorage.getItem('healspace-user');
    if (user) {
      const parsed = JSON.parse(user);
      setIsLoggedIn(true);
      setUserEmail(parsed.email);
      setUserPassword(parsed.password);
      setRole(parsed.role || "");
    } else {
      setIsLoggedIn(false);
      setUserEmail("");
      setUserPassword("");
      setRole("");
    }
  }, []);

  useEffect(() => {
    const root = document.querySelector('.healspace-root');
    if (darkMode) {
      root?.classList.add('dark-mode');
    } else {
      root?.classList.remove('dark-mode');
    }
    localStorage.setItem('healspace-dark-mode', darkMode);
  }, [darkMode]);

  // Store credentials and role in localStorage
  const handleLogin = (email, password) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserPassword(password);
    setRole("");
    localStorage.setItem('healspace-user', JSON.stringify({ email, password, role: "" }));
    if (location.pathname === "/dashboard") {
      navigate("/dashboard");
    }
  };
  // Set role and persist
  const handleRoleSelect = (r) => {
    setRole(r);
    const user = localStorage.getItem('healspace-user');
    if (user) {
      const parsed = JSON.parse(user);
      parsed.role = r;
      localStorage.setItem('healspace-user', JSON.stringify(parsed));
    }
    if (r === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };
  // Logout clears localStorage
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserPassword("");
    setRole("");
    localStorage.removeItem('healspace-user');
    if (location.pathname === "/dashboard" || location.pathname === "/admin") {
      navigate("/");
    }
  };

  // Role-based dashboard routing
  // If not logged in, always show login page
  // If not logged in, always show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // After login, show role select if not set
  if (isLoggedIn && !role) {
    return <RoleSelect onSelect={handleRoleSelect} />;
  }

  // After login and role selection, show correct app shell
  if (role === 'admin') {
    return <AdminApp />;
  }
  // Student role (or default): show main app
  return (
    <div className="healspace-root">
      <nav className="navbar">
        <div className="navbar-logo"><Link to="/">HealSpace</Link></div>
        <ul className="navbar-links">
          <li><Link to="/">{t('Home')}</Link></li>
          <li><Link to="/features">{t('Features')}</Link></li>
          <li><Link to="/assessment">{t('Assessment')}</Link></li>
          <li><Link to="/relaxation">{t('Relaxation')}</Link></li>
          <li><Link to="/peer-support">{t('Peer Support')}</Link></li>
          <li><Link to="/appointment">{t('Book a Counsellor')}</Link></li>
        </ul>
        <div className="navbar-actions">
          <button className="icon-btn" title={t('Translate')} onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ur' : 'en')}>🌐</button>
          <button className="icon-btn" title={t('Dark/Light Mode')} onClick={() => setDarkMode(m => !m)}>
            {darkMode ? '🌙' : '🌓'}
          </button>
          <button className="icon-btn" title={t('Login/Profile')} onClick={() => setSidebarOpen(true)}>👤</button>
        </div>
      </nav>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} userEmail={userEmail} userRole={role} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/relaxation" element={<Relaxation />} />
        <Route path="/relaxation/breathing" element={<BreathingExercise />} />
        <Route path="/relaxation/music" element={<MusicTherapy />} />
        <Route path="/relaxation/journals" element={<Journals />} />
        <Route path="/relaxation/articles" element={<Articles />} />
        <Route path="/relaxation/videos" element={<Videos />} />
        <Route path="/relaxation/games" element={<Games />} />
        <Route path="/peer-support" element={<PeerSupport />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/chatbot" element={<SukoonSaathi />} />
        <Route path="/dashboard" element={
          isLoggedIn ? (
            <StudentDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        } />
      </Routes>
      {/* Floating Chatbot Button */}
      <Link to="/chatbot" className="chatbot-fab" title={t('Chat with SukoonSaathi')}>💬</Link>
      {/* Floating SOS Button */}
      <a href="tel:112" className="sos-fab" title={t('Emergency SOS')}>SOS</a>
    </div>
  );
}

export default App;
