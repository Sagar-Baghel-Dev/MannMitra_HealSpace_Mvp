import React, { useState } from "react";
import "./RelaxationPage.css";

// Placeholder for Breathing Exercise
function BreathingExercise() {
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(1);
  return (
    <section className="relax-breathing">
      <h2>Breathing Exercise</h2>
      <div className="breathing-circle-container">
        <div className={`breathing-circle${started ? " animate" : ""}`}></div>
        <div className="breathing-instructions">
          {started ? "Inhale... Exhale..." : "Follow the animated circle to relax."}
        </div>
      </div>
      <div className="breathing-controls">
        <label>Duration: </label>
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

// Placeholder for Music Therapy
function MusicTherapy() {
  const tracks = [
    { title: "Nature Sounds", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80" },
    { title: "Meditation Beats", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80" },
    { title: "Calming Instrumental", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=200&q=80" },
  ];
  const [playing, setPlaying] = useState(null);
  return (
    <section className="relax-music">
      <h2>Music Therapy</h2>
      <div className="music-cards">
        {tracks.map((track, i) => (
          <div key={i} className="music-card">
            <img src={track.img} alt={track.title} />
            <div>{track.title}</div>
            <button onClick={() => setPlaying(i === playing ? null : i)}>{i === playing ? "Pause" : "Play"}</button>
          </div>
        ))}
      </div>
      <div className="music-player-bar">
        {playing !== null ? `Now Playing: ${tracks[playing].title}` : "Select a track to play"}
      </div>
    </section>
  );
}

// Placeholder for Journals
function Journals() {
  const [journals, setJournals] = useState([
    { text: "Felt calm after breathing exercise.", date: "2025-09-18" },
    { text: "Enjoyed nature sounds today.", date: "2025-09-17" },
  ]);
  const [newEntry, setNewEntry] = useState("");
  const addJournal = () => {
    if (newEntry.trim()) {
      setJournals([{ text: newEntry, date: new Date().toISOString().slice(0, 10) }, ...journals]);
      setNewEntry("");
    }
  };
  return (
    <section className="relax-journals">
      <h2>Journals & Reflection</h2>
      <div className="journal-add">
        <textarea value={newEntry} onChange={e => setNewEntry(e.target.value)} placeholder="Write your thoughts..." />
        <button onClick={addJournal}>+ Add New Journal</button>
      </div>
      <div className="journal-list">
        {journals.map((j, i) => (
          <div key={i} className="journal-card">
            <div className="journal-date">{j.date}</div>
            <div className="journal-text">{j.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Placeholder for Articles
function Articles() {
  const articles = [
    { title: "Guided Relaxation", lang: "English", tags: ["Healing", "Mindfulness"] },
    { title: "ध्यान और शांति", lang: "Hindi", tags: ["Mindfulness"] },
    { title: "آرام اور سکون", lang: "Urdu", tags: ["Healing"] },
  ];
  return (
    <section className="relax-articles">
      <h2>Regional Articles</h2>
      <div className="article-cards">
        {articles.map((a, i) => (
          <div key={i} className="article-card">
            <div className="article-title">{a.title}</div>
            <div className="article-lang">{a.lang}</div>
            <div className="article-tags">{a.tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Placeholder for Videos
function Videos() {
  const videos = [
    { title: "Yoga for Calm", thumb: "https://img.youtube.com/vi/v7AYKMP6rOE/0.jpg" },
    { title: "Guided Meditation", thumb: "https://img.youtube.com/vi/inpok4MKVLM/0.jpg" },
    { title: "Motivational Talk", thumb: "https://img.youtube.com/vi/ZXsQAXx_ao0/0.jpg" },
  ];
  return (
    <section className="relax-videos">
      <h2>Helpful Videos</h2>
      <div className="video-cards">
        {videos.map((v, i) => (
          <div key={i} className="video-card">
            <img src={v.thumb} alt={v.title} />
            <div>{v.title}</div>
            <button>Watch Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// Placeholder for Games
function Games() {
  return (
    <section className="relax-games">
      <h2>Relaxation Games</h2>
      <div className="games-list">
        <div className="game-card">Memory Game (Coming Soon)</div>
        <div className="game-card">Puzzle Game (Coming Soon)</div>
        <div className="game-card">Color Match (Coming Soon)</div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relax-footer">
      <div className="footer-links">
        <a href="/">Home</a> | <a href="/appointment">Book Appointment</a> | <a href="/relaxation">Relaxation</a> | <a href="/peer-support">Community</a>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} HealSpace. All rights reserved.
      </div>
    </footer>
  );
}

export default function Relaxation() {
  return (
    <div className="relaxation-page">
  <BreathingExercise />
  <MusicTherapy />
  <Journals />
  <Articles />
  <Videos />
  <Games />
  <Footer />
    </div>
  );
}
