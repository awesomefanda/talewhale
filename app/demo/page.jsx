"use client";

import { useState, useRef, useCallback } from "react";
import ComicPanel from "@/components/ComicPanel";
import { Loader2 } from "lucide-react";

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "center", padding: "50px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: "#ffd93d",
          animation: `bounce 1.2s ease ${i * 0.15}s infinite`,
        }} />
      ))}
    </div>
  );
}

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

// Sample story data
const SAMPLE_CHAPTERS = [
  {
    panels: [
      {
        layout: "full",
        sceneHint: "forest_night",
        narration: "In a forest where the trees touched the clouds, there lived a small red fox named Pip...",
        narrationPos: "top",
      },
      {
        layout: "left",
        sceneHint: "forest_night",
        bubbles: [{
          text: "If only I could see the world from up there...",
          x: 55, y: 25, tailDir: "left", type: "whisper",
          speaker: "Pip"
        }],
        narration: "Every evening, Pip watched the birds soar above the canopy.",
        narrationPos: "bottom",
      },
      {
        layout: "right",
        sceneHint: "garden",
        narration: "One morning, Pip found something extraordinary near the Old Wishing Stump.",
        narrationPos: "top",
        sfx: { text: "✨ GLOW ✨", x: 50, y: 65, color: "#ffeaa7" },
      },
    ],
    choices: [
      "Pick up the glowing feather",
      "Follow the trail deeper into the forest",
      "Tell Grandmother Fox about it"
    ]
  },
  {
    panels: [
      {
        layout: "wide",
        sceneHint: "sky",
        narration: "The moment fur met quill, a warm tingle raced through Pip's entire body...",
        narrationPos: "topWide",
        sfx: { text: "WHOOOOSH!", x: 50, y: 55, color: "#ffa64d" },
      },
      {
        layout: "left",
        sceneHint: "sky",
        bubbles: [{
          text: "OH! What's happening to me?!",
          x: 50, y: 20, tailDir: "center", type: "shout",
        }],
        narration: "Two small, shimmering wings appeared on Pip's back.",
        narrationPos: "bottom",
      },
      {
        layout: "right",
        sceneHint: "garden",
        bubbles: [
          { text: "Amazing!", x: 55, y: 20, tailDir: "center", speaker: "Friend" },
        ],
        narration: "A friend witnessed the magic unfold.",
        narrationPos: "bottom",
      },
    ],
    choices: null
  }
];

