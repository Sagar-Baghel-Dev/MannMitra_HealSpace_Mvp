import React from "react";
import { FaUserGraduate, FaUserTie, FaUserMd } from "react-icons/fa";
import "./App.css";
import { useTranslation } from 'react-i18next';

export default function RecordsPage() {
  const { t } = useTranslation();
  return (
    <div className="records-page">
      <h2 className="records-title">{t('Platform Records')}</h2>
      <div className="records-cards-container">
        <div className="record-card">
          <div className="record-icon-row">
            <FaUserGraduate className="record-icon" />
          </div>
          <div className="record-label-row">
            <div className="record-label">{t('No. of Students')}</div>
          </div>
          <div className="record-value-row">
            <div className="record-value">5k+</div>
          </div>
        </div>
        <div className="record-card">
          <div className="record-icon-row">
            <FaUserTie className="record-icon" />
          </div>
          <div className="record-label-row">
            <div className="record-label">{t('College Counsellors')}</div>
          </div>
          <div className="record-value-row">
            <div className="record-value">250+</div>
          </div>
        </div>
        <div className="record-card">
          <div className="record-icon-row">
            <FaUserMd className="record-icon" />
          </div>
          <div className="record-label-row">
            <div className="record-label">{t('Professional Counsellors')}</div>
          </div>
          <div className="record-value-row">
            <div className="record-value">900+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
