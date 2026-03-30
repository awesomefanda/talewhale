"use client";

import { useDrag } from "@/lib/useDrag";

export default function SfxText({ text, x, y, color, delay }) {
  const { pos, isDragging, hasMoved, elRef, onPointerDown, onPointerMove, onPointerUp } = useDrag(x, y);

  return (
    <div
      ref={elRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "absolute",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) rotate(-8deg)`,
        fontFamily: "'Bangers', 'Comic Sans MS', cursive",
        fontSize: "28px",
        fontWeight: 900,
        color: color || "#ffd93d",
        textShadow: isDragging
          ? `3px 3px 12px rgba(0,0,0,0.6), -1px -1px 0 #2a2a2a`
          : `3px 3px 0 #2a2a2a, -1px -1px 0 #2a2a2a, 1px -1px 0 #2a2a2a, -1px 1px 0 #2a2a2a`,
        letterSpacing: "3px",
        zIndex: isDragging ? 10 : 6,
        animation: hasMoved ? "none" : `sfxBam 0.5s ease ${delay}s both`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {text}
    </div>
  );
}
