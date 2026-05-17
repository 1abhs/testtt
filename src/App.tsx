import { useState } from 'react';

// 5 Perfumes with distinct personalities
const perfumes = [
  {
    id: 1,
    name: "Midnight Rose",
    tagline: "Mysterious & Alluring",
    description: "A captivating blend of dark rose, patchouli, and vanilla. Perfect for the enigmatic soul who leaves a lasting impression.",
    notes: ["Dark Rose", "Patchouli", "Vanilla", "Amber"],
    personality: "mysterious",
    image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?w=400&h=400&fit=crop",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 2,
    name: "Ocean Breeze",
    tagline: "Free & Adventurous",
    description: "Fresh sea salt, citrus, and driftwood capture the spirit of endless horizons. For those who chase sunsets.",
    notes: ["Sea Salt", "Bergamot", "Driftwood", "White Musk"],
    personality: "adventurous",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 3,
    name: "Golden Amber",
    tagline: "Warm & Confident",
    description: "Rich amber, sandalwood, and honey create an aura of warmth and sophistication. Command every room you enter.",
    notes: ["Amber", "Sandalwood", "Honey", "Tonka Bean"],
    personality: "confident",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 4,
    name: "Wild Jasmine",
    tagline: "Playful & Vibrant",
    description: "Jasmine, peach, and pink pepper burst with energy. For the free spirit who dances through life.",
    notes: ["Jasmine", "Peach", "Pink Pepper", "White Tea"],
    personality: "playful",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
    color: "from-pink-400 to-rose-400"
  },
  {
    id: 5,
    name: "Forest Mist",
    tagline: "Calm & Grounded",
    description: "Eucalyptus, cedar, and moss bring the tranquility of ancient forests. For the mindful soul seeking balance.",
    notes: ["Eucalyptus", "Cedar", "Moss", "Green Tea"],
    personality: "calm",
    image: "https://images.unsplash.com/photo-1616999335656-7db876786f9d?w=400&h=400&fit=crop",
    color: "from-emerald-500 to-teal-500"
  }
];

// Personality test questions
const questions = [
  {
    id: 1,
    question: "How do you prefer to spend your weekend?",
    options: [
      { text: "Exploring new places and adventures", type: "adventurous" },
      { text: "Hosting a gathering with friends", type: "confident" },
      { text: "Reading or meditating at home", type: "calm" },
      { text: "Trying something creative and spontaneous", type: "playful" },
      { text: "Having deep conversations in intimate settings", type: "mysterious" }
    ]
  },
  {
    id: 2,
    question: "What's your ideal vacation destination?",
    options: [
      { text: "A bustling city with endless energy", type: "confident" },
      { text: "A secluded beach or mountain retreat", type: "calm" },
      { text: "An exotic location off the beaten path", type: "adventurous" },
      { text: "A romantic European city at night", type: "mysterious" },
      { text: "A festival or cultural celebration", type: "playful" }
    ]
  },
  {
    id: 3,
    question: "Which scent family appeals to you most?",
    options: [
      { text: "Fresh and aquatic", type: "adventurous" },
      { text: "Warm and spicy", type: "confident" },
      { text: "Floral and sweet", type: "playful" },
      { text: "Woody and earthy", type: "calm" },
      { text: "Oriental and exotic", type: "mysterious" }
    ]
  },
  {
    id: 4,
    question: "How would your friends describe you?",
    options: [
      { text: "The life of the party", type: "playful" },
      { text: "The reliable and grounded one", type: "calm" },
      { text: "The bold and ambitious one", type: "confident" },
      { text: "The mysterious and intriguing one", type: "mysterious" },
      { text: "The adventurous explorer", type: "adventurous" }
    ]
  },
  {
    id: 5,
    question: "What's your favorite time of day?",
    options: [
      { text: "Early morning with fresh air", type: "calm" },
      { text: "Midday when energy is high", type: "confident" },
      { text: "Golden hour before sunset", type: "adventurous" },
      { text: "Late night under the stars", type: "mysterious" },
      { text: "Whenever something fun is happening", type: "playful" }
    ]
  },
  {
    id: 6,
    question: "Choose a color that resonates with you:",
    options: [
      { text: "Deep purple or burgundy", type: "mysterious" },
      { text: "Ocean blue or turquoise", type: "adventurous" },
      { text: "Gold or warm amber", type: "confident" },
      { text: "Soft pink or coral", type: "playful" },
      { text: "Forest green or earth tones", type: "calm" }
    ]
  },
  {
    id: 7,
    question: "What's your go-to outfit style?",
    options: [
      { text: "Elegant and sophisticated", type: "confident" },
      { text: "Comfortable and natural", type: "calm" },
      { text: "Bold and eye-catching", type: "playful" },
      { text: "Edgy and unique", type: "mysterious" },
      { text: "Casual and ready for anything", type: "adventurous" }
    ]
  }
];

