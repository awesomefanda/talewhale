"use client";

import { useState, useRef } from "react";

export default function NarrationBox({ text, position, delay }) {
  const [dragPos, setDragPos] = useState(null); // {x, y} px from panel top-left; null = default position
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStart = useRef(null);
  const boxRef = useRef(null);

  const posStyles = {
    top:         { top: "8px",    left: "8px",  right: "auto",  bottom: "auto" },
    topRight:    { top: "8px",    right: "8px", left: "auto",   bottom: "auto" },
    bottom:      { bottom: "8px", left: "8px",  right: "auto",  top: "auto"    },
    bottomRight: { bottom: "8px", right: "8px", left: "auto",   top: "auto"    },
    topWide:     { top: "8px",    left: "8px",  right: "8px",   bottom: "auto" },
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const box = boxRef.current;
    const panel = box.parentElement;
    const boxRect = box.getBoundingClientRect();

    dragStart.current = {
      offsetX: e.clientX - boxRect.left,
      offsetY: e.clientY - boxRect.top,
      panel,
    };

    isDraggingRef.current = true;
    setIsDragging(true);
    box.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !dragStart.current) return;

    const { offsetX, offsetY, panel } = dragStart.current;
    const panelRect = panel.getBoundingClientRect();
    const boxRect = boxRef.current.getBoundingClientRect();

    let x = e.clientX - panelRect.left - offsetX;
    let y = e.clientY - panelRect.top - offsetY;

    // Keep within panel bounds
    x = Math.max(0, Math.min(x, panelRect.width  - boxRect.width));
    y = Math.max(0, Math.min(y, panelRect.height - boxRect.height));

    setDragPos({ x, y });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const posStyle = dragPos
    ? { left: `${dragPos.x}px`, top: `${dragPos.y}px`, right: "auto", bottom: "auto" }
    : (posStyles[position] ?? posStyles.top);

  return (
    <div
      ref={boxRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "absolute",
        ...posStyle,
        maxWidth: position === "topWide" && !dragPos ? "100%" : "70%",
        background: "linear-gradient(135deg, #fdf6ec 0%, #f5e6d0 100%)",
        border: `2px solid ${isDragging ? "#8B5E2A" : "#b4783c"}`,
        padding: "5px 9px",
        fontFamily: "'Literata', 'Georgia', serif",
        fontSize: "10.5px",
        fontStyle: "italic",
        color: "#5a3e28",
        lineHeight: 1.35,
        zIndex: isDragging ? 10 : 4,
        boxShadow: isDragging
          ? "3px 3px 10px rgba(0,0,0,0.5)"
          : "2px 2px 0 rgba(180,120,60,0.3)",
        animation: dragPos ? "none" : `slideIn 0.4s ease ${delay}s both`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {text}
    </div>
  );
}
