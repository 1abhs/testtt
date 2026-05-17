export type PerfumeId = 'midnight_rose' | 'ocean_breeze' | 'golden_amber' | 'fresh_linen' | 'wild_orchid';

export interface Question {
  id: number;
  question: string;
  emoji: string;
  options: {
    text: string;
    points: PerfumeId;
  }[];
}

export interface Perfume {
  id: PerfumeId;
  name: string;
  tagline: string;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  personality: string;
  color: string;
  gradient: string;
  emoji: string;
  bgGradient: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "It's Saturday morning. What's your ideal way to spend the day?",
    emoji: "☀️",
    options: [
      { text: "Exploring a hidden speakeasy or underground art show", points: 'midnight_rose' },
      { text: "Surfing at the beach or hiking a new trail", points: 'ocean_breeze' },
      { text: "Brunch at a chic café followed by browsing boutiques", points: 'golden_amber' },
      { text: "A quiet morning yoga session and reorganizing my space", points: 'fresh_linen' },
      { text: "Visiting a museum, then painting or writing at a café", points: 'wild_orchid' },
    ],
  },
  {
    id: 2,
    question: "Which word resonates with you the most?",
    emoji: "✨",
    options: [
      { text: "Mysterious", points: 'midnight_rose' },
      { text: "Free", points: 'ocean_breeze' },
      { text: "Refined", points: 'golden_amber' },
      { text: "Serene", points: 'fresh_linen' },
      { text: "Passionate", points: 'wild_orchid' },
    ],
  },
  {
    id: 3,
    question: "If your personality were a season, which would it be?",
    emoji: "🌸",
    options: [
      { text: "A crisp autumn evening", points: 'midnight_rose' },
      { text: "A breezy summer afternoon", points: 'ocean_breeze' },
      { text: "A golden autumn morning", points: 'golden_amber' },
      { text: "A clear winter morning", points: 'fresh_linen' },
      { text: "A vibrant spring garden", points: 'wild_orchid' },
    ],
  },
  {
    id: 4,
    question: "What matters most to you in a fragrance?",
    emoji: "💨",
    options: [
      { text: "It should be intoxicating and leave a lasting impression", points: 'midnight_rose' },
      { text: "It should feel fresh and energizing", points: 'ocean_breeze' },
      { text: "It should be sophisticated and timeless", points: 'golden_amber' },
      { text: "It should be subtle and clean", points: 'fresh_linen' },
      { text: "It should be unique and expressive", points: 'wild_orchid' },
    ],
  },
  {
    id: 5,
    question: "Which color palette draws you in?",
    emoji: "🎨",
    options: [
      { text: "Deep plum, black, and burgundy", points: 'midnight_rose' },
      { text: "Turquoise, sandy beige, and seafoam", points: 'ocean_breeze' },
      { text: "Champagne gold, camel, and warm cream", points: 'golden_amber' },
      { text: "Pure white, soft grey, and pale blue", points: 'fresh_linen' },
      { text: "Fuchsia, emerald, and rich violet", points: 'wild_orchid' },
    ],
  },
  {
    id: 6,
    question: "How would your closest friends describe you?",
    emoji: "👫",
    options: [
      { text: "Enigmatic and magnetic — they can never quite figure me out", points: 'midnight_rose' },
      { text: "Adventurous and spontaneous — always up for anything", points: 'ocean_breeze' },
      { text: "Classy and dependable — the one they go to for advice", points: 'golden_amber' },
      { text: "Calm and put-together — effortlessly graceful", points: 'fresh_linen' },
      { text: "Creative and expressive — always inspiring others", points: 'wild_orchid' },
    ],
  },
  {
    id: 7,
    question: "Pick your dream vacation destination:",
    emoji: "✈️",
    options: [
      { text: "A candlelit villa in the Tuscan hills at dusk", points: 'midnight_rose' },
      { text: "Island-hopping in the Greek Isles", points: 'ocean_breeze' },
      { text: "A luxury train journey through the French countryside", points: 'golden_amber' },
      { text: "A minimalist Scandinavian spa retreat", points: 'fresh_linen' },
      { text: "Exploring the vibrant markets of Marrakech", points: 'wild_orchid' },
    ],
  },
  {
    id: 8,
    question: "What's your approach to getting ready in the morning?",
    emoji: "⏰",
    options: [
      { text: "I take my time — every detail matters, especially my scent", points: 'midnight_rose' },
      { text: "Quick and easy — I keep things simple but effective", points: 'ocean_breeze' },
      { text: "I have a refined routine with trusted, quality products", points: 'golden_amber' },
      { text: "Minimalist — a few curated essentials and I'm set", points: 'fresh_linen' },
      { text: "It varies — I love experimenting with new looks and moods", points: 'wild_orchid' },
    ],
  },
  {
    id: 9,
    question: "What kind of music do you gravitate toward?",
    emoji: "🎵",
    options: [
      { text: "Jazz and soul — smooth, deep, and moody", points: 'midnight_rose' },
      { text: "Indie folk and surf rock — easygoing and uplifting", points: 'ocean_breeze' },
      { text: "Classical and bossa nova — elegant and timeless", points: 'golden_amber' },
      { text: "Ambient and lo-fi — calm and atmospheric", points: 'fresh_linen' },
      { text: "World music and alternative — eclectic and boundary-pushing", points: 'wild_orchid' },
    ],
  },
  {
    id: 10,
    question: "Choose the scent memory that speaks to your soul:",
    emoji: "💭",
    options: [
      { text: "Velvet roses and candle smoke on a rainy night", points: 'midnight_rose' },
      { text: "Salt air and sun-warmed driftwood on the shore", points: 'ocean_breeze' },
      { text: "Warm vanilla and aged sandalwood by a fireplace", points: 'golden_amber' },
      { text: "Freshly laundered sheets fluttering in a spring breeze", points: 'fresh_linen' },
      { text: "A blooming jasmine garden after a tropical rain", points: 'wild_orchid' },
    ],
  },
];

