import React from "react";
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();
  const featureCards = [
    {
      icon: '💬',
      title: t('The SukoonSaathi'),
      desc: t('An AI-powered first-aid and chatbot for mental health care, offering 24/7 support, coping strategies, and a safe space for higher education students.')
    },
    {
      icon: '📝',
      title: t('Self-Assessment'),
      desc: t('A simple, guided tool that helps students track their mental well-being, identify stress levels, and gain insights for timely support and early-detection.')
    },
    {
      icon: '',
      title: t('Community'),
      desc: t('A supportive network connecting students with peers, professional counsellors, institutional help, and government services for holistic care.')
    },
  ];
  const coreFeatures = [
    { icon: '🤖', name: t('AI-Guided First aid') },
    { icon: '🔒', name: t('Confidential Booking') },
    { icon: '📔', name: t('Journals') },
    { icon: '💬', name: t('Peer Support Forum') },
    { icon: '🎮', name: t('Resilience Games') },
    { icon: '📊', name: t('Admin Dashboard') },
    { icon: '🛡️', name: t('Data Privacy') },
    { icon: '🌐', name: t('Bilingual UI') },
  ];
  return (
    <section className="features-page" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.2rem', color: '#2E8B57', fontWeight: 700, marginBottom: '1.5rem' }}>
        {t('Why HealSpace Exists ?')}
      </h2>
      <p style={{ maxWidth: 700, margin: '0 auto 2.5rem', color: '#444', fontSize: '1.15rem' }}>
        {t('In region affected by conflicts, students need more than traditional academuc support. they need tools to heal, grow, and thrive despite of challenging circumstances')}
      </p>
      <div className="feature-cards-row" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
        {featureCards.map((card, idx) => (
          <div key={idx} className="feature-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(46,139,87,0.08)', width: 260, padding: '2rem 1.2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 270 }}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>{card.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1.18rem', color: '#2E8B57', marginBottom: 10 }}>{card.title}</div>
            <div style={{ color: '#444', fontSize: '1.01rem' }}>{card.desc}</div>
          </div>
        ))}
      </div>
      <div className="core-features-section" style={{ marginTop: 40, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#2E8B57', fontWeight: 700, marginBottom: '1.5rem' }}>{t('Core Features')}</h3>
        <div className="core-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.7rem', maxWidth: 1100, margin: '0 auto' }}>
          {coreFeatures.map((f, idx) => (
            <div key={idx} className="core-feature-card" style={{ background: '#f6fef9', borderRadius: 18, padding: '2.1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 130, boxShadow: '0 1px 10px 0 rgba(46,139,87,0.09)' }}>
              <div style={{ fontSize: 38, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, color: '#2E8B57', fontSize: '1.13rem' }}>{f.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
