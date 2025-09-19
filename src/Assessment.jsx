import React, { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
  // 8 negative (GAD-7, PHQ-9, GRQ-12 style)
  { q: "Feeling nervous, anxious, or on edge?", type: "neg" },
  { q: "Little interest or pleasure in doing things?", type: "neg" },
  { q: "Trouble relaxing or feeling restless?", type: "neg" },
  { q: "Feeling down, depressed, or hopeless?", type: "neg" },
  { q: "Worrying too much about different things?", type: "neg" },
  { q: "Feeling tired or having little energy?", type: "neg" },
  { q: "Becoming easily annoyed or irritable?", type: "neg" },
  { q: "Difficulty concentrating on things?", type: "neg" },
  // 2 positive (reverse scored)
  { q: "Feeling confident in yourself?", type: "pos" },
  { q: "Feeling useful and needed?", type: "pos" },
];

const options = {
  neg: [
    { label: "Never", score: 0, emoji: "😊" },
    { label: "Sometimes", score: 1, emoji: "😐" },
    { label: "Often", score: 2, emoji: "😟" },
    { label: "Nearly every day", score: 3, emoji: "😔" },
  ],
  pos: [
    { label: "Always", score: 0, emoji: "😊" },
    { label: "Most of the time", score: 1, emoji: "🙂" },
    { label: "Sometimes", score: 2, emoji: "😐" },
    { label: "Rarely", score: 3, emoji: "😟" },
  ],
};

const riskLevels = [
  { min: 0, max: 5, color: "#2E8B57", title: "Healthy", emoji: "😊", quote: "Keep shining! Your mind is in a good place.", suggestion: <>Maintain your healthy habits and <Link to="/relaxation/journals">start a journal</Link>.</> },
  { min: 6, max: 10, color: "#FFD600", title: "Mild", emoji: "🙂", quote: "A little self-care goes a long way.", suggestion: <>Chat with <Link to="/chatbot">Sukoon Saathi</Link> for support.</> },
  { min: 11, max: 20, color: "#FFA726", title: "Moderate", emoji: "😐", quote: "You’re not alone. Support is here.", suggestion: <>Join <Link to="/peer-support">Peer Support</Link> or talk to <Link to="/chatbot">Sukoon Saathi</Link> for guidance.</> },
  { min: 21, max: 30, color: "#EF5350", title: "Critical", emoji: "😔", quote: "It’s okay to ask for help.", suggestion: <> <Link to="/appointment">Book a counselling session</Link> or call the emergency helpline now.</> },
];

const actionsByLevel = [
  [
    { label: "Journaling", color: "#4B7FD6" },
  ],
  [
    { label: "Chat with Sukoon Saathi", color: "#4B7FD6" },
  ],
  [
    { label: "Peer Support (Anonymous)", color: "#FFD600", textColor: "#222" },
    { label: "Sukoon Saathi Chatbot", color: "#4B7FD6" },
  ],
  [
    { label: "Book Counselling", color: "#EF5350" },
    { label: "Emergency Helpline", color: "#222" },
  ],
];

function getRiskLevel(score) {
  return riskLevels.find(l => score >= l.min && score <= l.max);
}