export const perfumes: Record<PerfumeId, Perfume> = {
  midnight_rose: {
    id: 'midnight_rose',
    name: "Midnight Rose",
    tagline: "For the enigmatic soul who leaves a trail of mystery",
    description: "Bold, dark, and irresistibly captivating. Midnight Rose is for the woman or man who commands the room without saying a word. With deep floral notes intertwined with smoky undertones, this fragrance is your secret weapon for unforgettable evenings.",
    topNotes: ["Black Pepper", "Saffron", "Bergamot"],
    heartNotes: ["Damask Rose", "Dark Plum", "Iris"],
    baseNotes: ["Oud Wood", "Smoky Vetiver", "Black Amber"],
    personality: "You're magnetic and intriguing. People are drawn to your depth and quiet confidence. You don't follow trends — you set them from the shadows.",
    color: "#7B2D5F",
    gradient: "from-purple-900 via-rose-900 to-black",
    emoji: "🌙",
    bgGradient: "linear-gradient(135deg, #2d0a1e 0%, #4a1340 25%, #1a0a15 50%, #0d0d0d 100%)",
  },
  ocean_breeze: {
    id: 'ocean_breeze',
    name: "Ocean Breeze",
    tagline: "For the untamed spirit who rides the waves of life",
    description: "Fresh, invigorating, and endlessly free. Ocean Breeze captures the exhilaration of standing at the edge of the world, salt in your hair and the horizon ahead. It's a scent for those who refuse to be contained.",
    topNotes: ["Sea Salt", "Grapefruit", "Cucumber"],
    heartNotes: ["Jasmine Sambac", "Water Lily", "Driftwood"],
    baseNotes: ["White Musk", "Sandy Amber", "Cedar"],
    personality: "You're adventurous and unstoppable. Your energy is contagious, and you find beauty in the journey. You live life with the windows down and the music loud.",
    color: "#1A8A8A",
    gradient: "from-teal-500 via-cyan-600 to-blue-800",
    emoji: "🌊",
    bgGradient: "linear-gradient(135deg, #0a2e3d 0%, #134e5e 25%, #1a6b7a 50%, #0d3d4d 100%)",
  },
  golden_amber: {
    id: 'golden_amber',
    name: "Golden Amber",
    tagline: "For the refined connoisseur who embodies timeless elegance",
    description: "Warm, luxurious, and gracefully sophisticated. Golden Amber wraps you in an aura of understated opulence. Inspired by sun-drenched afternoons and the quiet confidence of someone who knows their worth.",
    topNotes: ["Italian Bergamot", "Honeyed Fig", "Cardamom"],
    heartNotes: ["Golden Saffron", "Turkish Rose", "Cashmere Wood"],
    baseNotes: ["Amber Resin", "Sandalwood", "Tonka Bean"],
    personality: "You're poised and discerning. You appreciate the finer things but never flaunt them. Your warmth draws people in, and your wisdom keeps them close.",
    color: "#B8860B",
    gradient: "from-amber-400 via-yellow-600 to-amber-800",
    emoji: "✨",
    bgGradient: "linear-gradient(135deg, #3d2a0a 0%, #5e4313 25%, #4a350d 50%, #2a1d08 100%)",
  },
  fresh_linen: {
    id: 'fresh_linen',
    name: "Fresh Linen",
    tagline: "For the serene minimalist who finds luxury in simplicity",
    description: "Clean, calming, and effortlessly pure. Fresh Linen is a love letter to the beauty of less. It evokes the satisfying feeling of a perfectly made bed, a clear mind, and the first breath of a new day.",
    topNotes: ["White Tea", "Bergamot", "Pear Blossom"],
    heartNotes: ["Lily of the Valley", "Soft Iris", "Cotton Flower"],
    baseNotes: ["Clean Musk", "Blonde Woods", "White Cedar"],
    personality: "You're composed and intentional. In a world of noise, you find power in simplicity. People admire your ability to stay grounded and see things clearly.",
    color: "#6B8F9E",
    gradient: "from-slate-200 via-blue-200 to-blue-400",
    emoji: "🕊️",
    bgGradient: "linear-gradient(135deg, #e8edf2 0%, #d4dde6 25%, #c7d3df 50%, #e0e8ef 100%)",
  },
  wild_orchid: {
    id: 'wild_orchid',
    name: "Wild Orchid",
    tagline: "For the creative visionary who blooms boldly",
    description: "Exotic, vibrant, and unapologetically expressive. Wild Orchid is a fragrance that refuses to be ignored — a lush, intoxicating blend that celebrates the beauty of being delightfully different.",
    topNotes: ["Passionfruit", "Pink Pepper", "Mandarin"],
    heartNotes: ["Wild Orchid", "Frangipani", "Saffron Crocus"],
    baseNotes: ["Dark Chocolate", "Patchouli", "Vanilla Absolute"],
    personality: "You're a creative force. You see the world through a kaleidoscope and inspire others to embrace their uniqueness. Your passion is your superpower.",
    color: "#9B30FF",
    gradient: "from-fuchsia-500 via-purple-600 to-violet-900",
    emoji: "🌺",
    bgGradient: "linear-gradient(135deg, #2d0a3d 0%, #4a1365 25%, #3d0d52 50%, #1a0628 100%)",
  },
};
