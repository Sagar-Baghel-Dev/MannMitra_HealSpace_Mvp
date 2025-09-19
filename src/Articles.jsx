import { Link } from "react-router-dom";
import "./RelaxationPage.css";

export default function Articles() {
  const articles = [
    { title: "Guided Relaxation", lang: "English", tags: ["Healing", "Mindfulness"] },
    { title: "ध्यान और शांति", lang: "Hindi", tags: ["Mindfulness"] },
    { title: "آرام اور سکون", lang: "Urdu", tags: ["Healing"] },
  ];
  return (
    <section className="relax-articles">
      <Link to="/relaxation" className="relax-back-btn">&larr; Back to Relaxation Hub</Link>
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
