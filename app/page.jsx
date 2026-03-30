"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { STORY_LIST } from "@/lib/storyList";

export default function Home() {
  const router = useRouter();
  const [focusedCard, setFocusedCard] = useState(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })));
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #0c0520 0%, #1a0d3a 50%, #2d1b69 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Bangers', 'Comic Sans MS', cursive",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Literata:opsz,wght@7..72,400&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-10px) rotate(2deg); } }
        @keyframes starPulse { 0%,100% { opacity:0.2; } 50% { opacity:0.8; } }
      `}</style>

      {stars.map((star, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${star.left}%`, top: `${star.top}%`,
          width: "2px", height: "2px", borderRadius: "50%",
          background: "#fff",
          animation: `starPulse ${star.duration}s ease ${star.delay}s infinite`,
        }} />
      ))}

      {/* Hero */}
      <div style={{
        padding: "48px 24px 20px", textAlign: "center",
        animation: "fadeInUp 0.7s ease", position: "relative", zIndex: 2,
      }}>
        <div style={{
          fontSize: "56px", marginBottom: "8px",
          animation: "float 3s ease-in-out infinite",
          filter: "drop-shadow(0 0 20px rgba(255, 217, 61, 0.4))",
        }}>🐋</div>
        <h1 style={{
          fontSize: "38px", fontWeight: 400, color: "#ffd93d",
          margin: "0 0 4px", letterSpacing: "3px",
          textShadow: "3px 3px 0 #e74c3c, 6px 6px 0 rgba(0,0,0,0.3)",
        }}>TALEWHALE</h1>
        <p style={{
          color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0,
          fontFamily: "'Literata', Georgia, serif",
          fontStyle: "italic", letterSpacing: "1px",
        }}>Interactive Comic Stories for Kids</p>
      </div>

      {/* Story library */}
      <div style={{ padding: "16px 20px 16px", flex: 1, position: "relative", zIndex: 2 }}>
        <p style={{
          fontSize: "11px", textTransform: "uppercase",
          letterSpacing: "2px", color: "rgba(255,217,61,0.6)",
          margin: "0 0 14px 4px",
        }}>⚡ PICK YOUR ADVENTURE</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {STORY_LIST.map((story, i) => (
            <button
              key={story.id}
              onClick={() => router.push(`/read/${story.id}`)}
              onMouseEnter={() => setFocusedCard(i)}
              onMouseLeave={() => setFocusedCard(null)}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "16px 18px",
                background: focusedCard === i ? "rgba(255,217,61,0.12)" : "rgba(255,255,255,0.05)",
                border: `2px solid ${focusedCard === i ? "rgba(255,217,61,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "14px",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.2s ease",
                transform: focusedCard === i ? "translateX(6px) scale(1.02)" : "none",
                animation: `fadeInUp 0.5s ease ${0.15 + i * 0.08}s both`,
                boxShadow: focusedCard === i ? "0 0 20px rgba(255,217,61,0.1)" : "none",
              }}
            >
              <span style={{ fontSize: "36px", flexShrink: 0, lineHeight: 1 }}>{story.coverEmoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "18px", letterSpacing: "1px",
                  color: focusedCard === i ? "#ffd93d" : "#fff",
                  marginBottom: "3px", transition: "color 0.2s ease",
                }}>{story.title}</div>
                <div style={{
                  fontFamily: "'Literata', Georgia, serif",
                  fontSize: "12px", color: "rgba(255,255,255,0.45)",
                  fontStyle: "italic",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{story.tagline}</div>
              </div>
              <span style={{
                fontSize: "20px", flexShrink: 0,
                color: focusedCard === i ? "#ffd93d" : "rgba(255,255,255,0.25)",
                transition: "all 0.2s ease",
                transform: focusedCard === i ? "translateX(4px)" : "none",
              }}>›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Make My Own button */}
      <div style={{ padding: "12px 20px 28px", position: "relative", zIndex: 2 }}>
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          marginBottom: "16px",
        }} />
        <button
          onClick={() => router.push("/create")}
          style={{
            width: "100%", padding: "14px",
            background: "rgba(255,255,255,0.06)",
            border: "2px dashed rgba(255,255,255,0.2)",
            borderRadius: "14px", cursor: "pointer",
            fontFamily: "'Bangers', cursive",
            fontSize: "16px", letterSpacing: "1.5px",
            color: "rgba(255,255,255,0.6)",
            transition: "all 0.2s ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          <span>✨</span>
          <span>MAKE MY OWN STORY</span>
          <span style={{ fontSize: "12px", fontFamily: "'Literata', serif", fontStyle: "italic", fontWeight: 400, letterSpacing: 0 }}>(for parents)</span>
        </button>
        <p style={{
          textAlign: "center", marginTop: "12px",
          color: "rgba(255,255,255,0.2)", fontSize: "11px",
          fontFamily: "'Literata', Georgia, serif",
        }}>Tap a story to begin · Make choices to shape the adventure</p>
      </div>
    </div>
  );
}
