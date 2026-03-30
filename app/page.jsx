"use client";

import { useState, useRef, useEffect } from "react";
import ComicPanel from "@/components/ComicPanel";
import STORIES from "@/lib/stories";

function ChoiceButton({ text, index, onClick, disabled }) {
  const [hover, setHover] = useState(false);
  const emojis = ["⚡", "💫", "🔮"];
  return (
    <button
      onClick={() => onClick(index)}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        width: "100%",
        padding: "13px 16px",
        background: hover ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
        border: `2px solid ${hover ? "#ffd93d" : "rgba(255,255,255,0.2)"}`,
        borderRadius: "12px",
        cursor: disabled ? "wait" : "pointer",
        textAlign: "left",
        fontFamily: "'Bangers', 'Comic Sans MS', cursive",
        fontSize: "15px",
        letterSpacing: "0.5px",
        color: "#fff",
        transition: "all 0.2s ease",
        transform: hover ? "translateX(4px) scale(1.02)" : "none",
        boxShadow: hover ? "0 0 20px rgba(255, 217, 61, 0.2)" : "none",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ fontSize: "16px", flexShrink: 0 }}>{emojis[index % 3]}</span>
      <span>{text}</span>
    </button>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [selectedStory, setSelectedStory] = useState(null);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [focusedCard, setFocusedCard] = useState(null);
  const [stars, setStars] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const generatedStars = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  const startStory = (story) => {
    const firstChapter = story.getChapter([]);
    setSelectedStory(story);
    setChoiceHistory([]);
    setChapters([firstChapter]);
    setCurrentPage(0);
    setScreen("reading");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const makeChoice = (index) => {
    const newHistory = [...choiceHistory, index];
    const nextChapter = selectedStory.getChapter(newHistory);
    setChoiceHistory(newHistory);
    setChapters(prev => {
      const updated = [...prev, nextChapter];
      setCurrentPage(updated.length - 1);
      return updated;
    });
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }, 50);
  };

  const goToPage = (dir) => {
    const next = currentPage + dir;
    if (next >= 0 && next < chapters.length) {
      setCurrentPage(next);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  const goHome = () => {
    setScreen("home");
    setSelectedStory(null);
    setChoiceHistory([]);
    setChapters([]);
    setCurrentPage(0);
  };

  // HOME SCREEN
  if (screen === "home") {
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
          @keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-10px); } }
          @keyframes float { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-10px) rotate(2deg); } }
          @keyframes starPulse { 0%,100% { opacity:0.2; } 50% { opacity:0.8; } }
          @keyframes panelPop { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        `}</style>

        {/* BG stars */}
        {stars.map((star, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: "2px", height: "2px",
            borderRadius: "50%",
            background: "#fff",
            animation: `starPulse ${star.duration}s ease ${star.delay}s infinite`,
          }} />
        ))}

        {/* Hero */}
        <div style={{
          padding: "50px 24px 20px", textAlign: "center",
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

        {/* Story cards */}
        <div style={{
          padding: "16px 20px 32px", flex: 1,
          position: "relative", zIndex: 2,
        }}>
          <p style={{
            fontSize: "11px", textTransform: "uppercase",
            letterSpacing: "2px", color: "rgba(255,217,61,0.6)",
            margin: "0 0 14px 4px",
          }}>⚡ PICK YOUR ADVENTURE</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {STORIES.map((story, i) => (
              <button
                key={story.id}
                onClick={() => startStory(story)}
                onMouseEnter={() => setFocusedCard(i)}
                onMouseLeave={() => setFocusedCard(null)}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "16px 18px",
                  background: focusedCard === i
                    ? "rgba(255, 217, 61, 0.12)"
                    : "rgba(255,255,255,0.05)",
                  border: `2px solid ${focusedCard === i ? "rgba(255, 217, 61, 0.4)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  transform: focusedCard === i ? "translateX(6px) scale(1.02)" : "none",
                  animation: `fadeInUp 0.5s ease ${0.15 + i * 0.08}s both`,
                  boxShadow: focusedCard === i ? "0 0 20px rgba(255,217,61,0.1)" : "none",
                }}
              >
                <span style={{ fontSize: "36px", flexShrink: 0, lineHeight: 1 }}>{story.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: "18px", letterSpacing: "1px",
                    color: focusedCard === i ? "#ffd93d" : "#fff",
                    marginBottom: "3px",
                    transition: "color 0.2s ease",
                  }}>{story.title}</div>
                  <div style={{
                    fontFamily: "'Literata', Georgia, serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    fontStyle: "italic",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
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

        <div style={{
          padding: "12px 20px 24px", textAlign: "center",
          color: "rgba(255,255,255,0.25)", fontSize: "11px",
          fontFamily: "'Literata', Georgia, serif",
          position: "relative", zIndex: 2,
        }}>
          Tap a story to begin · Make choices to shape the adventure
        </div>
      </div>
    );
  }

  // READING SCREEN
  const currentChapter = chapters[currentPage];
  const isStoryEnded = currentChapter && !currentChapter.choices;
  const isOnLastChapter = currentPage === chapters.length - 1;

  return (
    <div style={{
      height: "100vh",
      background: "#0c0520",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Literata:opsz,wght@7..72,400&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-10px); } }
        @keyframes panelPop { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        background: "rgba(12, 5, 32, 0.95)",
        borderBottom: "2px solid rgba(255, 217, 61, 0.15)",
        flexShrink: 0,
      }}>
        <button onClick={goHome} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "13px", color: "#ffd93d",
          fontFamily: "'Bangers', cursive",
          letterSpacing: "1px",
        }}>← BACK</button>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: "14px", color: "rgba(255,255,255,0.4)",
          letterSpacing: "2px",
        }}>
          CHAPTER {currentPage + 1} / {chapters.length}
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {chapters.map((_, i) => (
            <div key={i} style={{
              width: i === currentPage ? "16px" : "6px",
              height: "6px", borderRadius: "3px",
              background: i < currentPage ? "#ffd93d" : i === currentPage ? "#ffeaa7" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Comic panels */}
      <div ref={contentRef} style={{
        flex: 1,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        padding: "12px",
      }}>
        {currentChapter ? (
          <>
            {/* Comic Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              marginBottom: "16px",
            }}>
              {currentChapter.panels?.map((panel, i) => (
                <ComicPanel key={i} panel={panel} panelIndex={i} totalPanels={currentChapter.panels?.length} />
              ))}
            </div>

            {/* Choices, navigation, or THE END */}
            {isOnLastChapter && currentChapter.choices ? (
              <div style={{
                padding: "8px 4px 16px",
                animation: "fadeInUp 0.5s ease 0.3s both",
              }}>
                <p style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "16px", color: "#ffd93d",
                  letterSpacing: "2px", textAlign: "center",
                  margin: "0 0 12px",
                }}>⚡ WHAT HAPPENS NEXT? ⚡</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentChapter.choices.map((c, i) => (
                    <ChoiceButton key={i} text={c} index={i} onClick={makeChoice} />
                  ))}
                </div>
              </div>
            ) : isOnLastChapter && isStoryEnded ? (
              <div style={{
                textAlign: "center", padding: "32px 16px",
                animation: "fadeInUp 0.6s ease",
              }}>
                <div style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "36px", color: "#ffd93d",
                  letterSpacing: "4px",
                  textShadow: "3px 3px 0 #e74c3c",
                  marginBottom: "8px",
                }}>THE END!</div>
                <p style={{
                  fontFamily: "'Literata', Georgia, serif",
                  color: "rgba(255,255,255,0.4)", fontSize: "13px",
                  fontStyle: "italic", margin: "0 0 24px",
                }}>Every ending is a new beginning...</p>
                <button onClick={goHome} style={{
                  padding: "12px 28px",
                  background: "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)",
                  color: "#1a0d3a", border: "3px solid #2a2a2a",
                  borderRadius: "12px",
                  fontFamily: "'Bangers', cursive",
                  fontSize: "18px", letterSpacing: "2px",
                  cursor: "pointer",
                  boxShadow: "4px 4px 0 #2a2a2a",
                  fontWeight: 900,
                }}>NEW ADVENTURE!</button>
              </div>
            ) : (
              <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "16px 0",
              }}>
                <button onClick={() => goToPage(-1)} disabled={currentPage === 0}
                  style={{
                    padding: "8px 18px",
                    background: currentPage > 0 ? "rgba(255,217,61,0.1)" : "transparent",
                    border: currentPage > 0 ? "2px solid rgba(255,217,61,0.2)" : "2px solid transparent",
                    borderRadius: "10px",
                    cursor: currentPage > 0 ? "pointer" : "default",
                    color: currentPage > 0 ? "#ffd93d" : "transparent",
                    fontFamily: "'Bangers', cursive",
                    fontSize: "14px", letterSpacing: "1px",
                  }}>← PREV</button>
                <button onClick={() => goToPage(1)} disabled={currentPage >= chapters.length - 1}
                  style={{
                    padding: "8px 18px",
                    background: currentPage < chapters.length - 1 ? "rgba(255,217,61,0.1)" : "transparent",
                    border: currentPage < chapters.length - 1 ? "2px solid rgba(255,217,61,0.2)" : "2px solid transparent",
                    borderRadius: "10px",
                    cursor: currentPage < chapters.length - 1 ? "pointer" : "default",
                    color: currentPage < chapters.length - 1 ? "#ffd93d" : "transparent",
                    fontFamily: "'Bangers', cursive",
                    fontSize: "14px", letterSpacing: "1px",
                  }}>NEXT →</button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
