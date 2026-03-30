export default function SfxText({ text, x, y, color, delay }) {
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
