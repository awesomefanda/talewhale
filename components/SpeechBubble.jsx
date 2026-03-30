export default function SpeechBubble({ bubble }) {
  const { text, x, y, tailDir, type, speaker } = bubble;
  
  const bubbleStyles = {
    normal: "bg-white border-2 border-black rounded-3xl",
    thought: "bg-white border-2 border-black rounded-[100%] border-dashed",
    whisper: "bg-white border-2 border-gray-400 rounded-3xl border-dotted text-gray-600",
    shout: "bg-yellow-100 border-4 border-black rounded-none polygon-shout font-bold text-lg",
  };

  return (
    <div 
      className={`absolute p-3 max-w-[150px] shadow-sm ${bubbleStyles[type || 'normal']}`}
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {speaker && <div className="text-[10px] uppercase font-bold mb-1 border-b border-gray-200">{speaker}</div>}
      <p className="text-sm leading-tight text-center">{text}</p>
      
      {/* Simple tail representation */}
      <div className={`absolute w-4 h-4 bg-white border-b-2 border-r-2 border-black rotate-45 
        ${tailDir === 'left' ? '-left-2 bottom-2' : tailDir === 'right' ? '-right-2 bottom-2' : 'left-1/2 -bottom-2 -translate-x-1/2'}`} 
      />
    </div>
  );
}
