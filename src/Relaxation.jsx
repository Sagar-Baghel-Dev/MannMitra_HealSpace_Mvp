
import { Link } from "react-router-dom";
import "./RelaxationPage.css";



export default function Relaxation() {
  return (
    <div className="relaxation-page">
      <section className="relax-hub">
        <h2>Relaxation Hub</h2>
        <p style={{ maxWidth: 600, margin: "0 auto 2rem", color: "#444", fontSize: "1.1rem" }}>
          Welcome to your calm space. Choose a relaxation tool below to get started:
        </p>
        <div className="relax-hub-options grid">
          <Link to="/relaxation/breathing" className="relax-hub-cta">Breathing Exercise</Link>
          <Link to="/relaxation/music" className="relax-hub-cta">Music Therapy</Link>
          <Link to="/relaxation/journals" className="relax-hub-cta">Journals & Reflection</Link>
          <Link to="/relaxation/articles" className="relax-hub-cta">Regional Articles</Link>
          <Link to="/relaxation/videos" className="relax-hub-cta">Helpful Videos</Link>
          <Link to="/relaxation/games" className="relax-hub-cta">Relaxation Games</Link>
        </div>
      </section>
    </div>
  );
}
