"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EXAMPLES = [
  { icon: "🦊", text: "A brave little fox who learns to fly" },
  { icon: "🚀", text: "A robot's first day at human school" },
  { icon: "🌊", text: "Searching for the lost pearl of the ocean" },
  { icon: "🌳", text: "The magic tree that grows giant cupcakes" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleStart = (text) => {
    const finalPrompt = text || prompt;
    if (!finalPrompt.trim()) return;
    
    // Pass the prompt via search params or state (using search params for simple link sharing)
    const encodedPrompt = encodeURIComponent(finalPrompt.trim());
    router.push(`/read?prompt=\${encodedPrompt}`);
  };

  return (
    <div className="flex-1 p-6 flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-sky-600">Dream a Story!</h2>
        <p className="text-gray-600">What adventure should we go on today?</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a story idea... (e.g., A cat who goes to space)"
          className="w-full h-32 p-4 border-4 border-black rounded-2xl text-lg focus:ring-4 focus:ring-sky-300 transition-all outline-none"
        />
        <button
          onClick={() => handleStart()}
          disabled={!prompt.trim()}
          className="w-full bg-sky-500 text-white font-black text-xl py-4 rounded-2xl shadow-[0_6px_0_0_rgb(3,105,161)] active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          Create My Comic!
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm">Or pick an idea:</h3>
        <div className="grid grid-cols-1 gap-3">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleStart(ex.text)}
              className="flex items-center gap-4 p-4 border-2 border-sky-100 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-colors text-left"
            >
              <span className="text-2xl">{ex.icon}</span>
              <span className="font-medium text-gray-700">{ex.text}</span>
            </button>
          ))}
        </div>
      </div>
      
      <footer className="mt-auto text-center text-xs text-gray-400 pb-4">
        Made with 💙 by TaleWhale
      </footer>
    </div>
  );
}
