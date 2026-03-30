"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ComicPanel from "@/components/ComicPanel";
import ChoiceButton from "@/components/ChoiceButton";
import { Loader2 } from "lucide-react";

function ReaderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const storyIdea = searchParams.get("prompt");
  
  const [history, setHistory] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storyIdea) {
      router.push("/");
      return;
    }
    generateNextChapter();
  }, [storyIdea]);

  const generateNextChapter = async (choiceIndex = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyIdea,
          choiceIndex,
          history: history,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const chapter = await response.json();
      
      if (currentChapter) {
        setHistory(prev => [...prev, currentChapter]);
      }
      
      setCurrentChapter(chapter);
    } catch (err) {
      console.error(err);
      setError("Oops! The whale hit a rock. Let's try again.");
    } finally {
      setLoading(false);
      // Scroll to top when new chapter arrives
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading && !currentChapter) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
        <Loader2 className="w-16 h-16 text-sky-500 animate-spin" />
        <h2 className="text-2xl font-black text-sky-600">Whale is blowing story bubbles...</h2>
      </div>
    );
  }

  if (error && !currentChapter) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
        <span className="text-6xl">🤕</span>
        <h2 className="text-2xl font-black text-red-600">{error}</h2>
        <button 
          onClick={() => router.push("/")}
          className="bg-sky-500 text-white font-bold py-2 px-6 rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-10">
      <div className="p-4 grid grid-cols-12 gap-4">
        {currentChapter?.panels?.map((panel, i) => (
          <ComicPanel key={i} panel={panel} />
        ))}
      </div>

      <div className="mt-8 px-6 space-y-4">
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          </div>
        ) : currentChapter?.choices ? (
          <>
            <h3 className="text-center font-black text-xl uppercase tracking-tighter text-gray-400">What happens next?</h3>
            <div className="grid grid-cols-1 gap-3">
              {currentChapter.choices.map((choice, i) => (
                <ChoiceButton 
                  key={i} 
                  text={choice} 
                  index={i} 
                  onClick={() => generateNextChapter(i)} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 pt-10">
            <div className="bg-yellow-100 border-4 border-black p-8 rounded-none inline-block transform -rotate-2">
              <h2 className="text-4xl font-black uppercase italic">The End</h2>
            </div>
            <p className="text-gray-600 font-medium">What a great adventure!</p>
            <button 
              onClick={() => router.push("/")}
              className="bg-sky-500 text-white font-black text-xl py-4 px-10 rounded-2xl shadow-[0_6px_0_0_rgb(3,105,161)] active:shadow-none active:translate-y-1 transition-all uppercase"
            >
              Start New Story
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <Loader2 className="w-16 h-16 text-sky-500 animate-spin" />
      </div>
    }>
      <ReaderContent />
    </Suspense>
  );
}
