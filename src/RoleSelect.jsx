import React from "react";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function RoleSelect({ onSelect }) {
  const { t } = useTranslation();
  return (
    <div className="role-select-page role-select-centered">
      <div className="role-select-card role-select-card-modern">
        <h2 className="role-select-title">{t('Choose Your Role')}</h2>
        <div className="role-select-options role-select-options-modern">
          <button className="role-btn role-btn-modern" onClick={() => onSelect('student')}>
            <FaUserGraduate style={{fontSize:'2.2rem',marginBottom:'0.5rem',color:'#2E8B57'}} />
            <span>{t('Student Dashboard')}</span>
          </button>
          <button className="role-btn role-btn-modern" onClick={() => onSelect('admin')}>
            <FaUserShield style={{fontSize:'2.2rem',marginBottom:'0.5rem',color:'#2E8B57'}} />
            <span>{t('Admin Dashboard')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
