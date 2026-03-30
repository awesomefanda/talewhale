export default function SpeechBubble({ text, x, y, tailDir, type, speaker, delay }) {
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
