
import React from "react";
import { Link } from "react-router-dom";
import "./RelaxationPage.css";

export default function Games() {
  return (
    <section className="relax-games">
      <Link to="/relaxation" className="relax-back-btn">&larr; Back to Relaxation Hub</Link>
      <h2>Relaxation Games</h2>
      <div className="games-list">
        <div className="game-card">Memory Game (Coming Soon)</div>
        <div className="game-card">Puzzle Game (Coming Soon)</div>
        <div className="game-card">Color Match (Coming Soon)</div>
      </div>
    </section>
  );
}
