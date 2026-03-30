import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { generateComicChapter } from "@/lib/llm";

const FALLBACK_STORY = {
  panels: [
    {
      layout: "full",
      narration: "Once upon a time, in a magical forest, lived a little fox named Finnegan.",
      sceneHint: "forest_night",
      bubbles: [{ text: "I wonder what's beyond those trees?", x: 50, y: 40, speaker: "Finnegan" }]
    },
    {
      layout: "wide",
      narration: "Suddenly, he saw a glowing path lead towards the mountains.",
      sceneHint: "sky",
      sfx: { text: "WHOOSH!", x: 50, y: 50 }
    }
  ],
  choices: ["Follow the path", "Go back home", "Ask a friend for help"]
};

export async function POST(req) {
  try {
    const { storyIdea, choiceIndex, history } = await req.json();

    if (!storyIdea && (!history || history.length === 0)) {
      return Response.json({ error: "No story idea provided" }, { status: 400 });
    }

    if (!process.env.LLM_API_KEY || process.env.LLM_API_KEY === 'gsk_xxxxx') {
      console.warn("Using fallback story because LLM_API_KEY is not set.");
      return Response.json(FALLBACK_STORY);
    }

    const userPrompt = buildUserPrompt(storyIdea, choiceIndex, history);
    const chapter = await generateComicChapter(SYSTEM_PROMPT, userPrompt);

    return Response.json(chapter);
  } catch (error) {
    console.error("Error generating comic chapter:", error.message, error.stack);
    return Response.json(
      { error: "Failed to generate chapter", details: error.message },
      { status: 500 }
    );
  }
}
