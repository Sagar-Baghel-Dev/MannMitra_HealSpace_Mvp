
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RelaxationPage.css";

export default function BreathingExercise() {
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(1);
  return (
    <section className="relax-breathing">
      <Link to="/relaxation" className="relax-back-btn">&larr; Back to Relaxation Hub</Link>
      <h2>Breathing Exercise</h2>
      <div className="breathing-circle-container">
        <div className={`breathing-circle${started ? " animate" : ""}`}></div>
        <div className="breathing-instructions">
          {started ? "Inhale... Exhale..." : "Follow the animated circle to relax."}
        </div>
      </div>
      <div className="breathing-controls">
        <label>Duration:</label>
        <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
          <option value={1}>1 min</option>
          <option value={3}>3 min</option>
          <option value={5}>5 min</option>
        </select>
        <button onClick={() => setStarted(!started)}>{started ? "Stop" : "Start Breathing Exercise"}</button>
      </div>
    </section>
  );
}
