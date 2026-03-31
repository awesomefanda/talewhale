"use client";

import { useState } from "react";

const REACTIONS = ["YAY! 🎉", "FOUND IT! ⭐", "WOW! ✨", "NICE! 🌟", "YES! 💫"];

export default function SpotItem({ item, index }) {
  const [found, setFound] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    if (found) return;
    setBurst(true);
    setFound(true);
  };

  const reaction = REACTIONS[index % REACTIONS.length];

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          left: `${item.x}%`,
          top: `${item.y}%`,
          transform: "translate(-50%, -50%)",
          width: item.size || "48px",
          height: item.size || "48px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px",
          cursor: found ? "default" : "pointer",
          zIndex: 8,
          filter: found ? "none" : "drop-shadow(0 0 6px rgba(255,217,61,0.0))",
          animation: found ? "none" : `spotPulse 2s ease ${index * 0.4}s infinite`,
          transition: "transform 0.2s ease",
        }}
      >
        {/* The emoji/icon */}
        <span style={{ fontSize: item.fontSize || "28px" }}>{item.emoji}</span>

        {/* Pulsing ring while not found */}
        {!found && (
          <div style={{
            position: "absolute", inset: "-6px",
            borderRadius: "50%",
            border: "2px dashed rgba(255,217,61,0.6)",
            animation: `ringPulse 2s ease ${index * 0.4}s infinite`,
          }} />
        )}

        {/* Found checkmark */}
        {found && (
          <div style={{
            position: "absolute", top: "-6px", right: "-6px",
            width: "18px", height: "18px",
            background: "#00b894",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", color: "#fff",
            fontWeight: 900,
            border: "2px solid #fff",
          }}>✓</div>
        )}
      </div>

      {/* Reaction burst */}
      {burst && (
        <div
          onAnimationEnd={() => setBurst(false)}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: "translate(-50%, -50%)",
            fontFamily: "'Bangers', cursive",
            fontSize: "22px",
            color: "#ffd93d",
            textShadow: "2px 2px 0 #2a2a2a",
            letterSpacing: "2px",
            pointerEvents: "none",
            zIndex: 20,
            whiteSpace: "nowrap",
            animation: "spotFound 0.8s ease forwards",
          }}
        >
          {reaction}
        </div>
      )}

      <style>{`
        @keyframes spotPulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    }
          50%       { transform: translate(-50%,-50%) scale(1.15); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; transform: scale(1);   }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes spotFound {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          30%  { opacity: 1; transform: translate(-50%, -80%) scale(1.2); }
          70%  { opacity: 1; transform: translate(-50%, -90%) scale(1);   }
          100% { opacity: 0; transform: translate(-50%, -110%) scale(0.8);}
        }
      `}</style>
    </>
  );
}