export default function DemoPage() {
  const [screen, setScreen] = useState("home");
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [focusedExample, setFocusedExample] = useState(null);
  const contentRef = useRef(null);

  const generateChapter = useCallback(async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    
    if (currentPage < SAMPLE_CHAPTERS.length) {
      setChapters(prev => [...prev, SAMPLE_CHAPTERS[currentPage]]);
      setCurrentPage(prev => prev + 1);
    }
    
    setLoading(false);
  }, [currentPage]);

  const startStory = () => {
    setChapters([]);
    setCurrentPage(0);
    setScreen("reading");
    generateChapter();
  };

  const goToPage = (dir) => {
    const next = currentPage + dir;
    if (next >= 0 && next < chapters.length) {
      setCurrentPage(prev => prev + dir);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
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
          input::placeholder { color: rgba(255,255,255,0.35); }
        `}</style>

        {/* BG stars */}
        {Array.from({length:30}).map((_,i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
            width: "2px", height: "2px", borderRadius: "50%",
            background: "#fff",
            animation: `starPulse ${2+Math.random()*3}s ease ${Math.random()*2}s infinite`,
          }} />
        ))}

        {/* Hero */}
        <div style={{
          padding: "50px 24px 24px", textAlign: "center",
          animation: "fadeInUp 0.7s ease", position: "relative", zIndex: 2,
        }}>
          <div style={{
            fontSize: "56px", marginBottom: "8px",
            animation: "float 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 20px rgba(255, 217, 61, 0.4))",
          }}>💥</div>
          <h1 style={{
            fontSize: "38px", fontWeight: 400, color: "#ffd93d",
            margin: "0 0 4px", letterSpacing: "3px",
            textShadow: "3px 3px 0 #e74c3c, 6px 6px 0 rgba(0,0,0,0.3)",
          }}>TALEWHALE</h1>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0,
            fontFamily: "'Literata', Georgia, serif",
            fontStyle: "italic", letterSpacing: "1px",
          }}>AI Comic Stories for Kids</p>
        </div>

        {/* Main content */}
        <div style={{
          padding: "40px 20px",
          flex: 1,
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            textAlign: "center", marginBottom: "40px"
          }}>
            <p style={{
              fontSize: "16px", color: "rgba(255,255,255,0.7)",
              fontFamily: "'Literata', Georgia, serif",
              margin: "0 0 20px",
              lineHeight: "1.6"
            }}>
              Watch AI-generated comic panels come to life with animations, sound effects, and interactive choices!
            </p>
          </div>

          <button
            onClick={startStory}
            style={{
              padding: "16px 40px",
              background: "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)",
              color: "#1a0d3a", 
              border: "3px solid #2a2a2a",
              borderRadius: "16px",
              fontFamily: "'Bangers', cursive",
              fontSize: "22px", 
              letterSpacing: "2px",
              cursor: "pointer",
              boxShadow: "6px 6px 0 #2a2a2a",
              transition: "all 0.2s ease",
              fontWeight: 900,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translate(-2px, -2px)";
              e.target.style.boxShadow = "8px 8px 0 #2a2a2a";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "6px 6px 0 #2a2a2a";
            }}
          >
            START DEMO
          </button>
        </div>

        <div style={{
          padding: "12px 20px 24px", textAlign: "center",
          color: "rgba(255,255,255,0.25)", fontSize: "11px",
          fontFamily: "'Literata', Georgia, serif",
          position: "relative", zIndex: 2,
        }}>
          Demo Story · Try the UI design
        </div>
      </div>
    );
  }

  // READING SCREEN
  const currentChapter = chapters[currentPage];

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
      `}</style>

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        background: "rgba(12, 5, 32, 0.95)",
        borderBottom: "2px solid rgba(255, 217, 61, 0.15)",
        flexShrink: 0,
      }}>
        <button onClick={() => setScreen("home")} style={{
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
          CHAPTER {currentPage + 1}{chapters.length > 0 ? ` / ${chapters.length}` : ""}
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {Array.from({ length: SAMPLE_CHAPTERS.length }).map((_, i) => (
            <div key={i} style={{
              width: i === currentPage ? "16px" : "6px",
              height: "6px", borderRadius: "3px",
              background: i < currentPage ? "#ffd93d" : i === currentPage ? "#ffeaa7" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Comic panels area */}
      <div ref={contentRef} style={{
        flex: 1,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        padding: "12px",
      }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <TypingDots />
            <p style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "18px", color: "#ffd93d",
              letterSpacing: "2px", opacity: 0.6,
            }}>DRAWING YOUR PANELS...</p>
          </div>
        ) : currentChapter ? (
          <>
            {/* Comic Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              marginBottom: "16px",
            }}>
              {currentChapter.panels.map((panel, i) => (
                <ComicPanel key={i} panel={panel} panelIndex={i} totalPanels={currentChapter.panels.length} />
              ))}
            </div>

            {/* Choices or Next Chapter button */}
            {currentPage === chapters.length - 1 && currentChapter.choices ? (
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
                    <ChoiceButton 
                      key={i} 
                      text={c} 
                      index={i} 
                      onClick={() => generateChapter()} 
                      disabled={loading} 
                    />
                  ))}
                </div>
              </div>
            ) : currentPage === chapters.length - 1 ? (
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
                <button onClick={() => setScreen("home")} style={{
                  padding: "12px 28px",
                  background: "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)",
                  color: "#1a0d3a", border: "3px solid #2a2a2a",
                  borderRadius: "12px",
                  fontFamily: "'Bangers', cursive",
                  fontSize: "18px", letterSpacing: "2px",
                  cursor: "pointer",
                  boxShadow: "4px 4px 0 #2a2a2a",
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
                    fontSize: "14px", 
                    letterSpacing: "1px",
                  }}>← PREV</button>
                
                <button onClick={() => generateChapter()} disabled={loading}
                  style={{
                    padding: "8px 18px",
                    background: "rgba(255,217,61,0.15)",
                    border: "2px solid rgba(255,217,61,0.3)",
                    borderRadius: "10px", 
                    cursor: "pointer",
                    color: "#ffd93d",
                    fontFamily: "'Bangers', cursive", 
                    fontSize: "14px", 
                    letterSpacing: "1px",
                  }}>NEXT CHAPTER →</button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
