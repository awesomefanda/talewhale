export default function NarrationBox({ text, position, delay }) {
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
