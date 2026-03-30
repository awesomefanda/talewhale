"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import ComicPanel from "@/components/ComicPanel";

const EXAMPLES = [
  "A tiny dragon who is afraid of fire",
  "A princess who saves the dragon",
  "A space dog searching for a lost star",
  "A mermaid who loves to bake cakes",
];

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
        width: "100%", padding: "13px 16px",
        background: hover ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
        border: `2px solid ${hover ? "#ffd93d" : "rgba(255,255,255,0.2)"}`,
        borderRadius: "12px",
        cursor: disabled ? "wait" : "pointer",
        textAlign: "left",
        fontFamily: "'Bangers', 'Comic Sans MS', cursive",
        fontSize: "15px", letterSpacing: "0.5px", color: "#fff",
        transition: "all 0.2s ease",
        transform: hover ? "translateX(4px) scale(1.02)" : "none",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ fontSize: "16px", flexShrink: 0 }}>{emojis[index % 3]}</span>
      <span>{text}</span>
    </button>
  );
}

// ── Parent Gate ──────────────────────────────────────────────────────────────
function ParentGate({ onPass }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  // Simple arithmetic gate — not security, just friction for little fingers
  const question = "What is 4 + 7?";
  const correct = "11";

  const submit = () => {
    if (answer.trim() === correct) {
      onPass();
    } else {
      setError(true);
      setAnswer("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "32px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
      <h2 style={{
        fontFamily: "'Bangers', cursive", fontSize: "24px",
        color: "#ffd93d", letterSpacing: "2px", margin: "0 0 8px",
      }}>PARENT CHECK</h2>
      <p style={{
        fontFamily: "'Literata', Georgia, serif",
        color: "rgba(255,255,255,0.6)", fontSize: "14px",
        margin: "0 0 24px", lineHeight: 1.5,
      }}>
        This section uses AI to generate stories.<br />
        Please answer this question to continue.
      </p>
      <p style={{
        fontFamily: "'Bangers', cursive", fontSize: "20px",
        color: "#fff", margin: "0 0 16px", letterSpacing: "1px",
      }}>{question}</p>
      <input
        type="number"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
        placeholder="Your answer"
        style={{
          width: "120px", padding: "10px 14px",
          background: error ? "rgba(231,76,60,0.2)" : "rgba(255,255,255,0.1)",
          border: `2px solid ${error ? "#e74c3c" : "rgba(255,255,255,0.2)"}`,
          borderRadius: "10px", color: "#fff",
          fontFamily: "'Bangers', cursive", fontSize: "20px",
          textAlign: "center", outline: "none",
          marginBottom: "16px",
          transition: "border-color 0.2s ease",
        }}
        autoFocus
      />
      {error && (
        <p style={{
          color: "#e74c3c", fontSize: "13px", margin: "-8px 0 12px",
          fontFamily: "'Literata', serif",
        }}>Not quite — try again!</p>
      )}
      <button onClick={submit} style={{
        padding: "12px 32px",
        background: "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)",
        color: "#1a0d3a", border: "3px solid #2a2a2a",
        borderRadius: "12px",
        fontFamily: "'Bangers', cursive",
        fontSize: "18px", letterSpacing: "2px",
        cursor: "pointer", boxShadow: "4px 4px 0 #2a2a2a",
      }}>CONTINUE</button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CreatePage() {
  const router = useRouter();
  const contentRef = useRef(null);

  const [screen, setScreen] = useState("gate"); // gate | prompt | reading
  const [prompt, setPrompt] = useState("");
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateChapter = useCallback(async (choiceIndex, storyIdea, history) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyIdea, choiceIndex, history }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const chapter = await res.json();
      setChapters(prev => {
        const updated = [...prev, chapter];
        setCurrentPage(updated.length - 1);
        return updated;
      });
    } catch (e) {
      setError("Couldn't generate the story. Check your API key in Vercel settings.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (contentRef.current) contentRef.current.scrollTop = 0;
      }, 50);
    }
  }, []);

  const startStory = (idea) => {
    const storyIdea = idea || prompt.trim();
    if (!storyIdea) return;
    setPrompt(storyIdea);
    setChapters([]);
    setCurrentPage(0);
    setScreen("reading");
    generateChapter(null, storyIdea, []);
  };

  const makeChoice = (index) => {
    const history = chapters.map((ch, i) => ({
      chapter: i + 1,
      panels: ch.panels,
      choice: ch.choices?.[index] ?? null,
    }));
    generateChapter(index, prompt, history);
  };

  const goHome = () => router.push("/");

  // ── GATE ──
  if (screen === "gate") {
    return (
      <div style={{
        height: "100vh", background: "#0c0520",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Literata:opsz,wght@7..72,400&display=swap');
          * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        `}</style>
        <div style={{
          display: "flex", alignItems: "center",
          padding: "10px 16px",
          borderBottom: "2px solid rgba(255,217,61,0.15)",
          flexShrink: 0,
        }}>
          <button onClick={goHome} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "13px", color: "#ffd93d",
            fontFamily: "'Bangers', cursive", letterSpacing: "1px",
          }}>← BACK</button>
        </div>
        <ParentGate onPass={() => setScreen("prompt")} />
      </div>
    );
  }

  // ── PROMPT ──
  if (screen === "prompt") {
    return (
      <div style={{
        height: "100vh", background: "#0c0520",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Literata:opsz,wght@7..72,400&display=swap');
          * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
          @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        `}</style>
        <div style={{
          display: "flex", alignItems: "center",
          padding: "10px 16px",
          borderBottom: "2px solid rgba(255,217,61,0.15)",
          flexShrink: 0,
        }}>
          <button onClick={goHome} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "13px", color: "#ffd93d",
            fontFamily: "'Bangers', cursive", letterSpacing: "1px",
          }}>← BACK</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px", animation: "fadeInUp 0.5s ease" }}>
            <div style={{ fontSize: "44px", marginBottom: "8px" }}>✨</div>
            <h2 style={{
              fontFamily: "'Bangers', cursive", fontSize: "26px",
              color: "#ffd93d", letterSpacing: "2px", margin: "0 0 8px",
            }}>CREATE YOUR STORY</h2>
            <p style={{
              fontFamily: "'Literata', Georgia, serif",
              color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0,
            }}>Type a story idea or pick one below</p>
          </div>

          <div style={{ marginBottom: "20px", animation: "fadeInUp 0.5s ease 0.1s both" }}>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. A brave little fox who learns to fly..."
              rows={3}
              style={{
                width: "100%", padding: "12px 14px",
                background: "rgba(255,255,255,0.07)",
                border: "2px solid rgba(255,255,255,0.15)",
                borderRadius: "12px", color: "#fff",
                fontFamily: "'Literata', Georgia, serif",
                fontSize: "14px", lineHeight: 1.5,
                resize: "none", outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(255,217,61,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
            />
            <button
              onClick={() => startStory()}
              disabled={!prompt.trim()}
              style={{
                width: "100%", marginTop: "10px",
                padding: "13px",
                background: prompt.trim()
                  ? "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)"
                  : "rgba(255,255,255,0.1)",
                color: prompt.trim() ? "#1a0d3a" : "rgba(255,255,255,0.3)",
                border: "3px solid transparent",
                borderRadius: "12px",
                fontFamily: "'Bangers', cursive",
                fontSize: "18px", letterSpacing: "2px",
                cursor: prompt.trim() ? "pointer" : "default",
                boxShadow: prompt.trim() ? "4px 4px 0 rgba(0,0,0,0.3)" : "none",
                transition: "all 0.2s ease",
              }}
            >CREATE COMIC!</button>
          </div>

          <p style={{
            fontFamily: "'Bangers', cursive", fontSize: "12px",
            color: "rgba(255,217,61,0.5)", letterSpacing: "2px",
            margin: "0 0 10px",
            animation: "fadeInUp 0.5s ease 0.2s both",
          }}>OR TRY ONE OF THESE:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => startStory(ex)} style={{
                padding: "11px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "2px solid rgba(255,255,255,0.12)",
                borderRadius: "10px", cursor: "pointer",
                textAlign: "left", color: "rgba(255,255,255,0.7)",
                fontFamily: "'Literata', Georgia, serif",
                fontSize: "13px", fontStyle: "italic",
                animation: `fadeInUp 0.5s ease ${0.25 + i * 0.06}s both`,
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,217,61,0.3)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                "{ex}"
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── READING ──
  const currentChapter = chapters[currentPage];
  const isOnLatest = currentPage === chapters.length - 1;
  const isEnded = currentChapter && !currentChapter.choices;

  return (
    <div style={{
      height: "100vh", background: "#0c0520",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Literata:opsz,wght@7..72,400&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-10px); } }
        @keyframes panelPop { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bubblePop { from { opacity:0; transform:translate(-50%,-50%) scale(0.7); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes sfxPop { from { opacity:0; transform:translate(-50%,-50%) scale(0.5) rotate(-5deg); } to { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(-5deg); } }
      `}</style>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        background: "rgba(12,5,32,0.95)",
        borderBottom: "2px solid rgba(255,217,61,0.15)",
        flexShrink: 0,
      }}>
        <button onClick={() => setScreen("prompt")} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "13px", color: "#ffd93d",
          fontFamily: "'Bangers', cursive", letterSpacing: "1px",
        }}>← BACK</button>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px",
        }}>CHAPTER {currentPage + 1}</div>
        <div style={{ display: "flex", gap: "4px" }}>
          {chapters.map((_, i) => (
            <div key={i} style={{
              width: i === currentPage ? "16px" : "6px", height: "6px", borderRadius: "3px",
              background: i < currentPage ? "#ffd93d" : i === currentPage ? "#ffeaa7" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      <div ref={contentRef} style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "12px" }}>
        {loading && chapters.length === 0 ? (
          <div style={{ height: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: "10px", height: "10px", borderRadius: "50%", background: "#ffd93d",
                  animation: `bounce 1.2s ease ${i * 0.15}s infinite`,
                }} />
              ))}
            </div>
            <p style={{ fontFamily: "'Bangers', cursive", color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}>CREATING YOUR STORY...</p>
          </div>
        ) : error ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Bangers', cursive", color: "#e74c3c", fontSize: "18px" }}>{error}</p>
            <button onClick={() => setScreen("prompt")} style={{
              marginTop: "16px", padding: "10px 24px",
              background: "rgba(255,217,61,0.15)", border: "2px solid rgba(255,217,61,0.3)",
              borderRadius: "10px", color: "#ffd93d",
              fontFamily: "'Bangers', cursive", fontSize: "16px", cursor: "pointer",
            }}>TRY AGAIN</button>
          </div>
        ) : currentChapter ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              {currentChapter.panels?.map((panel, i) => (
                <ComicPanel key={i} panel={panel} panelIndex={i} totalPanels={currentChapter.panels?.length} />
              ))}
            </div>

            {isOnLatest && loading ? (
              <div style={{ padding: "24px", display: "flex", justifyContent: "center", gap: "8px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: "8px", height: "8px", borderRadius: "50%", background: "#ffd93d",
                    animation: `bounce 1.2s ease ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            ) : isOnLatest && currentChapter.choices ? (
              <div style={{ padding: "8px 4px 16px", animation: "fadeInUp 0.5s ease 0.3s both" }}>
                <p style={{
                  fontFamily: "'Bangers', cursive", fontSize: "16px", color: "#ffd93d",
                  letterSpacing: "2px", textAlign: "center", margin: "0 0 12px",
                }}>⚡ WHAT HAPPENS NEXT? ⚡</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentChapter.choices.map((c, i) => (
                    <ChoiceButton key={i} text={c} index={i} onClick={makeChoice} disabled={loading} />
                  ))}
                </div>
              </div>
            ) : isOnLatest && isEnded ? (
              <div style={{ textAlign: "center", padding: "32px 16px", animation: "fadeInUp 0.6s ease" }}>
                <div style={{
                  fontFamily: "'Bangers', cursive", fontSize: "36px", color: "#ffd93d",
                  letterSpacing: "4px", textShadow: "3px 3px 0 #e74c3c", marginBottom: "8px",
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
                  borderRadius: "12px", fontFamily: "'Bangers', cursive",
                  fontSize: "18px", letterSpacing: "2px", cursor: "pointer",
                  boxShadow: "4px 4px 0 #2a2a2a",
                }}>NEW ADVENTURE!</button>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0" }}>
                <button onClick={() => { setCurrentPage(p => p - 1); }} disabled={currentPage === 0}
                  style={{
                    padding: "8px 18px",
                    background: currentPage > 0 ? "rgba(255,217,61,0.1)" : "transparent",
                    border: currentPage > 0 ? "2px solid rgba(255,217,61,0.2)" : "2px solid transparent",
                    borderRadius: "10px", cursor: currentPage > 0 ? "pointer" : "default",
                    color: currentPage > 0 ? "#ffd93d" : "transparent",
                    fontFamily: "'Bangers', cursive", fontSize: "14px", letterSpacing: "1px",
                  }}>← PREV</button>
                <button onClick={() => { setCurrentPage(p => p + 1); }} disabled={currentPage >= chapters.length - 1}
                  style={{
                    padding: "8px 18px",
                    background: currentPage < chapters.length - 1 ? "rgba(255,217,61,0.1)" : "transparent",
                    border: currentPage < chapters.length - 1 ? "2px solid rgba(255,217,61,0.2)" : "2px solid transparent",
                    borderRadius: "10px", cursor: currentPage < chapters.length - 1 ? "pointer" : "default",
                    color: currentPage < chapters.length - 1 ? "#ffd93d" : "transparent",
                    fontFamily: "'Bangers', cursive", fontSize: "14px", letterSpacing: "1px",
                  }}>NEXT →</button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
