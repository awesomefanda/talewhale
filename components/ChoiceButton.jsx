export default function ChoiceButton({ text, onClick, index }) {
  const colors = [
    "bg-sky-500 hover:bg-sky-600",
    "bg-emerald-500 hover:bg-emerald-600",
    "bg-violet-500 hover:bg-violet-600",
  ];

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 text-lg ${colors[index % colors.length]}`}
    >
      {text}
    </button>
  );
}
