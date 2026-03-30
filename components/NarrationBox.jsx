export default function NarrationBox({ text, pos }) {
  const posStyles = {
    top: "top-0 left-0 right-0 m-2 rounded-sm",
    bottom: "bottom-0 left-0 right-0 m-2 rounded-sm",
    topRight: "top-0 right-0 m-2 rounded-sm max-w-[60%]",
    topWide: "top-0 left-0 right-0 m-0 border-x-0 border-t-0 rounded-none",
  };

  return (
    <div className={`absolute p-3 bg-yellow-50 border-2 border-black shadow-md z-10 ${posStyles[pos || 'top']}`}>
      <p className="text-sm font-medium leading-relaxed italic text-gray-800">{text}</p>
    </div>
  );
}
