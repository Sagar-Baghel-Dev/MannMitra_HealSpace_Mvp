
import "./Appointment.css";
import React, { useState } from "react";

const counsellorTypes = [
  { type: "college", icon: "🎓", title: "College Counsellor", desc: "Recommended for academic stress, exam anxiety, or adjustment issues." },
  { type: "professional", icon: "👩‍⚕️", title: "Professional Counsellor", desc: "Choose based on specialization." },
];

const specializations = [
  { key: "ptsd", label: "PTSD" },
  { key: "adhd", label: "ADHD" },
  { key: "anxiety", label: "Anxiety/Depression" },
  { key: "trauma", label: "Trauma & Grief" },
  { key: "general", label: "General Therapy" },
];

const professionalCounsellors = [
  { name: "Dr. Meera Kapoor", spec: "ptsd", desc: "PTSD, Trauma, Grief", icon: "👩‍⚕️" },
  { name: "Dr. Rohan Singh", spec: "adhd", desc: "ADHD, Youth Therapy", icon: "👨‍⚕️" },
  { name: "Dr. Priya Nair", spec: "anxiety", desc: "Anxiety, Depression", icon: "👩‍⚕️" },
  { name: "Dr. Anil Verma", spec: "trauma", desc: "Trauma, Grief", icon: "👨‍⚕️" },
  { name: "Dr. Sara Ali", spec: "general", desc: "General Therapy", icon: "👩‍⚕️" },
];

