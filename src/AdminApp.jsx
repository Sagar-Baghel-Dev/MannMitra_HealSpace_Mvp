import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// removed duplicate useTranslation import
import './i18n';
import AdminDashboard from './AdminDashboard.jsx';
import AdminLanding from './AdminLanding.jsx';
import RecordsPage from './RecordsPage.jsx';
import StatusPage from './StatusPage.jsx';
import StudentListPage from './StudentListPage.jsx';

import { useTranslation } from 'react-i18next';
function AdminSidebar({ open, onClose, userEmail, onLogout }) {
  const { t } = useTranslation();
  return (
    <div className={`sidebar-overlay${open ? ' open' : ''}`} onClick={onClose}>
      <div className="sidebar-panel" onClick={e => e.stopPropagation()}>
        <button className="sidebar-close" onClick={onClose} title="Close">&times;</button>
        <h2 className="sidebar-title">{t('Profile')}</h2>
        <div className="sidebar-profile">
          <div className="sidebar-field"><span>Email:</span> {userEmail}</div>
          <div className="sidebar-field"><span>{t('Role')}:</span> Admin</div>
          <button className="sidebar-btn logout" onClick={onLogout}>{t('Logout')}</button>
        </div>
      </div>
    </div>
  );
}



export default function AdminApp() {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('healspace-dark-mode');
    return saved === 'true';
  });
  // Sync dark mode with root
  useEffect(() => {
    const root = document.querySelector('.admin-app-root');
    if (darkMode) {
      root?.classList.add('dark-mode');
    } else {
      root?.classList.remove('dark-mode');
    }
    localStorage.setItem('healspace-dark-mode', darkMode);
  }, [darkMode]);

  // Get user email from localStorage
  const userEmail = (() => {
    const user = localStorage.getItem('healspace-user');
    return user ? JSON.parse(user).email : "";
  })();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('healspace-user');
    navigate('/');
    window.location.reload();
  };
  return (
    <div className="admin-app-root">
      <nav className="navbar improved-admin-navbar">
        <div className="navbar-logo"><Link to="/admin" className="admin-navbar-link">HealSpace</Link></div>
        <ul className="navbar-links">
          <li><Link to="/admin" className="admin-navbar-link">{t('Home')}</Link></li>
          <li><Link to="/admin/records" className="admin-navbar-link">{t('Records')}</Link></li>
          <li><Link to="/admin/status" className="admin-navbar-link">{t('Status')}</Link></li>
          <li><Link to="/admin/student" className="admin-navbar-link">{t('Student')}</Link></li>
        </ul>
        <div className="navbar-actions">
          <button className="icon-btn" title={t('Translate')} onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ur' : 'en')}>🌐</button>
          <button className="icon-btn" title={t('Dark/Light Mode')} onClick={() => setDarkMode(m => !m)}>{darkMode ? '🌙' : '🌓'}</button>
          <button className="icon-btn" title={t('Profile')} onClick={()=>setSidebarOpen(true)}>👤</button>
        </div>
      </nav>
      <AdminSidebar open={sidebarOpen} onClose={()=>setSidebarOpen(false)} userEmail={userEmail} onLogout={handleLogout} />
      <Routes>
        <Route path="/admin" element={<AdminLanding />} />
        <Route path="/admin/records" element={<RecordsPage />} />
        <Route path="/admin/status" element={<StatusPage />} />
        <Route path="/admin/student" element={<StudentListPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
