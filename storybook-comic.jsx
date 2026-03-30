import { useState, useRef, useCallback } from "react";

// ── Comic Panel Component ──
function ComicPanel({ panel, panelIndex, totalPanels }) {
  const layoutStyles = {
    full: { gridColumn: "1 / -1", minHeight: "280px" },
    left: { gridColumn: "1 / 2", minHeight: "240px" },
    right: { gridColumn: "2 / 3", minHeight: "240px" },
    wide: { gridColumn: "1 / -1", minHeight: "200px" },
    tallLeft: { gridColumn: "1 / 2", gridRow: "span 2", minHeight: "400px" },
  };

  return (
    <div style={{
      position: "relative",
      background: panel.bg || "#1a0533",
      borderRadius: "8px",
      overflow: "hidden",
      border: "3px solid #2a2a2a",
      boxShadow: "4px 4px 0 #2a2a2a",
      ...layoutStyles[panel.layout || "full"],
      animation: `panelPop 0.4s ease ${panelIndex * 0.15}s both`,
    }}>
      {/* Scene SVG */}
      <div style={{ position: "absolute", inset: 0 }}>
        {panel.scene}
      </div>

      {/* Speech bubbles */}
      {panel.bubbles?.map((bubble, i) => (
        <SpeechBubble key={i} {...bubble} delay={panelIndex * 0.15 + 0.3 + i * 0.2} />
      ))}

      {/* Narration box */}
      {panel.narration && (
        <NarrationBox text={panel.narration} position={panel.narrationPos || "top"} delay={panelIndex * 0.15 + 0.2} />
      )}

      {/* SFX text */}
      {panel.sfx && (
        <SfxText text={panel.sfx.text} x={panel.sfx.x} y={panel.sfx.y} color={panel.sfx.color} delay={panelIndex * 0.15 + 0.5} />
      )}
    </div>
  );
}

// ── Speech Bubble ──
function SpeechBubble({ text, x, y, tailDir, type, speaker, delay }) {
  const isThought = type === "thought";
  const isWhisper = type === "whisper";
  const isShout = type === "shout";

  return (
    <div style={{
      position: "absolute",
      left: `${x}%`, top: `${y}%`,
      transform: "translate(-50%, -50%)",
      maxWidth: "65%",
      animation: `bubblePop 0.35s ease ${delay}s both`,
      zIndex: 5,
    }}>
      <div style={{
        background: isShout ? "#fff3cd" : "#fff",
        border: isShout ? "3px solid #e74c3c" : isWhisper ? "2px dashed #999" : "2.5px solid #2a2a2a",
        borderRadius: isThought ? "50% 50% 50% 50% / 60% 60% 40% 40%" : "18px",
        padding: isShout ? "10px 14px" : "8px 14px",
        fontFamily: "'Bangers', 'Comic Sans MS', cursive",
        fontSize: isShout ? "16px" : isWhisper ? "12px" : "13.5px",
        fontWeight: isShout ? 700 : 400,
        letterSpacing: isShout ? "1px" : "0.5px",
        color: isWhisper ? "#666" : "#2a2a2a",
        textAlign: "center",
        lineHeight: 1.35,
        fontStyle: isWhisper ? "italic" : "normal",
        boxShadow: isShout ? "2px 2px 0 #e74c3c" : "2px 2px 0 rgba(0,0,0,0.15)",
        position: "relative",
      }}>
        {speaker && (
          <div style={{
            fontSize: "9px", fontWeight: 700,
            color: "#b4783c", letterSpacing: "1px",
            marginBottom: "2px", textTransform: "uppercase",
            fontFamily: "'Bangers', cursive",
          }}>{speaker}</div>
        )}
        {text}
      </div>
      {/* Tail */}
      {!isThought && (
        <div style={{
          position: "absolute",
          [tailDir === "left" ? "left" : tailDir === "right" ? "right" : "left"]: tailDir === "center" ? "45%" : "20%",
          bottom: "-12px",
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `14px solid ${isShout ? "#fff3cd" : "#fff"}`,
          filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.15))",
        }} />
      )}
      {isThought && (
        <>
          <div style={{
            position: "absolute", bottom: "-8px",
            left: tailDir === "right" ? "70%" : "30%",
            width: "10px", height: "10px", borderRadius: "50%",
            background: "#fff", border: "2px solid #2a2a2a",
          }} />
          <div style={{
            position: "absolute", bottom: "-16px",
            left: tailDir === "right" ? "75%" : "25%",
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#fff", border: "2px solid #2a2a2a",
          }} />
        </>
      )}
    </div>
  );
}

