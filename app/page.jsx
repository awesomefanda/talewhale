"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ComicPanel from "@/components/ComicPanel";

const PROMPTS_EXAMPLES = [
  { text: "A brave little fox who learns to fly", icon: "🦊" },
  { text: "A magical garden that grows candy", icon: "🍬" },
  { text: "A robot who wants to learn how to paint", icon: "🤖" },
  { text: "Pirates who discover an underwater city", icon: "🏴‍☠️" },
  { text: "A dinosaur's first day at school", icon: "🦕" },
];

const FALLBACK_STORY = {
  panels: [
    {
      layout: "full",
      narration: "Once upon a time, in a magical forest, lived a little fox named Finnegan.",
      sceneHint: "forest_night",
      bubbles: [{ text: "I wonder what's beyond those trees?", x: 50, y: 40, speaker: "Finnegan" }]
    },
    {
      layout: "wide",
      narration: "Suddenly, he saw a glowing path lead towards the mountains.",
      sceneHint: "sky",
      sfx: { text: "WHOOSH!", x: 50, y: 50 }
    }
  ],
  choices: ["Follow the path", "Go back home", "Ask a friend for help"]
};

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

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [prompt, setPrompt] = useState("");
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedExample, setFocusedExample] = useState(null);
  const [stars, setStars] = useState([]);
  const contentRef = useRef(null);

  // Generate stars only on client after hydration
  useEffect(() => {
    const generatedStars = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  const generateChapter = useCallback(async (choiceIndex = null, storyIdea = null, historyData = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyIdea: storyIdea ?? prompt,
          choiceIndex,
          history: historyData ?? chapters,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data?.details || data?.error || "Failed to generate chapter";
        throw new Error(errorMsg);
      }

      setChapters(prev => {
        const updated = [...prev, data];
        setCurrentPage(updated.length - 1);
        return updated;
      });
    } catch (err) {
      console.error("Generation error:", err);
      
      // Only use fallback on GitHub Pages (when NEXT_PUBLIC_BASE_PATH is set)
      const isGitHubPages = typeof process.env.NEXT_PUBLIC_BASE_PATH !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH !== '';
      
      if (isGitHubPages) {
        setChapters(prev => {
          const updated = [...prev, FALLBACK_STORY];
          setCurrentPage(updated.length - 1);
          return updated;
        });
        setError(null);
      } else {
        // On Vercel/production, show the real error
        setError(err.message || "Oops! Let's try that again.");
      }
    } finally {
      setLoading(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  }, [prompt, chapters]);

  const makeChoice = useCallback((index) => {
    generateChapter(index, prompt, chapters);
  }, [generateChapter, prompt, chapters]);

  const goToPage = (dir) => {
    const next = currentPage + dir;
    if (next >= 0 && next < chapters.length) {
      setCurrentPage(next);
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
        {stars.map((star, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "#fff",
            animation: `starPulse ${star.duration}s ease ${star.delay}s infinite`,
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
          }}>AI Comic Stories for Kids</p>
        </div>

        {/* Input */}
        <div style={{
          padding: "0 20px 20px",
          animation: "fadeInUp 0.7s ease 0.1s both",
          position: "relative", zIndex: 2,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: "4px",
            border: "2px solid rgba(255, 217, 61, 0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === "Enter" && startStory()}
                placeholder="What's your adventure?"
                style={{
                  flex: 1, padding: "14px 16px",
                  border: "none", outline: "none", background: "transparent",
                  fontFamily: "'Literata', Georgia, serif",
                  fontSize: "15px", color: "#fff",
                }}
              />
              <button
                onClick={() => startStory()}
                style={{
                  width: "44px", height: "44px",
                  borderRadius: "12px", border: "none",
                  background: prompt.trim()
                    ? "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)"
                    : "rgba(255,255,255,0.1)",
                  color: prompt.trim() ? "#1a0d3a" : "rgba(255,255,255,0.3)",
                  fontSize: "20px", cursor: "pointer",
                  marginRight: "4px", fontWeight: 900,
                  transition: "all 0.3s ease",
                }}
              >→</button>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div style={{
          padding: "0 20px 32px", flex: 1,
          position: "relative", zIndex: 2,
        }}>
          <p style={{
            fontSize: "11px", textTransform: "uppercase",
            letterSpacing: "2px", color: "rgba(255,217,61,0.5)",
            margin: "0 0 12px 4px",
          }}>⚡ PICK A STORY</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {PROMPTS_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => startStory(ex.text)}
                onMouseEnter={() => setFocusedExample(i)}
                onMouseLeave={() => setFocusedExample(null)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 16px",
                  background: focusedExample === i
                    ? "rgba(255, 217, 61, 0.12)"
                    : "rgba(255,255,255,0.05)",
                  border: `2px solid ${focusedExample === i ? "rgba(255, 217, 61, 0.3)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Bangers', cursive",
                  fontSize: "16px",
                  letterSpacing: "1px",
                  color: "#fff",
                  transition: "all 0.2s ease",
                  transform: focusedExample === i ? "translateX(6px) scale(1.02)" : "none",
                  animation: `fadeInUp 0.5s ease ${0.2 + i * 0.07}s both`,
                }}
              >
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{ex.icon}</span>
                <span>{ex.text}</span>
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
          Powered by AI · Made for curious minds
        </div>
      </div>
    );
  }

  // READING SCREEN
  const currentChapter = chapters[currentPage];
  const isStoryEnded = currentChapter && !currentChapter.choices;

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
          {Array.from({ length: Math.max(chapters.length, 1) }).map((_, i) => (
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
        {error ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#ff6b6b" }}>
            <p style={{ fontFamily: "'Bangers', cursive", fontSize: "18px" }}>{error}</p>
            <button onClick={() => setScreen("home")} style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "rgba(255,217,61,0.2)",
              border: "2px solid rgba(255,217,61,0.3)",
              borderRadius: "8px",
              color: "#ffd93d",
              cursor: "pointer",
              fontFamily: "'Bangers', cursive",
            }}>Try Again</button>
          </div>
        ) : loading && chapters.length === currentPage ? (
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
              {currentChapter.panels?.map((panel, i) => (
                <ComicPanel key={i} panel={panel} panelIndex={i} totalPanels={currentChapter.panels?.length} />
              ))}
            </div>

            {/* Choices or Navigation */}
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
                    <ChoiceButton key={i} text={c} index={i} onClick={makeChoice} disabled={loading} />
                  ))}
                </div>
              </div>
            ) : currentPage === chapters.length - 1 && isStoryEnded ? (
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
                    fontSize: "14px", 
                    letterSpacing: "1px",
                  }}>← PREV</button>
                
                {currentPage === chapters.length - 1 && !isStoryEnded ? (
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
                ) : (
                  <button onClick={() => goToPage(1)} disabled={currentPage >= chapters.length - 1}
                    style={{
                      padding: "8px 18px", 
                      background: currentPage < chapters.length - 1 ? "rgba(255,217,61,0.1)" : "transparent",
                      border: currentPage < chapters.length - 1 ? "2px solid rgba(255,217,61,0.2)" : "2px solid transparent",
                      borderRadius: "10px", 
                      cursor: currentPage < chapters.length - 1 ? "pointer" : "default",
                      color: currentPage < chapters.length - 1 ? "#ffd93d" : "transparent",
                      fontFamily: "'Bangers', cursive", 
                      fontSize: "14px", 
                      letterSpacing: "1px",
                    }}>NEXT →</button>
                )}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
