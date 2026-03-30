import { getSceneComponent } from "@/lib/scenes";
import NarrationBox from "./NarrationBox";
import SpeechBubble from "./SpeechBubble";
import SfxText from "./SfxText";

export default function ComicPanel({ panel, panelIndex = 0, totalPanels = 1 }) {
  const { layout, narration, narrationPos, sceneHint, bubbles, sfx } = panel;
  const Scene = getSceneComponent(sceneHint);

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

      {/* Narration */}
      {narration && (
        <NarrationBox text={narration} position={narrationPos || "top"} delay={panelIndex * 0.15 + 0.2} />
      )}

      {/* Speech bubbles */}
      {bubbles?.map((bubble, i) => (
        <SpeechBubble key={i} {...bubble} delay={panelIndex * 0.15 + 0.3 + i * 0.2} />
      ))}

      {/* SFX text */}
      {sfx && (
        <SfxText text={sfx.text} x={sfx.x} y={sfx.y} color={sfx.color} delay={panelIndex * 0.15 + 0.5} />
      )}
    </div>
  );
}
