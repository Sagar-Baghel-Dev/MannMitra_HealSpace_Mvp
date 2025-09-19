
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RelaxationPage.css";

export default function Journals() {
  const [journals, setJournals] = useState([
    { text: "Felt calm after breathing exercise.", date: "2025-09-18" },
    { text: "Enjoyed nature sounds today.", date: "2025-09-17" },
  ]);
  const [newEntry, setNewEntry] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [viewIdx, setViewIdx] = useState(null);

  const addJournal = () => {
    if (newEntry.trim()) {
      setJournals([{ text: newEntry, date: new Date().toISOString().slice(0, 10) }, ...journals]);
      setNewEntry("");
    }
  };

  const deleteJournal = (idx) => {
    setJournals(journals.filter((_, i) => i !== idx));
  };

  const startEdit = (idx) => {
    setEditIdx(idx);
    setEditText(journals[idx].text);
  };

  const saveEdit = (idx) => {
    const updated = [...journals];
    updated[idx].text = editText;
    setJournals(updated);
    setEditIdx(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setEditText("");
  };

  const viewJournal = (idx) => {
    setViewIdx(idx);
  };

  const closeView = () => {
    setViewIdx(null);
  };

  return (
    <section className="relax-journals">
      <Link to="/relaxation" className="relax-back-btn">&larr; Back to Relaxation Hub</Link>
      <h2>Journals & Reflection</h2>
      <div className="journal-add">
        <textarea value={newEntry} onChange={e => setNewEntry(e.target.value)} placeholder="Write your thoughts..." />
        <button onClick={addJournal}>+ Add New Journal</button>
      </div>
      <div className="journal-list">
        {journals.map((j, i) => (
          <div key={i} className="journal-card">
            <div className="journal-date">{j.date}</div>
            {viewIdx === i ? (
              <>
                <div className="journal-text">{j.text}</div>
                <button onClick={closeView}>Close</button>
              </>
            ) : editIdx === i ? (
              <>
                <textarea value={editText} onChange={e => setEditText(e.target.value)} />
                <div>
                  <button onClick={() => saveEdit(i)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="journal-text">{j.text}</div>
                <div>
                  <button onClick={() => viewJournal(i)}>View</button>
                  <button onClick={() => startEdit(i)}>Edit</button>
                  <button onClick={() => deleteJournal(i)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
