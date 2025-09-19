
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RelaxationPage.css";

export default function MusicTherapy() {
  const tracks = [
    { title: "Nature Sounds", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80" },
    { title: "Meditation Beats", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80" },
    { title: "Calming Instrumental", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=200&q=80" },
  ];
  const [playing, setPlaying] = useState(null);
  return (
    <section className="relax-music">
      <Link to="/relaxation" className="relax-back-btn">&larr; Back to Relaxation Hub</Link>
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