// ── Narration Box ──
function NarrationBox({ text, position, delay }) {
  const posStyles = {
    top: { top: "8px", left: "8px", right: "auto" },
    topRight: { top: "8px", right: "8px", left: "auto" },
    bottom: { bottom: "8px", left: "8px", right: "auto" },
    bottomRight: { bottom: "8px", right: "8px", left: "auto" },
    topWide: { top: "8px", left: "8px", right: "8px" },
  };

  return (
    <div style={{
      position: "absolute",
      ...posStyles[position],
      maxWidth: position === "topWide" ? "100%" : "70%",
      background: "linear-gradient(135deg, #fdf6ec 0%, #f5e6d0 100%)",
      border: "2px solid #b4783c",
      padding: "8px 12px",
      fontFamily: "'Literata', 'Georgia', serif",
      fontSize: "11.5px",
      fontStyle: "italic",
      color: "#5a3e28",
      lineHeight: 1.45,
      zIndex: 4,
      boxShadow: "2px 2px 0 rgba(180, 120, 60, 0.3)",
      animation: `slideIn 0.4s ease ${delay}s both`,
    }}>
      {text}
    </div>
  );
}

// ── SFX Text ──
function SfxText({ text, x, y, color, delay }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`, top: `${y}%`,
      transform: "translate(-50%, -50%) rotate(-8deg)",
      fontFamily: "'Bangers', 'Comic Sans MS', cursive",
      fontSize: "28px",
      fontWeight: 900,
      color: color || "#ffd93d",
      textShadow: `3px 3px 0 #2a2a2a, -1px -1px 0 #2a2a2a, 1px -1px 0 #2a2a2a, -1px 1px 0 #2a2a2a`,
      letterSpacing: "3px",
      zIndex: 6,
      animation: `sfxBam 0.5s ease ${delay}s both`,
    }}>
      {text}
    </div>
  );
}


