"use client";

import { useState, useRef } from "react";

/**
 * Drag hook for elements positioned with left/top as % of their parent panel.
 * The element must use transform: translate(-50%, -50%) for centering.
 */
export function useDrag(initialX, initialY) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStart = useRef(null); // { panel, offsetX, offsetY }
  const elRef = useRef(null);

  const onPointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const panel = elRef.current.parentElement;
    const panelRect = panel.getBoundingClientRect();

    // Pointer position as % of panel
    const pxPct = ((e.clientX - panelRect.left) / panelRect.width)  * 100;
    const pyPct = ((e.clientY - panelRect.top)  / panelRect.height) * 100;

    // Offset from element centre to pointer (in %)
    dragStart.current = {
      panel,
      offsetX: pxPct - pos.x,
      offsetY: pyPct - pos.y,
    };

    isDraggingRef.current = true;
    setIsDragging(true);
    elRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current || !dragStart.current) return;

    const panelRect = dragStart.current.panel.getBoundingClientRect();
    let nx = ((e.clientX - panelRect.left) / panelRect.width)  * 100 - dragStart.current.offsetX;
    let ny = ((e.clientY - panelRect.top)  / panelRect.height) * 100 - dragStart.current.offsetY;

    // Keep centre within panel bounds
    nx = Math.max(5, Math.min(95, nx));
    ny = Math.max(5, Math.min(95, ny));

    setPos({ x: nx, y: ny });
  };

  const onPointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const hasMoved = pos.x !== initialX || pos.y !== initialY;

  return { pos, isDragging, hasMoved, elRef, onPointerDown, onPointerMove, onPointerUp };
}