type Screen = 'welcome' | 'quiz' | 'result';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof perfumes[0] | null>(null);

  const calculateResult = () => {
    const counts: Record<string, number> = {
      mysterious: 0,
      adventurous: 0,
      confident: 0,
      playful: 0,
      calm: 0
    };

    answers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const maxType = Object.entries(counts).reduce((a, b) => 
      b[1] > a[1] ? b : a
    )[0];

    const matchedPerfume = perfumes.find(p => p.personality === maxType) || perfumes[0];
    setResult(matchedPerfume);
  };

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
      setCurrentScreen('result');
    }
  };

  const resetQuiz = () => {
    setCurrentScreen('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.021-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-800">Scent Match</span>
          </div>
          {currentScreen === 'quiz' && (
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          )}
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Screen */}
          {currentScreen === 'welcome' && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Discover Your
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Signature Scent
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  Take our personality quiz and we'll match you with the perfect perfume from our curated collection.
                </p>
              </div>

              <div className="flex justify-center gap-4 py-8">
                {perfumes.map((perfume, i) => (
                  <div
                    key={perfume.id}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg md:text-xl shadow-lg"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    🌸
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentScreen('quiz')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transform hover:-translate-y-1 transition-all duration-300"
              >
                Start the Quiz
              </button>

              <div className="pt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white/60 backdrop-blur rounded-xl">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-sm font-medium text-gray-700">7 Questions</div>
                </div>
                <div className="p-4 bg-white/60 backdrop-blur rounded-xl">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-700">Personalized</div>
                </div>
                <div className="p-4 bg-white/60 backdrop-blur rounded-xl">
                  <div className="text-2xl mb-2">💎</div>
                  <div className="text-sm font-medium text-gray-700">5 Unique Scents</div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Screen */}
          {currentScreen === 'quiz' && (
            <div className="space-y-6 animate-fade-in">
              {/* Progress Bar */}
              <div className="bg-white/60 backdrop-blur rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
                    >
                      <span className="text-gray-700 group-hover:text-purple-700 font-medium">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result Screen */}
          {currentScreen === 'result' && result && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✨ Your Perfect Match
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  We recommend...
                </h2>
              </div>

              {/* Perfume Card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                <div className={`h-48 md:h-64 bg-gradient-to-br ${result.color} relative`}>
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm opacity-90 mb-1">{result.tagline}</p>
                    <h3 className="text-3xl md:text-4xl font-bold">{result.name}</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {result.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Fragrance Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.notes.map((note, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400" />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                      </div>
                      <span className="text-sm text-gray-500">Long-lasting • Eau de Parfum</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Perfumes */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  Explore Other Scents
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {perfumes.filter(p => p.id !== result.id).map((perfume) => (
                    <div
                      key={perfume.id}
                      className={`p-4 rounded-xl bg-gradient-to-br ${perfume.color} text-white text-center cursor-pointer hover:scale-105 transition-transform`}
                    >
                      <div className="text-2xl mb-1">🌺</div>
                      <div className="text-xs font-medium">{perfume.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-purple-400 hover:text-purple-600 transition-colors"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => alert('Thank you for trying Scent Match! This is a demo.')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Shop This Scent
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 Scent Match. Find your signature fragrance.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
