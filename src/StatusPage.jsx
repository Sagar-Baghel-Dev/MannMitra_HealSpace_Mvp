import React from "react";
import "./App.css";
import { useTranslation } from 'react-i18next';

// Dummy data for demonstration
const students = [
  { id: 1, name: "Aman Sharma", course: "B.Tech CSE", year: "3rd", risk: 92, status: "Critical" },
  { id: 2, name: "Priya Singh", course: "B.Sc Psych.", year: "2nd", risk: 78, status: "High" },
  { id: 3, name: "Rahul Verma", course: "B.Com", year: "1st", risk: 55, status: "Moderate" },
  { id: 4, name: "Sneha Patel", course: "BBA", year: "4th", risk: 30, status: "Low" },
  { id: 5, name: "Vikas Kumar", course: "B.Tech ECE", year: "2nd", risk: 99, status: "Critical" },
];

export default function StatusPage({ onShortlist }) {
  const { t } = useTranslation();
  return (
    <div className="status-page">
      <h2 className="status-title">{t('Shortlisted Students Health Status')}</h2>
      <div className="status-table-container">
        <table className="status-table">
          <thead>
            <tr>
              <th>{t('Student Name')}</th>
              <th>{t('Course')}</th>
              <th>{t('Year')}</th>
              <th>{t('Risk Score')}</th>
              <th>{t('Status')}</th>
              <th>{t('Shortlist')}</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className={s.status === "Critical" ? "critical-row" : ""}>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.year}</td>
                <td>{s.risk}</td>
                <td>
                  <span className={`status-badge status-${s.status.toLowerCase()}`}>{t(s.status)}</span>
                </td>
                <td>
                  <button className="shortlist-btn" onClick={() => onShortlist && onShortlist(s)} disabled={s.status !== "Critical"}>{t('Shortlist')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
