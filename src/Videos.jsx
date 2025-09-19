
import React from "react";
import { Link } from "react-router-dom";
import "./RelaxationPage.css";

export default function Videos() {
  const videos = [
    { title: "Yoga for Calm", thumb: "https://img.youtube.com/vi/v7AYKMP6rOE/0.jpg" },
    { title: "Guided Meditation", thumb: "https://img.youtube.com/vi/inpok4MKVLM/0.jpg" },
    { title: "Motivational Talk", thumb: "https://img.youtube.com/vi/ZXsQAXx_ao0/0.jpg" },
  ];
  return (
    <section className="relax-videos">
      <Link to="/relaxation" className="relax-back-btn">&larr; Back to Relaxation Hub</Link>
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
