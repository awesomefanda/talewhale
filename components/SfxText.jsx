export default function SfxText({ sfx }) {
  if (!sfx) return null;
  const { text, x, y, color } = sfx;
  
  return (
    <div 
      className="absolute font-black italic select-none pointer-events-none drop-shadow-md tracking-tighter"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        color: color || '#ffd93d',
        transform: 'translate(-50%, -50%) rotate(-12deg) scale(1.5)',
        textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
      }}
    >
      {text}
    </div>
  );
}
