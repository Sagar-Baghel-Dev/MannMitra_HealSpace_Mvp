import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function AdminLanding() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('healspace-dark-mode');
    return saved === 'true';
  });

  React.useEffect(() => {
    const root = document.querySelector('.admin-app-root');
    if (darkMode) {
      root?.classList.add('dark-mode');
    } else {
      root?.classList.remove('dark-mode');
    }
    localStorage.setItem('healspace-dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className="admin-landing-page">
      <main className="admin-landing-content">
        <h1 className="landing-heading">{t('Welcome, Admin!')}</h1>
        <p className="landing-subtitle">{t('Manage records, view analytics, and oversee the platform from your dashboard.')}</p>
        <div className="cta-buttons">
          <Link to="/admin/records" className="cta cta-primary">{t('View Records')}</Link>
          <Link to="/admin/status" className="cta cta-secondary">{t('Analytics')}</Link>
        </div>
      </main>
    </div>
  );
}