export default function Assessment() {
  const [step, setStep] = useState(0); // 0 = start, 1-10 = questions, 11 = result
  const [answers, setAnswers] = useState([]);

  const handleSelect = (score) => {
    setAnswers(prev => {
      const next = [...prev];
      next[step - 1] = score;
      return next;
    });
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleRetake = () => { setStep(1); setAnswers([]); };

  // Calculate score
  let total = 0;
  for (let i = 0; i < answers.length; ++i) {
    total += answers[i] || 0;
  }
  const risk = getRiskLevel(total);
  const riskIdx = riskLevels.indexOf(risk);

  return (
    <section className="assessment-page" style={{ background: '#f6fef9', minHeight: '100vh', padding: 0 }}>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '2.5rem 1rem 1.5rem' }}>
        {/* Header Section */}
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(46,139,87,0.08)', padding: '2rem 1.2rem 1.5rem', marginBottom: 30, textAlign: 'center' }}>
          <h2 style={{ color: '#2E8B57', fontWeight: 700, fontSize: '2rem', marginBottom: 8 }}>Self-Assessment for Mental Well-Being</h2>
          <div style={{ color: '#444', fontSize: '1.08rem', marginBottom: 0 }}>Answer a few questions to understand your current state of mind. Your responses are private and safe.</div>
        </div>
        {/* Progress Bar */}
        {step > 0 && step <= 10 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ height: 8, background: '#eaf3fa', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: `${(step-1)/10*100}%`, height: '100%', background: '#2E8B57', transition: 'width 0.3s' }} />
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>Question {step} of 10</div>
          </div>
        )}
        {/* Questionnaire Section */}
        {step === 0 && (
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button onClick={() => setStep(1)} style={{ background: '#2E8B57', color: '#fff', border: 'none', borderRadius: 22, padding: '0.9em 2.2em', fontWeight: 600, fontSize: 18, cursor: 'pointer', marginBottom: 10 }}>Start Assessment</button>
          </div>
        )}
        {step > 0 && step <= 10 && (
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(46,139,87,0.08)', padding: '2rem 1.2rem 1.5rem', marginBottom: 30, textAlign: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: '1.15rem', color: '#2E8B57', marginBottom: 18 }}>{questions[step-1].q}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13, alignItems: 'center', marginBottom: 18 }}>
              {options[questions[step-1].type].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.score)}
                  style={{
                    background: answers[step-1] === opt.score ? '#2E8B57' : '#f6fef9',
                    color: answers[step-1] === opt.score ? '#fff' : '#2E8B57',
                    border: '2px solid #2E8B57',
                    borderRadius: 16,
                    padding: '0.7em 1.2em',
                    fontWeight: 600,
                    fontSize: 16,
                    minWidth: 180,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'center',
                  }}
                >
                  <span>{opt.emoji}</span> {opt.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
              <button onClick={handleBack} disabled={step === 1} style={{ background: '#eaf3fa', color: '#2E8B57', border: 'none', borderRadius: 16, padding: '0.6em 1.2em', fontWeight: 600, fontSize: 15, cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.5 : 1 }}>Back</button>
              <button onClick={handleNext} disabled={typeof answers[step-1] !== 'number'} style={{ background: '#2E8B57', color: '#fff', border: 'none', borderRadius: 16, padding: '0.6em 1.2em', fontWeight: 600, fontSize: 15, cursor: typeof answers[step-1] !== 'number' ? 'not-allowed' : 'pointer', opacity: typeof answers[step-1] !== 'number' ? 0.5 : 1 }}>{step === 10 ? 'See Result' : 'Next'}</button>
            </div>
          </div>
        )}
        {/* Result Page */}
        {step === 11 && (
          <div style={{ background: risk.color, borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(46,139,87,0.08)', padding: '2.2rem 1.2rem 1.5rem', marginBottom: 30, textAlign: 'center', color: risk.color === '#FFD600' ? '#222' : '#fff', transition: 'background 0.3s' }}>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 10 }}>{risk.emoji} {risk.title}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Score: {total} / 30</div>
            <div style={{ fontStyle: 'italic', marginBottom: 12 }}>{risk.quote}</div>
            <div style={{ marginBottom: 18, fontSize: 16 }}>{risk.suggestion}</div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 10 }}>
              <Link to="/chatbot" style={{ background: '#4B7FD6', color: '#fff', border: 'none', borderRadius: 16, padding: '0.7em 1.2em', fontWeight: 600, fontSize: 16, cursor: 'pointer', minWidth: 150, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Chat with Sukoon Saathi</Link>
              <Link to="/appointment" style={{ background: '#EF5350', color: '#fff', border: 'none', borderRadius: 16, padding: '0.7em 1.2em', fontWeight: 600, fontSize: 16, cursor: 'pointer', minWidth: 150, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Book Counselling</Link>
            </div>
            <div style={{ fontSize: 13, marginTop: 10 }}>This is not a clinical diagnosis. For urgent help, contact a professional.</div>
            <button onClick={handleRetake} style={{ background: '#fff', color: risk.color, border: `2px solid ${risk.color}`, borderRadius: 16, padding: '0.6em 1.2em', fontWeight: 600, fontSize: 15, marginTop: 18, cursor: 'pointer' }}>Retake Test</button>
          </div>
        )}
        {/* Advance to result if all answered */}
        {step > 0 && step <= 10 && answers.length === 10 && typeof answers[9] === 'number' && (
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button onClick={() => setStep(11)} style={{ background: '#2E8B57', color: '#fff', border: 'none', borderRadius: 22, padding: '0.9em 2.2em', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}>See Result</button>
          </div>
        )}
      </div>
    </section>
  );
}
