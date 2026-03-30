import { getSceneComponent } from "@/lib/scenes";
import NarrationBox from "./NarrationBox";
import SpeechBubble from "./SpeechBubble";
import SfxText from "./SfxText";

export default function ComicPanel({ panel }) {
  const { layout, narration, narrationPos, sceneHint, bubbles, sfx } = panel;
  const Scene = getSceneComponent(sceneHint);

  const layoutStyles = {
    full: "col-span-12 row-span-2",
    left: "col-span-6 row-span-1",
    right: "col-span-6 row-span-1",
    wide: "col-span-12 row-span-1",
  };

  return (
    <div className={`relative overflow-hidden border-2 border-black bg-white shadow-lg ${layoutStyles[layout || 'full']} min-h-[300px]`}>
      {/* Background Scene */}
      <div className="absolute inset-0 w-full h-full">
        <Scene />
      </div>

      {/* Narration */}
      {narration && <NarrationBox text={narration} pos={narrationPos} />}

      {/* Bubbles */}
      {bubbles?.map((bubble, i) => (
        <SpeechBubble key={i} bubble={bubble} />
      ))}

      {/* SFX */}
      {sfx && <SfxText sfx={sfx} />}
    </div>
  );
}
