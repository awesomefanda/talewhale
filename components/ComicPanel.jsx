"use client";

import { useState } from "react";
import { getSceneComponent } from "@/lib/scenes";
import NarrationBox from "./NarrationBox";
import SpeechBubble from "./SpeechBubble";
import SfxText from "./SfxText";
import SpotItem from "./SpotItem";

export default function ComicPanel({ panel, panelIndex = 0, totalPanels = 1 }) {
  const { layout, narration, narrationPos, sceneHint, bubbles, sfx, tapReveal, spotItems, spotPrompt } = panel;
  const Scene = getSceneComponent(sceneHint);

  // tapReveal panels start covered; everything else starts revealed
  const [revealed, setRevealed] = useState(!tapReveal);
  const [bursting, setBursting] = useState(false);

  const handleTap = () => {
    setBursting(true);
    setRevealed(true);
  };

  const layoutStyles = {
    full:     { gridColumn: "1 / -1", minHeight: "280px" },
    left:     { gridColumn: "1 / 2",  minHeight: "240px" },
    right:    { gridColumn: "2 / 3",  minHeight: "240px" },
    wide:     { gridColumn: "1 / -1", minHeight: "200px" },
    tallLeft: { gridColumn: "1 / 2",  gridRow: "span 2", minHeight: "400px" },
  };

  return (
    <div style={{
      position: "relative",
      background: "#1a0533",
      borderRadius: "8px",
      overflow: "hidden",
      border: "3px solid #2a2a2a",
      boxShadow: "4px 4px 0 #2a2a2a",
      ...layoutStyles[layout || "full"],
      animation: `panelPop 0.4s ease ${panelIndex * 0.15}s both`,
    }}>
      {/* Scene SVG */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Scene />
      </div>

      {/* Narration — always visible (acts as hint while covered) */}
      {narration && (
        <NarrationBox text={narration} position={narrationPos || "top"} delay={panelIndex * 0.15 + 0.2} />
      )}

      {/* Bubbles and SFX — hidden until revealed */}
      {revealed && bubbles?.map((bubble, i) => (
        <SpeechBubble key={i} {...bubble} delay={panelIndex * 0.15 + 0.3 + i * 0.2} />
      ))}
      {revealed && sfx && (
        <SfxText text={sfx.text} x={sfx.x} y={sfx.y} color={sfx.color} delay={panelIndex * 0.15 + 0.5} />
      )}

      {/* I Spy spot items */}
      {spotItems?.map((item, i) => (
        <SpotItem key={i} item={item} index={i} />
      ))}

      {/* I Spy prompt banner */}
      {spotPrompt && (
        <div style={{
          position: "absolute", bottom: "8px", left: "8px", right: "8px",
          background: "rgba(10,4,28,0.85)",
          border: "2px solid #ffd93d",
          borderRadius: "8px",
          padding: "5px 10px",
          fontFamily: "'Bangers', cursive",
          fontSize: "13px", letterSpacing: "1px",
          color: "#ffd93d",
          textAlign: "center",
          zIndex: 7,
        }}>
          🔍 {spotPrompt}
        </div>
      )}

      {/* Tap-to-reveal overlay */}
      {!revealed && tapReveal && (
        <div
          onClick={handleTap}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "rgba(10, 4, 28, 0.55)",
            cursor: "pointer",
            zIndex: 15,
            gap: "8px",
          }}
        >
          <div style={{
            fontSize: "44px",
            animation: "peekBounce 1s ease-in-out infinite",
          }}>
            {tapReveal.emoji || "👀"}
          </div>
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "18px",
            letterSpacing: "2px",
            color: "#ffd93d",
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
            textAlign: "center",
            padding: "0 12px",
          }}>
            {tapReveal.coverText || "TAP TO PEEK!"}
          </div>
        </div>
      )}

      {/* PEEKABOO burst on reveal */}
      {bursting && (
        <div
          onAnimationEnd={() => setBursting(false)}
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
            zIndex: 20,
            animation: "peekBurst 0.6s ease forwards",
          }}
        >
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "42px",
            letterSpacing: "4px",
            color: tapReveal?.burstColor || "#fd79a8",
            textShadow: "3px 3px 0 #2a2a2a, -1px -1px 0 #2a2a2a",
          }}>
            {tapReveal?.burstText || "PEEKABOO!"}
          </div>
        </div>
      )}

      <style>{`
        @keyframes peekBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-8px) scale(1.15); }
        }
        @keyframes peekBurst {
          0%   { opacity: 0; transform: scale(0.4); }
          40%  { opacity: 1; transform: scale(1.2); }
          70%  { opacity: 1; transform: scale(1);   }
          100% { opacity: 0; transform: scale(1);   }
        }
      `}</style>
    </div>
  );
}
