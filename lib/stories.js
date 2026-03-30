// Pre-generated interactive stories for TaleWhale
// Each story has a start chapter + branching ch2 variants + shared ending
// choiceHistory = array of choice indices made so far

export const STORIES = [
  {
    id: "fox",
    title: "A Brave Little Fox",
    icon: "🦊",
    tagline: "A magical flying adventure in the Whispering Woods",
    getChapter(choiceHistory) {
      if (choiceHistory.length === 0) return this.chapters.start;
      if (choiceHistory.length === 1) return this.chapters[`ch2_${choiceHistory[0]}`] || this.chapters.ch2_0;
      return this.chapters.end;
    },
    chapters: {
      start: {
        panels: [
          {
            layout: "full",
            narration: "In the Whispering Woods, little Finnegan the Fox spotted something gleaming in the grass — a golden feather!",
            narrationPos: "top",
            sceneHint: "forest_night",
            bubbles: [{ text: "What's this sparkly thing?!", x: 62, y: 55, tailDir: "left", type: "shout", speaker: "Finnegan" }],
          },
          {
            layout: "left",
            narration: "He touched the feather — and tingled all the way to the tip of his tail!",
            narrationPos: "bottom",
            sceneHint: "garden",
            bubbles: [{ text: "My paws feel so... light!", x: 52, y: 35, tailDir: "center", type: "thought", speaker: "Finnegan" }],
          },
          {
            layout: "right",
            narration: "Finnegan jumped — and floated in the air for a whole magical second!",
            narrationPos: "top",
            sceneHint: "sky",
            sfx: { text: "WHOOOOSH!", x: 50, y: 55, color: "#ffd93d" },
            bubbles: [],
          },
        ],
        choices: ["Climb the tallest tree and leap!", "Find the wise Owl for help", "Follow the trail of sparkles"],
      },

      ch2_0: {
        panels: [
          {
            layout: "wide",
            narration: "Finnegan scrambled up the Giant Oak, higher than he had ever climbed before!",
            narrationPos: "top",
            sceneHint: "forest_night",
            bubbles: [{ text: "Don't look down... don't look down!", x: 62, y: 50, tailDir: "right", type: "whisper", speaker: "Finnegan" }],
          },
          {
            layout: "full",
            narration: "He clutched the feather tight, closed his eyes, and LEAPED into the sky with all his might!",
            narrationPos: "top",
            sceneHint: "sky",
            sfx: { text: "ZOOM!", x: 22, y: 32, color: "#ff6b6b" },
            bubbles: [{ text: "I'M FLYING! I'M REALLY FLYING!!!", x: 65, y: 60, tailDir: "left", type: "shout", speaker: "Finnegan" }],
          },
        ],
        choices: ["Fly over the rainbow!", "Swoop down to help a lost bunny", "Race the birds to the clouds"],
      },

      ch2_1: {
        panels: [
          {
            layout: "full",
            narration: "Deep in the moonlit forest, Finnegan found the ancient Owl called Hoo, sitting on his favourite branch.",
            narrationPos: "top",
            sceneHint: "forest_night",
            bubbles: [
              { text: "Great Hoo, can you teach me to fly?", x: 35, y: 68, tailDir: "right", type: "normal", speaker: "Finnegan" },
              { text: "Hooo! The feather chose YOU, little fox!", x: 68, y: 28, tailDir: "left", type: "normal", speaker: "Hoo the Owl" },
            ],
          },
          {
            layout: "wide",
            narration: "Hoo wrapped a magical flying scarf around Finnegan — and together they soared into the night sky!",
            narrationPos: "bottom",
            sceneHint: "sky",
            sfx: { text: "WHOOSH!", x: 72, y: 38, color: "#a29bfe" },
            bubbles: [{ text: "I can feel the whole world below me!", x: 38, y: 32, tailDir: "right", type: "shout", speaker: "Finnegan" }],
          },
        ],
        choices: ["Fly to the top of the rainbow!", "Help Hoo find his lost egg", "Explore the land above the clouds"],
      },

      ch2_2: {
        panels: [
          {
            layout: "full",
            narration: "The golden sparkles led Finnegan to a hidden meadow no fox had ever found before!",
            narrationPos: "top",
            sceneHint: "garden",
            bubbles: [{ text: "This place is incredible!", x: 55, y: 55, tailDir: "center", type: "shout", speaker: "Finnegan" }],
          },
          {
            layout: "left",
            narration: "A tiny dragon with rainbow wings poked her head out from behind the flowers!",
            narrationPos: "bottom",
            sceneHint: "garden",
            bubbles: [
              { text: "Hi! I'm Ember! Want to learn to fly?", x: 62, y: 38, tailDir: "left", type: "normal", speaker: "Ember" },
              { text: "YES PLEASE!!!", x: 42, y: 65, tailDir: "right", type: "shout", speaker: "Finnegan" },
            ],
          },
          {
            layout: "right",
            narration: "Ember flapped her rainbow wings and began to teach Finnegan everything she knew!",
            narrationPos: "top",
            sceneHint: "sky",
            sfx: { text: "FLUTTER!", x: 50, y: 58, color: "#fd79a8" },
            bubbles: [],
          },
        ],
        choices: ["Soar above the rainbow clouds!", "Fly to the Dragon Kingdom", "Race each other to the moon"],
      },

      end: {
        panels: [
          {
            layout: "wide",
            narration: "Finnegan the Fox soared over the Whispering Woods, his bushy tail streaming behind him like a golden flag!",
            narrationPos: "top",
            sceneHint: "sky",
            sfx: { text: "SWOOOOSH!", x: 50, y: 42, color: "#ffd93d" },
            bubbles: [{ text: "The sky is my home now!", x: 62, y: 65, tailDir: "left", type: "shout", speaker: "Finnegan" }],
          },
          {
            layout: "full",
            narration: "His whole family watched from the forest floor, their mouths open wide with amazement and pride.",
            narrationPos: "bottom",
            sceneHint: "forest_night",
            bubbles: [
              { text: "That's our Finnegan!", x: 32, y: 58, tailDir: "right", type: "shout", speaker: "Mama Fox" },
              { text: "Braver than any fox ever!", x: 68, y: 42, tailDir: "left", type: "normal", speaker: "Papa Fox" },
            ],
          },
        ],
        choices: null,
      },
    },
  },

  {
    id: "candy",
    title: "A Magical Candy Garden",
    icon: "🍬",
    tagline: "Discover a garden where everything is made of sweets!",
    getChapter(choiceHistory) {
      if (choiceHistory.length === 0) return this.chapters.start;
      if (choiceHistory.length === 1) return this.chapters[`ch2_${choiceHistory[0]}`] || this.chapters.ch2_0;
      return this.chapters.end;
    },
    chapters: {
      start: {
        panels: [
          {
            layout: "full",
            narration: "Little Lily was digging in her garden when her shovel hit something soft and sweet-smelling!",
            narrationPos: "top",
            sceneHint: "garden",
            bubbles: [{ text: "These flowers are made of CANDY!", x: 60, y: 55, tailDir: "left", type: "shout", speaker: "Lily" }],
          },
          {
            layout: "wide",
            narration: "She tasted one tiny petal — it was the most amazing strawberry flavour she had ever tasted!",
            narrationPos: "bottom",
            sceneHint: "garden",
            sfx: { text: "CRUNCH!", x: 50, y: 42, color: "#fd79a8" },
            bubbles: [{ text: "Mmmmm... this is MAGIC!", x: 52, y: 25, tailDir: "center", type: "thought", speaker: "Lily" }],
          },
          {
            layout: "right",
            narration: "The whole garden began to sparkle — and more candy flowers burst out of the ground!",
            narrationPos: "top",
            sceneHint: "garden",
            sfx: { text: "POP! POP! POP!", x: 45, y: 60, color: "#a29bfe" },
            bubbles: [],
          },
        ],
        choices: ["Build a castle out of candy!", "Share the candy with all your friends", "Plant magical seeds to grow more"],
      },

      ch2_0: {
        panels: [
          {
            layout: "full",
            narration: "Lily stacked gummy bricks, licorice beams, and lollipop towers — and a magnificent castle rose up!",
            narrationPos: "top",
            sceneHint: "castle",
            bubbles: [{ text: "A CANDY CASTLE! All mine!", x: 58, y: 55, tailDir: "center", type: "shout", speaker: "Lily" }],
          },
          {
            layout: "wide",
            narration: "News of the candy castle spread, and soon kids came from miles around to see it!",
            narrationPos: "bottom",
            sceneHint: "castle",
            sfx: { text: "WOW!", x: 50, y: 35, color: "#ffd93d" },
            bubbles: [{ text: "Can we come inside?!", x: 55, y: 60, tailDir: "center", type: "shout", speaker: "Crowd of Kids" }],
          },
        ],
        choices: ["Open the castle to everyone!", "Add a chocolate moat!", "Build a gummy bear slide"],
      },

      ch2_1: {
        panels: [
          {
            layout: "full",
            narration: "Lily ran to tell her friends, and they rushed to the magic garden with bags and buckets!",
            narrationPos: "top",
            sceneHint: "garden",
            bubbles: [
              { text: "Everyone pick their favourite!", x: 42, y: 52, tailDir: "right", type: "shout", speaker: "Lily" },
              { text: "YIPPEEEE!", x: 68, y: 40, tailDir: "left", type: "shout", speaker: "Friends" },
            ],
          },
          {
            layout: "left",
            narration: "The garden magically grew more candy every time someone shared — it never ran out!",
            narrationPos: "bottom",
            sceneHint: "garden",
            bubbles: [{ text: "The more we share, the more it grows!", x: 52, y: 40, tailDir: "center", type: "normal", speaker: "Lily" }],
          },
          {
            layout: "right",
            narration: "Then — something truly incredible happened. It started raining candy from the sky!",
            narrationPos: "top",
            sceneHint: "sky",
            sfx: { text: "CANDY RAIN!", x: 50, y: 45, color: "#fd79a8" },
            bubbles: [],
          },
        ],
        choices: ["Dance in the candy rain!", "Catch candy in giant baskets", "Make a candy rainbow bridge"],
      },

      ch2_2: {
        panels: [
          {
            layout: "full",
            narration: "Lily planted the magical seeds and watered them with lemonade — and GIANT candy trees shot up overnight!",
            narrationPos: "top",
            sceneHint: "garden",
            sfx: { text: "SPROOOIING!", x: 50, y: 55, color: "#00b894" },
            bubbles: [{ text: "Popcorn trees! Ice cream bushes!", x: 55, y: 72, tailDir: "center", type: "shout", speaker: "Lily" }],
          },
          {
            layout: "wide",
            narration: "There were lollipop trees, marshmallow clouds floating low, and a river of fizzy strawberry lemonade!",
            narrationPos: "bottom",
            sceneHint: "garden",
            bubbles: [{ text: "This is better than any dream!", x: 50, y: 30, tailDir: "center", type: "thought", speaker: "Lily" }],
          },
        ],
        choices: ["Open a candy shop!", "Send candy baskets to all kids", "Build a candy rollercoaster"],
      },

      end: {
        panels: [
          {
            layout: "wide",
            narration: "As the sun set, the Magical Candy Garden glowed with a warm, sweet, golden light.",
            narrationPos: "top",
            sceneHint: "garden",
            sfx: { text: "SPARKLE!", x: 50, y: 42, color: "#ffd93d" },
            bubbles: [{ text: "Best garden ever!", x: 52, y: 68, tailDir: "center", type: "shout", speaker: "Lily" }],
          },
          {
            layout: "full",
            narration: "Lily hugged her candy flowers tight. She knew that magic grows best when you share it with others.",
            narrationPos: "bottom",
            sceneHint: "garden",
            bubbles: [
              { text: "I'll take care of you forever!", x: 42, y: 45, tailDir: "right", type: "normal", speaker: "Lily" },
              { text: "And we'll always be here for you!", x: 65, y: 30, tailDir: "left", type: "thought", speaker: "The Garden" },
            ],
          },
        ],
        choices: null,
      },
    },
  },

  {
    id: "robot",
    title: "A Robot Who Wants to Paint",
    icon: "🤖",
    tagline: "When art comes alive, anything is possible!",
    getChapter(choiceHistory) {
      if (choiceHistory.length === 0) return this.chapters.start;
      if (choiceHistory.length === 1) return this.chapters[`ch2_${choiceHistory[0]}`] || this.chapters.ch2_0;
      return this.chapters.end;
    },
    chapters: {
      start: {
        panels: [
          {
            layout: "full",
            narration: "Bolt the little robot had cleaned every dish, fixed every clock — but today he found a paintbrush!",
            narrationPos: "top",
            sceneHint: "bedroom",
            bubbles: [{ text: "What does this tool DO?", x: 58, y: 55, tailDir: "left", type: "thought", speaker: "Bolt" }],
          },
          {
            layout: "wide",
            narration: "He splashed colours everywhere — it looked like a wild, wonderfully messy rainbow explosion!",
            narrationPos: "bottom",
            sceneHint: "bedroom",
            sfx: { text: "SPLAT! SQUISH! SWOOSH!", x: 50, y: 38, color: "#fd79a8" },
            bubbles: [{ text: "Oh no... this is not tidy at all!", x: 50, y: 68, tailDir: "center", type: "whisper", speaker: "Bolt" }],
          },
          {
            layout: "right",
            narration: "But then — the painting BLINKED! It was ALIVE! Bolt's art had become real!",
            narrationPos: "top",
            sceneHint: "bedroom",
            sfx: { text: "ZAP!", x: 45, y: 45, color: "#ffd93d" },
            bubbles: [{ text: "My painting is MOVING!", x: 55, y: 68, tailDir: "center", type: "shout", speaker: "Bolt" }],
          },
        ],
        choices: ["Paint a zooming spaceship!", "Paint a friendly fluffy monster", "Paint a glowing magical forest"],
      },

      ch2_0: {
        panels: [
          {
            layout: "full",
            narration: "Bolt painted a sleek silver spaceship with blinking lights — and it WHOOSHED out of the canvas!",
            narrationPos: "top",
            sceneHint: "space",
            sfx: { text: "BLAST OFF!", x: 30, y: 35, color: "#74b9ff" },
            bubbles: [{ text: "A real spaceship! Made by ME!", x: 65, y: 55, tailDir: "left", type: "shout", speaker: "Bolt" }],
          },
          {
            layout: "wide",
            narration: "The spaceship opened its door. Bolt and his friends hopped in and shot off into the starry sky!",
            narrationPos: "bottom",
            sceneHint: "space",
            bubbles: [{ text: "Stars everywhere! This is AMAZING!", x: 50, y: 32, tailDir: "center", type: "shout", speaker: "Bolt" }],
          },
        ],
        choices: ["Visit an ice cream planet!", "Meet alien friends in space", "Fly through a rainbow nebula"],
      },

      ch2_1: {
        panels: [
          {
            layout: "full",
            narration: "A giant fluffy purple monster with polka dots bounced out of the painting — but it was smiling!",
            narrationPos: "top",
            sceneHint: "garden",
            sfx: { text: "BOING!", x: 50, y: 42, color: "#a29bfe" },
            bubbles: [{ text: "ROAR!... I mean... hello friend!", x: 55, y: 62, tailDir: "center", type: "shout", speaker: "Monster" }],
          },
          {
            layout: "left",
            narration: "The monster was gentle as a kitten — it just loved giving enormous warm hugs!",
            narrationPos: "bottom",
            sceneHint: "garden",
            bubbles: [{ text: "I always wanted a monster friend!", x: 52, y: 38, tailDir: "right", type: "thought", speaker: "Bolt" }],
          },
          {
            layout: "right",
            narration: "They played tag in the park all day, and the monster was surprisingly fast on its six fuzzy feet!",
            narrationPos: "top",
            sceneHint: "garden",
            sfx: { text: "ZOOM! WHOMP!", x: 50, y: 55, color: "#fd79a8" },
            bubbles: [],
          },
        ],
        choices: ["Teach the monster to paint!", "Go on a picnic adventure", "Paint a house for the monster"],
      },

      ch2_2: {
        panels: [
          {
            layout: "full",
            narration: "Bolt's painting of a forest grew and grew until it burst through the walls — glowing with magic!",
            narrationPos: "top",
            sceneHint: "forest_night",
            sfx: { text: "WHOOOM!", x: 50, y: 48, color: "#00cec9" },
            bubbles: [{ text: "I painted a whole WORLD!", x: 55, y: 65, tailDir: "center", type: "shout", speaker: "Bolt" }],
          },
          {
            layout: "wide",
            narration: "Tiny glowing fairies no bigger than your thumb flew out from between the painted trees!",
            narrationPos: "bottom",
            sceneHint: "forest_night",
            bubbles: [
              { text: "Welcome to our forest, painter!", x: 35, y: 32, tailDir: "right", type: "whisper", speaker: "Fairy" },
              { text: "I... I made this place for you!", x: 65, y: 50, tailDir: "left", type: "normal", speaker: "Bolt" },
            ],
          },
        ],
        choices: ["Dance with the fairies!", "Paint more magical creatures", "Build a tiny fairy village"],
      },

      end: {
        panels: [
          {
            layout: "full",
            narration: "Bolt looked at his room, now filled with the most incredible art any robot had ever made.",
            narrationPos: "top",
            sceneHint: "bedroom",
            bubbles: [{ text: "I didn't know I could create things!", x: 52, y: 55, tailDir: "center", type: "thought", speaker: "Bolt" }],
          },
          {
            layout: "wide",
            narration: "From that day on, Bolt painted every single day — and every painting brought a new adventure to life!",
            narrationPos: "bottom",
            sceneHint: "bedroom",
            sfx: { text: "MAGIC!", x: 50, y: 42, color: "#ffd93d" },
            bubbles: [{ text: "Art is the best superpower!", x: 52, y: 68, tailDir: "center", type: "shout", speaker: "Bolt" }],
          },
        ],
        choices: null,
      },
    },
  },

  {
    id: "dino",
    title: "A Dinosaur's First Day at School",
    icon: "🦕",
    tagline: "Everyone is different — and that's what makes school amazing!",
    getChapter(choiceHistory) {
      if (choiceHistory.length === 0) return this.chapters.start;
      if (choiceHistory.length === 1) return this.chapters[`ch2_${choiceHistory[0]}`] || this.chapters.ch2_0;
      return this.chapters.end;
    },
    chapters: {
      start: {
        panels: [
          {
            layout: "full",
            narration: "Dino nervously stomped up to Sunny Hills School — but the doorway was a little... too small.",
            narrationPos: "top",
            sceneHint: "school",
            sfx: { text: "STOMP STOMP STOMP!", x: 50, y: 65, color: "#00b894" },
            bubbles: [{ text: "What if the kids think I'm too big?", x: 55, y: 38, tailDir: "center", type: "thought", speaker: "Dino" }],
          },
          {
            layout: "wide",
            narration: "The tiny chairs in the classroom creaked under Dino's enormous weight — but the teacher smiled warmly!",
            narrationPos: "bottom",
            sceneHint: "school",
            bubbles: [
              { text: "Welcome, Dino! We've been excited for you!", x: 42, y: 32, tailDir: "right", type: "normal", speaker: "Mrs. Sunny" },
              { text: "Really?!", x: 65, y: 55, tailDir: "left", type: "shout", speaker: "Dino" },
            ],
          },
          {
            layout: "right",
            narration: "One small girl in pigtails marched straight up to Dino without a single bit of fear!",
            narrationPos: "top",
            sceneHint: "school",
            bubbles: [{ text: "I'm Rosa! Wanna be best friends?", x: 48, y: 45, tailDir: "right", type: "normal", speaker: "Rosa" }],
          },
        ],
        choices: ["Try to sit in the tiny chair!", "Sit on the floor with Rosa", "Help Mrs. Sunny set up the classroom"],
      },

      ch2_0: {
        panels: [
          {
            layout: "full",
            narration: "Dino squeeeezed into the tiny chair — and it made a sound like a tuba going SQUEAK!",
            narrationPos: "top",
            sceneHint: "school",
            sfx: { text: "SQUEEEAK! CRUNCH!", x: 50, y: 55, color: "#e17055" },
            bubbles: [{ text: "Oops... maybe I'll stand instead?", x: 55, y: 72, tailDir: "center", type: "whisper", speaker: "Dino" }],
          },
          {
            layout: "wide",
            narration: "The whole class giggled — but Dino made the funniest face ever, and soon everyone was laughing together!",
            narrationPos: "bottom",
            sceneHint: "school",
            bubbles: [
              { text: "Ha ha ha ha ha!", x: 40, y: 35, tailDir: "right", type: "shout", speaker: "Class" },
              { text: "This is... actually pretty funny!", x: 65, y: 55, tailDir: "left", type: "shout", speaker: "Dino" },
            ],
          },
        ],
        choices: ["Ask for a big special chair", "Turn it into a comedy show!", "Build a chair out of giant blocks"],
      },

      ch2_1: {
        panels: [
          {
            layout: "full",
            narration: "Dino sat carefully on the floor, and Rosa plopped down right next to the giant scaly knee.",
            narrationPos: "top",
            sceneHint: "school",
            bubbles: [
              { text: "Don't worry — the floor is better anyway!", x: 42, y: 52, tailDir: "right", type: "normal", speaker: "Rosa" },
              { text: "You know what? You're right!", x: 62, y: 35, tailDir: "left", type: "shout", speaker: "Dino" },
            ],
          },
          {
            layout: "wide",
            narration: "Rosa showed Dino how to hold a crayon with his big claws — it was trickier than it looked!",
            narrationPos: "bottom",
            sceneHint: "school",
            sfx: { text: "SCRIBBLE SCRIBBLE!", x: 50, y: 38, color: "#fd79a8" },
            bubbles: [{ text: "I'm... actually drawing something!", x: 52, y: 65, tailDir: "center", type: "thought", speaker: "Dino" }],
          },
        ],
        choices: ["Draw a giant dinosaur picture!", "Play tag on the playground", "Teach Rosa how to ROAR"],
      },

      ch2_2: {
        panels: [
          {
            layout: "wide",
            narration: "Dino's long neck could reach the very top shelves — things NO ONE had been able to reach all year!",
            narrationPos: "top",
            sceneHint: "school",
            sfx: { text: "STRETCH!", x: 50, y: 35, color: "#00b894" },
            bubbles: [{ text: "I can reach them all! What else needs help?", x: 52, y: 68, tailDir: "center", type: "shout", speaker: "Dino" }],
          },
          {
            layout: "full",
            narration: "Mrs. Sunny gave Dino a shiny gold sticker — BEST CLASS HELPER — and the whole class cheered!",
            narrationPos: "bottom",
            sceneHint: "school",
            bubbles: [
              { text: "Three cheers for Dino!", x: 42, y: 38, tailDir: "right", type: "shout", speaker: "Class" },
              { text: "I feel like I BELONG here!", x: 65, y: 58, tailDir: "left", type: "thought", speaker: "Dino" },
            ],
          },
        ],
        choices: ["Help put up the classroom decorations!", "Read a story to the whole class", "Help find all the missing pencils"],
      },

      end: {
        panels: [
          {
            layout: "full",
            narration: "When the bell rang, the whole class rushed to hug Dino's big scaly legs — all except Rosa who hugged his tail!",
            narrationPos: "top",
            sceneHint: "school",
            sfx: { text: "SQUISH HUG!", x: 50, y: 50, color: "#fd79a8" },
            bubbles: [
              { text: "Will you come back TOMORROW?!", x: 40, y: 30, tailDir: "right", type: "shout", speaker: "Class" },
              { text: "You couldn't stop me!", x: 65, y: 55, tailDir: "left", type: "shout", speaker: "Dino" },
            ],
          },
          {
            layout: "wide",
            narration: "Dino stomped home with the biggest dino-grin anyone had ever seen. Being different was actually pretty great!",
            narrationPos: "bottom",
            sceneHint: "school",
            bubbles: [{ text: "Best. First day. EVER!", x: 52, y: 35, tailDir: "center", type: "shout", speaker: "Dino" }],
          },
        ],
        choices: null,
      },
    },
  },
];

export default STORIES;