// ── Scene Builders ──
const Scenes = {
  foxForestNight: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <defs>
        <linearGradient id="cn1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0520" /><stop offset="100%" stopColor="#1a0d3a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cn1)" />
      {[{x:30,y:20},{x:80,y:40},{x:150,y:15},{x:220,y:30},{x:290,y:18},{x:350,y:45},{x:170,y:50}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r={1.2} fill="#fff" opacity={0.5}>
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="340" cy="40" r="22" fill="#ffeaa7" opacity="0.8" />
      <circle cx="348" cy="36" r="19" fill="url(#cn1)" />
      <ellipse cx="200" cy="310" rx="250" ry="60" fill="#0d2818" />
      <ellipse cx="200" cy="305" rx="240" ry="50" fill="#163d28" />
      <polygon points="50,120 72,300 28,300" fill="#0d2818" />
      <polygon points="50,90 78,200 22,200" fill="#163d28" />
      <polygon points="50,70 82,155 18,155" fill="#1e5035" />
      <polygon points="350,130 372,300 328,300" fill="#0d2818" />
      <polygon points="350,100 378,210 322,210" fill="#163d28" />
      <polygon points="350,80 382,165 318,165" fill="#1e5035" />
      <polygon points="120,150 142,300 98,300" fill="#0d2818" opacity="0.7" />
      <polygon points="120,125 145,220 95,220" fill="#163d28" opacity="0.7" />
      <polygon points="280,160 302,300 258,300" fill="#0d2818" opacity="0.7" />
      <polygon points="280,135 305,230 255,230" fill="#163d28" opacity="0.7" />
      {/* Fox */}
      <g transform="translate(190, 240)">
        <ellipse cx="0" cy="5" rx="20" ry="13" fill="#d4652a" />
        <circle cx="0" cy="-10" r="12" fill="#e07830" />
        <polygon points="-7,-20 -10,-34 -2,-19" fill="#e07830" />
        <polygon points="7,-20 10,-34 2,-19" fill="#e07830" />
        <polygon points="-6,-19 -9,-30 -2,-18" fill="#f4a460" />
        <polygon points="6,-19 9,-30 2,-18" fill="#f4a460" />
        <ellipse cx="0" cy="-5" rx="7" ry="4" fill="#f4a460" />
        <circle cx="-4" cy="-11" r="2.5" fill="#1a0d3a" />
        <circle cx="4" cy="-11" r="2.5" fill="#1a0d3a" />
        <circle cx="-3.5" cy="-11.5" r="0.8" fill="#fff" />
        <circle cx="4.5" cy="-11.5" r="0.8" fill="#fff" />
        <ellipse cx="0" cy="-7" rx="1.5" ry="1" fill="#333" />
        <path d="M 18,8 Q 35,-5 30,15 Q 25,25 16,15" fill="#d4652a" />
        <path d="M 30,15 Q 26,22 18,16" fill="#f4a460" />
      </g>
      {/* Glowing feather */}
      <g transform="translate(160, 250)">
        <ellipse cx="0" cy="0" rx="6" ry="18" fill="#ffeaa7" opacity="0.15" transform="rotate(-12)">
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
        </ellipse>
        <path d="M -1,10 Q 0,-8 1,-12 Q 0.5,-6 0,10 Z" fill="#ffeaa7" stroke="#ffd700" strokeWidth="0.5">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  ),

  foxWingsClose: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <defs>
        <linearGradient id="cn2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0d3a" /><stop offset="100%" stopColor="#2d1b69" />
        </linearGradient>
        <radialGradient id="sparkle"><stop offset="0%" stopColor="#ffeaa7" /><stop offset="100%" stopColor="#ffeaa7" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cn2)" />
      {/* Sparkle vortex */}
      {Array.from({length:20}).map((_,i) => {
        const angle = (i/20)*Math.PI*2;
        const r = 40 + i*5;
        return <circle key={i} cx={200+Math.cos(angle)*r} cy={150+Math.sin(angle)*r*0.6} r={1.5} fill="#ffeaa7" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1+i*0.15}s`} repeatCount="indefinite" />
        </circle>;
      })}
      {/* Big fox close-up */}
      <g transform="translate(200, 165) scale(2.5)">
        <ellipse cx="0" cy="12" rx="25" ry="16" fill="#d4652a" />
        <circle cx="0" cy="-5" r="18" fill="#e07830" />
        <polygon points="-10,-20 -15,-38 -3,-18" fill="#e07830" />
        <polygon points="10,-20 15,-38 3,-18" fill="#e07830" />
        <polygon points="-9,-18 -13,-33 -3,-17" fill="#f4a460" />
        <polygon points="9,-18 13,-33 3,-17" fill="#f4a460" />
        <ellipse cx="0" cy="0" rx="10" ry="6" fill="#f4a460" />
        <circle cx="-6" cy="-6" r="4" fill="#1a0d3a" />
        <circle cx="6" cy="-6" r="4" fill="#1a0d3a" />
        <circle cx="-5" cy="-7" r="1.3" fill="#fff" />
        <circle cx="7" cy="-7" r="1.3" fill="#fff" />
        <ellipse cx="0" cy="-2" rx="2.2" ry="1.5" fill="#333" />
        {/* Tiny wings appearing */}
        <path d="M -22,8 Q -35,-5 -28,12" fill="#ffa64d" opacity="0.7" strokeWidth="1" stroke="#ffd700">
          <animate attributeName="d" values="M -22,8 Q -35,-5 -28,12;M -22,8 Q -38,-10 -30,10;M -22,8 Q -35,-5 -28,12" dur="0.8s" repeatCount="indefinite" />
        </path>
        <path d="M 22,8 Q 35,-5 28,12" fill="#ffa64d" opacity="0.7" strokeWidth="1" stroke="#ffd700">
          <animate attributeName="d" values="M 22,8 Q 35,-5 28,12;M 22,8 Q 38,-10 30,10;M 22,8 Q 35,-5 28,12" dur="0.8s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  ),

  foxOwlHill: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <defs>
        <linearGradient id="cn3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1445" /><stop offset="60%" stopColor="#1a237e" /><stop offset="100%" stopColor="#283593" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cn3)" />
      {Array.from({length:15}).map((_,i) => (
        <circle key={i} cx={25+i*26} cy={10+Math.sin(i*1.5)*20} r={1} fill="#fff" opacity={0.4+Math.random()*0.4} />
      ))}
      {/* Hill */}
      <ellipse cx="200" cy="340" rx="280" ry="130" fill="#1e5035" />
      <ellipse cx="200" cy="335" rx="270" ry="120" fill="#2d6a45" />
      {/* Grass */}
      {[80,140,200,260,320].map((x,i) => (
        <g key={i}>
          <line x1={x} y1={230-Math.sin(x/60)*12} x2={x-3} y2={220-Math.sin(x/60)*12} stroke="#4a9a5e" strokeWidth="1.5" />
          <line x1={x} y1={230-Math.sin(x/60)*12} x2={x+3} y2={218-Math.sin(x/60)*12} stroke="#4a9a5e" strokeWidth="1.5" />
        </g>
      ))}
      {/* Owl on stump */}
      <g transform="translate(300, 195)">
        <rect x="-8" y="10" width="16" height="20" fill="#5a3e28" rx="2" />
        <ellipse cx="0" cy="10" rx="10" ry="4" fill="#6b4c32" />
        <ellipse cx="0" cy="2" rx="10" ry="14" fill="#8b7355" />
        <ellipse cx="0" cy="6" rx="7" ry="9" fill="#a08060" />
        <circle cx="0" cy="-8" r="9" fill="#8b7355" />
        <polygon points="-5,-15 -7,-22 -1,-14" fill="#8b7355" />
        <polygon points="5,-15 7,-22 1,-14" fill="#8b7355" />
        <circle cx="-4" cy="-9" r="4" fill="#ffeaa7" />
        <circle cx="4" cy="-9" r="4" fill="#ffeaa7" />
        <circle cx="-4" cy="-9" r="2.2" fill="#333" />
        <circle cx="4" cy="-9" r="2.2" fill="#333" />
        <circle cx="-4" cy="-9" r="4.5" fill="none" stroke="#c8a84e" strokeWidth="0.6" />
        <circle cx="4" cy="-9" r="4.5" fill="none" stroke="#c8a84e" strokeWidth="0.6" />
        <line x1="0" y1="-9" x2="0" y2="-9" stroke="#c8a84e" strokeWidth="0.6" />
        <polygon points="0,-5 -2,-2 2,-2" fill="#e6a817" />
      </g>
      {/* Fox on hill */}
      <g transform="translate(160, 235)">
        <ellipse cx="0" cy="5" rx="18" ry="11" fill="#d4652a" />
        <circle cx="-3" cy="-8" r="11" fill="#e07830" />
        <polygon points="-9,-16 -12,-28 -4,-15" fill="#e07830" />
        <polygon points="3,-16 6,-28 -2,-15" fill="#e07830" />
        <polygon points="-8,-15 -11,-25 -4,-14" fill="#f4a460" />
        <polygon points="2,-15 5,-25 -2,-14" fill="#f4a460" />
        <circle cx="-6" cy="-9" r="2.2" fill="#1a237e" />
        <circle cx="0" cy="-9" r="2.2" fill="#1a237e" />
        <ellipse cx="-3" cy="-5" rx="5" ry="3" fill="#f4a460" />
        <ellipse cx="-3" cy="-6" rx="1.2" ry="0.8" fill="#333" />
        {/* Wings */}
        <path d="M -16,2 Q -26,-8 -20,6" fill="#ffa64d" opacity="0.6" />
        <path d="M 16,2 Q 26,-8 20,6" fill="#ffa64d" opacity="0.6" />
        <path d="M 16,8 Q 32,-2 28,14 Q 24,20 14,13" fill="#d4652a" />
      </g>
      {/* Wind lines */}
      {[{x:100,y:210,w:30},{x:120,y:220,w:25},{x:240,y:215,w:35}].map((l,i) => (
        <line key={i} x1={l.x} y1={l.y} x2={l.x+l.w} y2={l.y-3} stroke="#fff" strokeWidth="0.8" opacity="0.15">
          <animate attributeName="x1" values={`${l.x};${l.x+10};${l.x}`} dur="3s" repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  ),

  foxFlying: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <defs>
        <linearGradient id="cn4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8c42" /><stop offset="40%" stopColor="#ff6b6b" /><stop offset="100%" stopColor="#6c5ce7" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cn4)" />
      <g opacity="0.35">
        <ellipse cx="70" cy="50" rx="45" ry="16" fill="#fff" />
        <ellipse cx="90" cy="45" rx="30" ry="12" fill="#fff" />
        <ellipse cx="310" cy="70" rx="40" ry="14" fill="#fff" />
      </g>
      <circle cx="360" cy="40" r="28" fill="#ffeaa7" opacity="0.7" />
      <circle cx="360" cy="40" r="18" fill="#fff" opacity="0.25" />
      {/* Distant ground */}
      <rect x="0" y="250" width="400" height="50" fill="#1e5035" opacity="0.5" />
      {[40,90,140,190,250,310,360].map((x,i) => (
        <polygon key={i} points={`${x},250 ${x+8},300 ${x-8},300`} fill="#163d28" opacity="0.5" />
      ))}
      {/* Flying fox — center stage */}
      <g transform="translate(200, 140)">
        <path d="M -18,0 Q -50,-35 -65,-20 Q -45,-8 -18,6" fill="#ffa64d" opacity="0.75" stroke="#ffd700" strokeWidth="0.5">
          <animate attributeName="d" values="M -18,0 Q -50,-35 -65,-20 Q -45,-8 -18,6;M -18,0 Q -50,-45 -65,-28 Q -45,-12 -18,6;M -18,0 Q -50,-35 -65,-20 Q -45,-8 -18,6" dur="0.7s" repeatCount="indefinite" />
        </path>
        <path d="M 18,0 Q 50,-35 65,-20 Q 45,-8 18,6" fill="#ffa64d" opacity="0.75" stroke="#ffd700" strokeWidth="0.5">
          <animate attributeName="d" values="M 18,0 Q 50,-35 65,-20 Q 45,-8 18,6;M 18,0 Q 50,-45 65,-28 Q 45,-12 18,6;M 18,0 Q 50,-35 65,-20 Q 45,-8 18,6" dur="0.7s" repeatCount="indefinite" />
        </path>
        <ellipse cx="0" cy="6" rx="20" ry="13" fill="#d4652a" />
        <circle cx="0" cy="-8" r="13" fill="#e07830" />
        <polygon points="-8,-18 -11,-30 -2,-17" fill="#e07830" />
        <polygon points="8,-18 11,-30 2,-17" fill="#e07830" />
        <polygon points="-7,-17 -10,-27 -2,-16" fill="#f4a460" />
        <polygon points="7,-17 10,-27 2,-16" fill="#f4a460" />
        <ellipse cx="0" cy="-3" rx="7" ry="4" fill="#f4a460" />
        <circle cx="-5" cy="-9" r="3" fill="#ff6b6b" />
        <circle cx="5" cy="-9" r="3" fill="#ff6b6b" />
        <circle cx="-5" cy="-9" r="1.5" fill="#fff" />
        <circle cx="5" cy="-9" r="1.5" fill="#fff" />
        <ellipse cx="0" cy="-5" rx="1.5" ry="1" fill="#333" />
        <path d="M -5,-3 Q 0,0 5,-3" fill="none" stroke="#c0392b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 18,12 Q 35,0 30,18 Q 26,25 16,16" fill="#d4652a" />
        <path d="M 30,18 Q 27,23 18,17" fill="#f4a460" />
        {/* Sparkle trail */}
        {[{x:-25,y:20},{x:-40,y:28},{x:-55,y:22},{x:-70,y:30}].map((p,i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2-i*0.4} fill="#ffeaa7" opacity="0.5">
            <animate attributeName="opacity" values="0.7;0;0.7" dur={`${1.2+i*0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {/* Motion lines */}
      {[{y:120},{y:140},{y:160}].map((l,i) => (
        <line key={i} x1="80" y1={l.y} x2="115" y2={l.y} stroke="#fff" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      ))}
      {/* Birds */}
      <path d="M 50,90 Q 56,84 62,90" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
      <path d="M 75,100 Q 81,94 87,100" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
    </svg>
  ),

  blueberryBush: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <defs>
        <linearGradient id="cn5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a237e" /><stop offset="100%" stopColor="#283593" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cn5)" />
      {/* Big blueberry bush */}
      <g transform="translate(200, 160)">
        <circle cx="0" cy="0" r="60" fill="#2d5a3f" />
        <circle cx="-25" cy="15" rx="45" ry="45" fill="#1e5035" />
        <circle cx="25" cy="10" rx="45" ry="45" fill="#234d35" />
        <circle cx="0" cy="-15" r="50" fill="#357a4d" />
        {/* Berries */}
        {[{x:-20,y:-5},{x:15,y:10},{x:-10,y:20},{x:25,y:-10},{x:-30,y:10},{x:5,y:30},{x:30,y:25},{x:-15,y:-20},{x:10,y:-25}].map((b,i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r="5" fill="#4a69bd" />
            <circle cx={b.x-1} cy={b.y-1.5} r="1.5" fill="#6a89cc" opacity="0.6" />
          </g>
        ))}
      </g>
      {/* Ground */}
      <ellipse cx="200" cy="310" rx="260" ry="80" fill="#163d28" />
      {/* Fox upside down in bush */}
      <g transform="translate(200, 180) rotate(25)">
        <ellipse cx="0" cy="0" rx="16" ry="10" fill="#d4652a" />
        <circle cx="8" cy="-8" r="10" fill="#e07830" />
        <polygon points="12,-16 16,-26 8,-15" fill="#e07830" />
        <polygon points="4,-14 7,-24 1,-13" fill="#e07830" />
        <circle cx="6" cy="-9" r="2" fill="#1a237e" />
        <circle cx="11" cy="-9" r="2" fill="#1a237e" />
        {/* Dizzy spirals */}
        <circle cx="4" cy="-14" r="3" fill="none" stroke="#ffd93d" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="14" cy="-14" r="3" fill="none" stroke="#ffd93d" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        {/* Legs sticking up */}
        <line x1="-5" y1="-2" x2="-10" y2="-12" stroke="#d4652a" strokeWidth="4" strokeLinecap="round" />
        <line x1="5" y1="5" x2="10" y2="-5" stroke="#d4652a" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  ),
};


