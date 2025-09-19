import React from "react";
import StudentProfileCard from "./StudentProfileCard";
import { useTranslation } from 'react-i18next';

// Dummy data for demonstration
const students = [
  {
    id: 1,
    name: "Aman Sharma",
    course: "B.Tech CSE",
    year: "3rd",
    risk: 92,
    status: "Critical",
    email: "aman.sharma@email.com",
    phone: "+91 9876543210",
    college: "ABC Institute of Technology",
    profileImg: null
  },
  {
    id: 2,
    name: "Priya Singh",
    course: "B.Sc Psych.",
    year: "2nd",
    risk: 78,
    status: "High",
    email: "priya.singh@email.com",
    phone: "+91 9876501234",
    college: "XYZ College",
    profileImg: null
  },
  {
    id: 3,
    name: "Rahul Verma",
    course: "B.Com",
    year: "1st",
    risk: 55,
    status: "Moderate",
    email: "rahul.verma@email.com",
    phone: "+91 9876512345",
    college: "LMN University",
    profileImg: null
  },
  {
    id: 4,
    name: "Sneha Patel",
    course: "BBA",
    year: "4th",
    risk: 30,
    status: "Low",
    email: "sneha.patel@email.com",
    phone: "+91 9876523456",
    college: "PQR Institute",
    profileImg: null
  },
  {
    id: 5,
    name: "Vikas Kumar",
    course: "B.Tech ECE",
    year: "2nd",
    risk: 99,
    status: "Critical",
    email: "vikas.kumar@email.com",
    phone: "+91 9876534567",
    college: "ABC Institute of Technology",
    profileImg: null
  }
];

export default function StudentListPage() {
  const { t } = useTranslation();
  return (
    <div style={{maxWidth:'900px',margin:'2.5rem auto',padding:'1rem'}}>
      <h2 style={{textAlign:'center',color:'#2E8B57',fontWeight:800,marginBottom:'2rem'}}>{t('All Students')}</h2>
      {students.map(student => (
        <StudentProfileCard key={student.id} student={student} />
      ))}
    </div>
  );
}