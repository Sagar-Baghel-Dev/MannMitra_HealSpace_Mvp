import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./App.css";
import { useTranslation } from 'react-i18next';

export default function StudentProfileCard({ student }) {
  const { t } = useTranslation();
  if (!student) return null;
  return (
    <div className="student-profile-card">
      <div className="profile-img-section">
        {student.profileImg ? (
          <img src={student.profileImg} alt={t('Profile')} className="profile-img" />
        ) : (
          <FaUserCircle className="profile-img default-profile-icon" />
        )}
      </div>
      <div className="profile-info-section">
        <h3 className="profile-name">{student.name}</h3>
        <div className="profile-row"><span className="profile-label">{t('Course')}:</span> {student.course}</div>
        <div className="profile-row"><span className="profile-label">{t('Year')}:</span> {student.year}</div>
        <div className="profile-row"><span className="profile-label">{t('Risk Score')}:</span> <span className={`status-badge status-${student.status.toLowerCase()}`}>{student.risk} ({t(student.status)})</span></div>
        <div className="profile-row"><span className="profile-label">{t('Email')}:</span> {student.email}</div>
        <div className="profile-row"><span className="profile-label">{t('Phone')}:</span> {student.phone}</div>
        <div className="profile-row"><span className="profile-label">{t('College')}:</span> {student.college}</div>
      </div>
    </div>
  );
}