const collegeCounsellor = { name: "Ms. Kavita Rao", desc: "Academic stress, exam anxiety, adjustment", icon: "🎓" };

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [spec, setSpec] = useState(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [mode, setMode] = useState("Online");
  const [user, setUser] = useState({ name: "", contact: "", notes: "" });
  const [confirmed, setConfirmed] = useState(false);

  // Filtered list for professional
  const filteredCounsellors = professionalCounsellors.filter(c => !spec || c.spec === spec);

  // Step 1: Choose Counsellor Type
  if (step === 1) {
    return (
      <section className="appointment-page-bg">
        <div className="appointment-container">
          <div className="appointment-card appointment-header-card">
            <h2 className="appointment-title">Book a Counselling Session</h2>
            <div className="appointment-desc">Choose the right counsellor for your needs. All sessions are free and confidential.</div>
          </div>
          <div className="appointment-card-row">
            {counsellorTypes.map(c => (
              <div key={c.type} className="appointment-card counsellor-type-card" onClick={() => { setType(c.type); setStep(2); }}>
                <div className="counsellor-icon">{c.icon}</div>
                <div className="counsellor-title">{c.title}</div>
                <div className="counsellor-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Step 2: Specialization or direct college counsellor
  if (step === 2 && type === "professional") {
    return (
      <section className="appointment-page-bg">
        <div className="appointment-container">
          <div className="appointment-card appointment-header-card">
            <h3 className="appointment-title">Choose Specialization</h3>
            <div className="specialization-row">
              {specializations.map(s => (
                <button key={s.key} className={`specialization-btn${spec === s.key ? ' selected' : ''}`} onClick={() => setSpec(s.key)}>{s.label}</button>
              ))}
            </div>
            <div className="available-counsellors-label">Available Counsellors</div>
            <div className="counsellor-list">
              {filteredCounsellors.map(c => (
                <div key={c.name} className="counsellor-list-card" onClick={() => { setSelectedCounsellor(c); setStep(3); }}>
                  <span className="counsellor-list-icon">{c.icon}</span>
                  <div className="counsellor-list-info">
                    <div className="counsellor-list-name">{c.name}</div>
                    <div className="counsellor-list-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (step === 2 && type === "college") {
    return (
      <section className="appointment-page-bg">
        <div className="appointment-container">
          <div className="appointment-card appointment-header-card">
            <div className="college-counsellor-label">College Counsellor</div>
            <div className="college-counsellor-icon">{collegeCounsellor.icon}</div>
            <div className="college-counsellor-name">{collegeCounsellor.name}</div>
            <div className="college-counsellor-desc">{collegeCounsellor.desc}</div>
            <button className="appointment-btn" onClick={() => { setSelectedCounsellor(collegeCounsellor); setStep(3); }}>Book Session</button>
          </div>
        </div>
      </section>
    );
  }

  // Step 3: Appointment Details
  if (step === 3) {
    return (
      <section className="appointment-page-bg">
        <div className="appointment-container">
          <div className="appointment-card appointment-header-card">
            <h3 className="appointment-title">Appointment Details</h3>
            <div className="appointment-detail-row">
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="appointment-input" />
              <span className="appointment-label">Date</span>
            </div>
            <div className="appointment-detail-row">
              <div className="appointment-label">Time Slot</div>
              <div className="appointment-slot-row">
                {timeSlots.map(t => (
                  <button key={t} className={`appointment-slot-btn${slot === t ? ' selected' : ''}`} onClick={() => setSlot(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="appointment-detail-row">
              <span className="appointment-label">Mode:</span>
              <button className={`appointment-mode-btn${mode === "Online" ? ' selected' : ''}`} onClick={() => setMode("Online")}>Online</button>
              <button className={`appointment-mode-btn${mode === "Offline" ? ' selected' : ''}`} onClick={() => setMode("Offline")}>Offline</button>
            </div>
            <button className="appointment-btn next-btn" onClick={() => setStep(4)} disabled={!date || !slot}>Next</button>
          </div>
        </div>
      </section>
    );
  }

  // Step 4: User Info
  if (step === 4) {
    return (
      <section className="appointment-page-bg">
        <div className="appointment-container">
          <div className="appointment-card appointment-header-card">
            <h3 className="appointment-title">Your Information</h3>
            <input type="text" placeholder="Name (optional)" value={user.name} onChange={e => setUser(u => ({ ...u, name: e.target.value }))} className="appointment-input" />
            <input type="text" placeholder="Email or Phone (optional)" value={user.contact} onChange={e => setUser(u => ({ ...u, contact: e.target.value }))} className="appointment-input" />
            <textarea placeholder="Notes (reason, preferences, etc.)" value={user.notes} onChange={e => setUser(u => ({ ...u, notes: e.target.value }))} className="appointment-input appointment-textarea" />
            <button className="appointment-btn" onClick={() => setConfirmed(true)}>Book Appointment</button>
          </div>
        </div>
      </section>
    );
  }

  // Step 5: Confirmation
  if (confirmed) {
    return (
      <section className="appointment-page-bg">
        <div className="appointment-container">
          <div className="appointment-card appointment-header-card">
            <h3 className="appointment-title success">Your appointment is booked successfully!</h3>
            <div className="appointment-success-details">
              <div className="appointment-success-counsellor">{selectedCounsellor?.icon} {selectedCounsellor?.name}</div>
              <div className="appointment-success-desc">{selectedCounsellor?.desc}</div>
              {spec && <div className="appointment-success-spec">Specialization: {specializations.find(s => s.key === spec)?.label}</div>}
              <div className="appointment-success-slot">Date: {date} | Time: {slot} | Mode: {mode}</div>
            </div>
            <div className="appointment-success-btn-row">
              <button className="appointment-btn reschedule" onClick={() => { setStep(3); setConfirmed(false); }}>Reschedule</button>
              <button className="appointment-btn cancel" onClick={() => { setStep(1); setConfirmed(false); setType(null); setSpec(null); setSelectedCounsellor(null); setDate(""); setSlot(""); setMode("Online"); setUser({ name: "", contact: "", notes: "" }); }}>Cancel</button>
              <button className="appointment-btn return-home" onClick={() => window.location.href = "/"}>Return Home</button>
            </div>
            <div className="appointment-success-note">Your information is confidential and shared only with your selected counsellor.</div>
            <div className="appointment-success-emergency">For urgent help, call the <b>emergency helpline</b>.</div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
