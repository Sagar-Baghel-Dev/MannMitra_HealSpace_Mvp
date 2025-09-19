
import React, { useState, useRef, useEffect } from "react";
import "./SukoonSaathi.css";

const BOT_NAME = "SukoonSaathi";
const BOT_AVATAR = "🧘‍♂️";
const USER_AVATAR = "🙂";

const initialMessages = [
  { from: "bot", text: "Hi, I'm SukoonSaathi! How are you feeling today?" },
];

const replyMap = [
  {
    keywords: ["sad", "down", "depressed", "unhappy", "cry"],
    reply: "I'm really sorry you're feeling this way. Remember, it's okay to feel sad sometimes. I'm here to listen if you want to talk more."
  },
  {
    keywords: ["anxious", "anxiety", "nervous", "worried", "panic"],
    reply: "Anxiety can be tough. Try taking a few deep breaths with me. You're not alone, and things can get better."
  },
  {
    keywords: ["alone", "lonely", "isolated", "nobody"],
    reply: "You are not alone, even if it feels that way. Would you like some ideas to connect with others or just want to chat?"
  },
  {
    keywords: ["angry", "frustrated", "mad", "irritated"],
    reply: "It's okay to feel angry sometimes. Want to try a calming exercise together?"
  },
  {
    keywords: ["tired", "exhausted", "sleep", "fatigue"],
    reply: "Rest is important. Make sure to take care of yourself and get enough sleep. Would you like some tips for relaxation?"
  },
  {
    keywords: ["happy", "good", "great", "fine", "okay", "well"],
    reply: "I'm glad to hear that! Remember to celebrate the good moments. If you ever need support, I'm always here."
  },
  {
    keywords: ["help", "support", "advice", "suggestion"],
    reply: "Of course! I'm here to support you. Would you like some self-care tips or just want to talk?"
  },
  {
    keywords: ["stress", "stressed", "pressure", "overwhelmed"],
    reply: "Stress can be overwhelming. Let's take a deep breath together. Want to try a short relaxation exercise?"
  },
];

const genericReplies = [
  "I'm here for you. Take a deep breath, you're not alone.",
  "It's okay to feel this way. Would you like to talk more about it?",
  "Remember, every feeling is valid. I'm listening.",
  "You are stronger than you think. Want to try a relaxation exercise?",
  "If things feel overwhelming, it's okay to take a break.",
  "Would you like some tips for self-care or just want to chat?",
  "I'm always here to listen."
];

function getBotReply(userMsg) {
  const msg = userMsg.toLowerCase();
  for (const entry of replyMap) {
    if (entry.keywords.some(word => msg.includes(word))) {
      return entry.reply;
    }
  }
  // fallback to random comforting reply
  const idx = Math.floor(Math.random() * genericReplies.length);
  return genericReplies[idx];
}

export default function SukoonSaathi() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setTimeout(() => {
      const botMsg = { from: "bot", text: getBotReply(input) };
      setMessages(msgs => [...msgs, botMsg]);
    }, 700);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section className="sukoon-chatbot-page">
      <div className="sukoon-chatbot-container">
        <div className="sukoon-chatbot-header">
          <span className="sukoon-bot-avatar">{BOT_AVATAR}</span>
          <span className="sukoon-bot-title">{BOT_NAME}</span>
        </div>
        <div className="sukoon-chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`sukoon-chatbot-msg ${msg.from}`}> 
              <span className="sukoon-chatbot-avatar">{msg.from === "bot" ? BOT_AVATAR : USER_AVATAR}</span>
              <span className="sukoon-chatbot-bubble">{msg.text}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="sukoon-chatbot-input-row">
          <input
            className="sukoon-chatbot-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="sukoon-chatbot-send" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </section>
  );
}