// ── Story Data with Comic Panels ──
const COMIC_STORIES = {
  "A brave little fox who learns to fly": [
    // Chapter 1: Discovery
    {
      panels: [
        {
          layout: "full",
          scene: Scenes.foxForestNight,
          narration: "In a forest where the trees touched the clouds, there lived a small red fox named Pip...",
          narrationPos: "top",
        },
        {
          layout: "left",
          scene: Scenes.foxForestNight,
          bubbles: [{
            text: "If only I could see the world from up there...",
            x: 55, y: 25, tailDir: "left", type: "whisper",
          }],
          narration: "Every evening, Pip watched the birds soar above the canopy.",
          narrationPos: "bottom",
        },
        {
          layout: "right",
          scene: Scenes.foxForestNight,
          narration: "One morning, Pip found something extraordinary near the Old Wishing Stump.",
          narrationPos: "top",
          sfx: { text: "✨GLOW✨", x: 50, y: 65, color: "#ffeaa7" },
        },
      ],
      choices: [
        "Pick up the glowing feather",
        "Follow the trail deeper into the forest",
        "Tell Grandmother Fox about it"
      ]
    },
    // Chapter 2: Transformation
    {
      panels: [
        {
          layout: "wide",
          scene: Scenes.foxWingsClose,
          narration: "The moment fur met quill, a warm tingle raced through Pip's entire body...",
          narrationPos: "topWide",
          sfx: { text: "WHOOOOSH!", x: 50, y: 55, color: "#ffa64d" },
        },
        {
          layout: "left",
          scene: Scenes.foxWingsClose,
          bubbles: [{
            text: "OH! What's happening to me?!",
            x: 50, y: 20, tailDir: "center", type: "shout",
          }],
          narration: "Two small, shimmering wings appeared on Pip's back — no bigger than maple leaves.",
          narrationPos: "bottom",
        },
        {
          layout: "right",
          scene: Scenes.foxOwlHill,
          bubbles: [
            { text: "Ahem. Fascinating.", x: 55, y: 20, tailDir: "center", speaker: "Prof. Hoot" },
          ],
          narration: "A wise old owl watched from a nearby branch, adjusting his spectacles.",
          narrationPos: "bottom",
        },
      ],
      choices: [
        "Ask Professor Hoot for flying lessons",
        "Try to fly solo — how hard can it be?",
        "Find more feathers to make the wings bigger"
      ]
    },
    // Chapter 3: Flying!
    {
      panels: [
        {
          layout: "full",
          scene: Scenes.foxOwlHill,
          bubbles: [
            { text: "Flying is not about the wings. It is about believing the sky will catch you.", x: 65, y: 18, tailDir: "center", speaker: "Prof. Hoot" },
          ],
          narration: "He led Pip to the top of Whispering Hill, where the wind sang through the tall grass.",
          narrationPos: "bottom",
        },
        {
          layout: "left",
          scene: Scenes.foxFlying,
          bubbles: [{
            text: "I'm... I'm FLYING!!!",
            x: 50, y: 20, tailDir: "center", type: "shout",
          }],
          sfx: { text: "WOOHOO!", x: 75, y: 70, color: "#ffd93d" },
        },
        {
          layout: "right",
          scene: Scenes.blueberryBush,
          sfx: { text: "CRASH!", x: 50, y: 30, color: "#ff6b6b" },
          bubbles: [{
            text: "Lesson two: never look down.",
            x: 55, y: 75, tailDir: "right", speaker: "Prof. Hoot",
          }],
        },
      ],
      choices: null
    }
  ],
};

