import React, { useState } from "react";

const topics = [
  "Stress Relief",
  "Exam Anxiety",
  "Homesickness",
  "Relationships",
  "Motivation",
];

const counsellors = ["Dr. Sharma", "Ms. Patel", "Mr. Singh"];
const institutions = ["Campus Wellness Center", "Student Helpline"];
const helplines = ["Govt. Helpline 1800-123-456"];

const sampleMessages = [
  { from: "anon1", text: "Hi everyone! 😊", mood: "😊" },
  { from: "anon2", text: "Feeling a bit anxious about exams.", mood: "😟" },
  { from: "anon3", text: "Let's support each other!", mood: "🤗" },
];

export default function PeerSupport() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("😊");
  const [isAnon, setIsAnon] = useState(true);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: isAnon ? "anon" : "You", text: input, mood }]);
      setInput("");
    }
  };

  return (
    <section className="peer-support-page" style={{ background: "#f6faff", minHeight: "100vh", padding: 0 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1rem 1.5rem" }}>
        <h2 style={{ color: "#4B7FD6", fontWeight: 700, fontSize: "2rem", textAlign: "center", marginBottom: 18 }}>
          You're not alone, let's talk
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 30 }}>
          <button style={{ background: "#2E8B57", color: "#fff", border: "none", borderRadius: 22, padding: "0.8em 2em", fontWeight: 600, fontSize: 17, marginRight: 10, cursor: "pointer" }}>Join a Group</button>
          <button style={{ background: "#4B7FD6", color: "#fff", border: "none", borderRadius: 22, padding: "0.8em 2em", fontWeight: 600, fontSize: 17, cursor: "pointer" }}>Chat 1:1</button>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          {/* Left Sidebar: Topics */}
          <div style={{ background: "#eaf3fa", borderRadius: 18, padding: "1.2rem 0.7rem", minWidth: 170, maxWidth: 180, boxShadow: "0 2px 10px 0 rgba(75,127,214,0.07)", minHeight: 420 }}>
            <div style={{ fontWeight: 600, color: "#4B7FD6", marginBottom: 10, fontSize: 15 }}>Rooms</div>
            {topics.map((t) => (
              <div key={t} onClick={() => setSelectedTopic(t)} style={{
                background: selectedTopic === t ? "#d1e7ff" : "#fff",
                color: selectedTopic === t ? "#2E8B57" : "#333",
                borderRadius: 12,
                padding: "0.6em 0.7em",
                marginBottom: 7,
                fontWeight: selectedTopic === t ? 700 : 500,
                cursor: "pointer",
                boxShadow: selectedTopic === t ? "0 2px 8px 0 rgba(46,139,87,0.10)" : "none"
              }}>{t}</div>
            ))}
          </div>
          {/* Main Chat Area */}
          <div style={{ flex: 1, background: "#fff", borderRadius: 18, minHeight: 420, boxShadow: "0 2px 16px 0 rgba(75,127,214,0.08)", display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ padding: "1.1rem 1.2rem 0.5rem", borderBottom: "1px solid #e6e6e6", fontWeight: 600, color: "#2E8B57", fontSize: 16, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
              {selectedTopic}
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "1.1rem 1.2rem", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#eaf3fa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 600, color: "#4B7FD6" }}>
                    {msg.from === "You" ? "🧑" : "👤"}
                  </div>
                  <div style={{ background: "#f6fef9", borderRadius: 16, padding: "0.7em 1.1em", fontSize: 15, color: "#222", maxWidth: 340, textAlign: "left", boxShadow: "0 1px 6px 0 rgba(46,139,87,0.06)" }}>
                    {msg.text}
                    <span style={{ marginLeft: 8, fontSize: 18 }}>{msg.mood}</span>
                  </div>
                </div>
              ))}
              {/* Typing indicator */}
              <div style={{ color: "#aaa", fontSize: 14, marginLeft: 48 }}><span style={{ fontSize: 18 }}>💬</span> Someone is typing...</div>
            </div>
            {/* Input Bar */}
            <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #e6e6e6", padding: "0.7rem 1.2rem", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, background: "#f6faff" }}>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." style={{ flex: 1, border: "none", outline: "none", fontSize: 15, background: "transparent" }} />
              <button onClick={sendMessage} style={{ background: "#2E8B57", color: "#fff", border: "none", borderRadius: 16, padding: "0.5em 1.2em", fontWeight: 600, marginLeft: 10, cursor: "pointer" }}>Send</button>
            </div>
            {/* Safety features */}
            <div style={{ position: "absolute", left: 10, bottom: -38, fontSize: 13, color: "#888", display: "flex", gap: 18, alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input type="checkbox" checked={isAnon} onChange={() => setIsAnon(!isAnon)} style={{ accentColor: "#2E8B57" }} />
                Anonymity
              </label>
              <button style={{ background: "none", border: "none", color: "#4B7FD6", cursor: "pointer", fontSize: 13 }}>Report</button>
              <button style={{ background: "none", border: "none", color: "#4B7FD6", cursor: "pointer", fontSize: 13 }}>Block</button>
            </div>
          </div>
          {/* Right Sidebar: Quick Access */}
          <div style={{ background: "#f6fef9", borderRadius: 18, padding: "1.2rem 0.7rem", minWidth: 180, maxWidth: 200, boxShadow: "0 2px 10px 0 rgba(46,139,87,0.07)", minHeight: 420, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontWeight: 600, color: "#2E8B57", marginBottom: 10, fontSize: 15 }}>Quick Access</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 500, color: "#4B7FD6", marginBottom: 4 }}>Professional Counsellors</div>
              {counsellors.map(c => <div key={c} style={{ color: "#222", fontSize: 14, marginBottom: 2 }}>{c}</div>)}
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 500, color: "#4B7FD6", marginBottom: 4 }}>Institutional Support</div>
              {institutions.map(i => <div key={i} style={{ color: "#222", fontSize: 14, marginBottom: 2 }}>{i}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 500, color: "#4B7FD6", marginBottom: 4 }}>Government Helplines</div>
              {helplines.map(h => <div key={h} style={{ color: "#222", fontSize: 14, marginBottom: 2 }}>{h}</div>)}
            </div>
            {/* Mood Tracker */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 500, color: "#2E8B57", marginBottom: 4 }}>Mood Tracker</div>
              <div style={{ display: "flex", gap: 7, justifyContent: "center" }}>
                {["😊", "😐", "😟", "😢", "😡"].map(m => (
                  <span key={m} style={{ fontSize: 22, cursor: "pointer", opacity: mood === m ? 1 : 0.5 }} onClick={() => setMood(m)}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Privacy Notice */}
        <div style={{ textAlign: "center", marginTop: 30, color: "#888", fontSize: 13 }}>
          <span style={{ marginRight: 8 }}>🔒</span> Your privacy is protected. All chats are anonymous and confidential.
        </div>
      </div>
    </section>
  );
}
