"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ComicPanel from "@/components/ComicPanel";

function ChoiceButton({ choice, index, onClick }) {
  const [hover, setHover] = useState(false);
  const emojis = ["⚡", "💫", "🔮"];
  return (
    <button
      onClick={() => onClick(choice)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        width: "100%", padding: "13px 16px",
        background: hover ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
        border: `2px solid ${hover ? "#ffd93d" : "rgba(255,255,255,0.2)"}`,
        borderRadius: "12px", cursor: "pointer", textAlign: "left",
        fontFamily: "'Bangers', 'Comic Sans MS', cursive",
        fontSize: "15px", letterSpacing: "0.5px", color: "#fff",
        transition: "all 0.2s ease",
        transform: hover ? "translateX(4px) scale(1.02)" : "none",
        boxShadow: hover ? "0 0 20px rgba(255,217,61,0.2)" : "none",
      }}
    >
      <span style={{ fontSize: "16px", flexShrink: 0 }}>{emojis[index % 3]}</span>
      <span>{choice.text}</span>
    </button>
  );
}

export default function StoryReader() {
  const { storyId } = useParams();
  const router = useRouter();
  const contentRef = useRef(null);

  const [story, setStory] = useState(null);
  const [loadError, setLoadError] = useState(false);
  // visited = array of chapter IDs in the order visited (for prev/next nav)
  const [visited, setVisited] = useState(["ch1"]);
  const [viewIndex, setViewIndex] = useState(0); // which visited chapter we're viewing

  useEffect(() => {
    fetch(`/stories/${storyId}.json`)
      .then(r => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setStory)
      .catch(() => setLoadError(true));
  }, [storyId]);

  const currentChapterId = visited[viewIndex];
  const currentChapter = story?.chapters?.[currentChapterId];
  const isOnLatest = viewIndex === visited.length - 1;
  const isEnded = currentChapter && !currentChapter.choices;

  const makeChoice = (choice) => {
    const newVisited = [...visited.slice(0, viewIndex + 1), choice.next];
    setVisited(newVisited);
    setViewIndex(newVisited.length - 1);
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }, 50);
  };

  const goBack = () => {
    if (viewIndex > 0) {
      setViewIndex(v => v - 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } else {
      router.push("/");
    }
  };

  const goForward = () => {
    if (viewIndex < visited.length - 1) {
      setViewIndex(v => v + 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  if (loadError) {
    return (
      <div style={{
        height: "100vh", background: "#0c0520",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Bangers', cursive", color: "#fff",
        gap: "16px",
      }}>
        <div style={{ fontSize: "48px" }}>🐋</div>
        <p style={{ fontSize: "20px", color: "#ff6b6b" }}>Story not found!</p>
        <button onClick={() => router.push("/")} style={{
          padding: "10px 24px", background: "rgba(255,217,61,0.2)",
          border: "2px solid rgba(255,217,61,0.3)", borderRadius: "10px",
          color: "#ffd93d", cursor: "pointer",
          fontFamily: "'Bangers', cursive", fontSize: "16px",
        }}>← Back to Stories</button>
      </div>
    );
  }

  if (!story) {
    return (
      <div style={{
        height: "100vh", background: "#0c0520",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: "#ffd93d",
              animation: `bounce 1.2s ease ${i * 0.15}s infinite`,
            }} />
          ))}
        </div>
        <style>{`@keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-10px); } }`}</style>
      </div>
    );
  }

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

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        background: "rgba(12,5,32,0.95)",
        borderBottom: "2px solid rgba(255,217,61,0.15)",
        flexShrink: 0,
      }}>
        <button onClick={goBack} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "13px", color: "#ffd93d",
          fontFamily: "'Bangers', cursive", letterSpacing: "1px",
        }}>← BACK</button>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px",
        }}>
          {story.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {visited.map((_, i) => (
            <div key={i} style={{
              width: i === viewIndex ? "16px" : "6px",
              height: "6px", borderRadius: "3px",
              background: i < viewIndex ? "#ffd93d" : i === viewIndex ? "#ffeaa7" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Comic panels */}
      <div ref={contentRef} style={{
        flex: 1, overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        padding: "12px",
      }}>
        {currentChapter && (
          <>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "8px", marginBottom: "16px",
            }}>
              {currentChapter.panels?.map((panel, i) => (
                <ComicPanel key={`${currentChapterId}-${i}`} panel={panel} panelIndex={i} totalPanels={currentChapter.panels?.length} />
              ))}
            </div>

            {isOnLatest && currentChapter.choices ? (
              <div style={{ padding: "8px 4px 16px", animation: "fadeInUp 0.5s ease 0.3s both" }}>
                <p style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "16px", color: "#ffd93d",
                  letterSpacing: "2px", textAlign: "center",
                  margin: "0 0 12px",
                }}>⚡ WHAT HAPPENS NEXT? ⚡</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentChapter.choices.map((choice, i) => (
                    <ChoiceButton key={i} choice={choice} index={i} onClick={makeChoice} />
                  ))}
                </div>
              </div>
            ) : isOnLatest && isEnded ? (
              <div style={{ textAlign: "center", padding: "32px 16px", animation: "fadeInUp 0.6s ease" }}>
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
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => { setVisited(["ch1"]); setViewIndex(0); }} style={{
                    padding: "10px 20px",
                    background: "rgba(255,217,61,0.15)",
                    border: "2px solid rgba(255,217,61,0.3)",
                    borderRadius: "10px", color: "#ffd93d",
                    fontFamily: "'Bangers', cursive", fontSize: "15px",
                    letterSpacing: "1px", cursor: "pointer",
                  }}>READ AGAIN</button>
                  <button onClick={() => router.push("/")} style={{
                    padding: "10px 20px",
                    background: "linear-gradient(135deg, #ffd93d 0%, #e74c3c 100%)",
                    color: "#1a0d3a", border: "3px solid #2a2a2a",
                    borderRadius: "10px",
                    fontFamily: "'Bangers', cursive",
                    fontSize: "15px", letterSpacing: "1px",
                    cursor: "pointer",
                    boxShadow: "3px 3px 0 #2a2a2a",
                  }}>NEW ADVENTURE!</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0" }}>
                <button onClick={goBack} style={{
                  padding: "8px 18px",
                  background: "rgba(255,217,61,0.1)",
                  border: "2px solid rgba(255,217,61,0.2)",
                  borderRadius: "10px", cursor: "pointer",
                  color: "#ffd93d", fontFamily: "'Bangers', cursive",
                  fontSize: "14px", letterSpacing: "1px",
                }}>← PREV</button>
                {viewIndex < visited.length - 1 && (
                  <button onClick={goForward} style={{
                    padding: "8px 18px",
                    background: "rgba(255,217,61,0.1)",
                    border: "2px solid rgba(255,217,61,0.2)",
                    borderRadius: "10px", cursor: "pointer",
                    color: "#ffd93d", fontFamily: "'Bangers', cursive",
                    fontSize: "14px", letterSpacing: "1px",
                  }}>NEXT →</button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