const PROMPTS_EXAMPLES = [
  { text: "A brave little fox who learns to fly", icon: "🦊" },
  { text: "A magical garden that grows candy", icon: "🍬" },
  { text: "A robot who wants to learn how to paint", icon: "🤖" },
  { text: "Pirates who discover an underwater city", icon: "🏴‍☠️" },
  { text: "A dinosaur's first day at school", icon: "🦕" },
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


export default function ComicStoryApp() {
  const [screen, setScreen] = useState("home");
  const [prompt, setPrompt] = useState("");
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [storyEnded, setStoryEnded] = useState(false);
  const [focusedExample, setFocusedExample] = useState(null);
  const contentRef = useRef(null);

  const generateChapter = useCallback(async (storyPrompt, choiceIndex, existingChapters) => {
    setLoading(true);
    const sampleKey = Object.keys(COMIC_STORIES).find(k =>
      storyPrompt.toLowerCase().includes(k.toLowerCase().slice(0, 15))
    );

    if (sampleKey && COMIC_STORIES[sampleKey][existingChapters.length]) {
      await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
      const chapter = COMIC_STORIES[sampleKey][existingChapters.length];
      if (!chapter.choices) setStoryEnded(true);
      setChapters(prev => [...prev, chapter]);
      setCurrentPage(existingChapters.length);
    } else {
      await new Promise(r => setTimeout(r, 1200));
      const fallback = {
        panels: [
          {
            layout: "full",
            scene: Scenes.foxForestNight,
            narration: `The adventure of "${storyPrompt}" was about to begin...`,
            narrationPos: "top",
            bubbles: [{ text: "This story is being crafted just for you!", x: 50, y: 55, tailDir: "center" }],
          },
        ],
        choices: existingChapters.length < 2
          ? ["Continue boldly!", "Take the quiet path", "Search for secrets"]
          : null,
      };
      if (!fallback.choices) setStoryEnded(true);
      setChapters(prev => [...prev, fallback]);
      setCurrentPage(existingChapters.length);
    }
    setLoading(false);
  }, []);

  const startStory = (text) => {
    const p = text || prompt;
    if (!p.trim()) return;
    setPrompt(p);
    setChapters([]);
    setCurrentPage(0);
    setStoryEnded(false);
    setScreen("reading");
    generateChapter(p, null, []);
  };

  const makeChoice = (i) => generateChapter(prompt, i, chapters);

  const goToPage = (dir) => {
    const next = currentPage + dir;
    if (next >= 0 && next < chapters.length) {
      setCurrentPage(next);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  // ── HOME ──
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
          @keyframes panelPop { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
          @keyframes bubblePop { from { opacity:0; transform:translate(-50%,-50%) scale(0.5); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
          @keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
          @keyframes sfxBam { from { opacity:0; transform:translate(-50%,-50%) scale(0.3) rotate(-20deg); } to { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(-8deg); } }
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
          }}>STORYWEAVER</h1>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0,
            fontFamily: "'Literata', Georgia, serif",
            fontStyle: "italic", letterSpacing: "1px",
          }}>Your story. Your adventure. Your comic.</p>
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

  // ── READING (Comic Layout) ──
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
        @keyframes panelPop { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes bubblePop { from { opacity:0; transform:translate(-50%,-50%) scale(0.4); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
        @keyframes sfxBam { from { opacity:0; transform:translate(-50%,-50%) scale(0.3) rotate(-20deg); } to { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(-8deg); } }
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
          {Array.from({ length: chapters.length + (storyEnded ? 0 : 1) }).map((_, i) => (
            <div key={i} style={{
              width: i === currentPage ? "16px" : "6px",
              height: "6px", borderRadius: "3px",
              background: i <= currentPage ? "#ffd93d" : "rgba(255,255,255,0.15)",
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
        {loading && chapters.length === currentPage ? (
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

            {/* Choices */}
            {currentPage === chapters.length - 1 && currentChapter.choices && !loading ? (
              <div style={{
                padding: "8px 4px 16px",
                animation: "fadeInUp 0.5s ease 0.6s both",
              }}>
                <p style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "16px", color: "#ffd93d",
                  letterSpacing: "2px", textAlign: "center",
                  margin: "0 0 10px",
                }}>⚡ WHAT HAPPENS NEXT? ⚡</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentChapter.choices.map((c, i) => (
                    <ChoiceButton key={i} text={c} index={i} onClick={makeChoice} disabled={loading} />
                  ))}
                </div>
              </div>
            ) : currentPage === chapters.length - 1 && storyEnded ? (
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
                padding: "8px 0",
              }}>
                <button onClick={() => goToPage(-1)} disabled={currentPage === 0}
                  style={{
                    padding: "8px 18px", background: currentPage > 0 ? "rgba(255,217,61,0.1)" : "transparent",
                    border: currentPage > 0 ? "2px solid rgba(255,217,61,0.2)" : "2px solid transparent",
                    borderRadius: "10px", cursor: currentPage > 0 ? "pointer" : "default",
                    color: currentPage > 0 ? "#ffd93d" : "transparent",
                    fontFamily: "'Bangers', cursive", fontSize: "14px", letterSpacing: "1px",
                  }}>← PREV</button>
                <button onClick={() => goToPage(1)} disabled={currentPage >= chapters.length - 1}
                  style={{
                    padding: "8px 18px", background: currentPage < chapters.length - 1 ? "rgba(255,217,61,0.1)" : "transparent",
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
