import { useState, useEffect } from 'react';
import { questions, perfumes, type PerfumeId, type Perfume } from './data/quizData';

type Screen = 'welcome' | 'quiz' | 'calculating' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<PerfumeId, number>>({
    midnight_rose: 0,
    ocean_breeze: 0,
    golden_amber: 0,
    fresh_linen: 0,
    wild_orchid: 0,
  });
  const [result, setResult] = useState<Perfume | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [calculatingStep, setCalculatingStep] = useState(0);

  useEffect(() => {
    setFadeIn(true);
  }, [screen, currentQuestion]);

  const handleStart = () => {
    setScreen('quiz');
    setFadeIn(false);
  };

  const handleAnswer = (perfumeId: PerfumeId, optionIndex: number) => {
    if (animatingOut) return;
    setSelectedOption(optionIndex);
    setAnimatingOut(true);

    setTimeout(() => {
      const newScores = { ...scores, [perfumeId]: scores[perfumeId] + 1 };
      setScores(newScores);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setFadeIn(false);
        setAnimatingOut(false);
      } else {
        // Calculate result
        setScreen('calculating');
        setFadeIn(false);
        setAnimatingOut(false);

        // Simulate a "calculating" animation
        setTimeout(() => {
          const maxScore = Math.max(...Object.values(newScores));
          const winner = (Object.keys(newScores) as PerfumeId[]).find(
            (key) => newScores[key] === maxScore
          )!;
          setResult(perfumes[winner]);

          // Step through calculation animation
          setCalculatingStep(1);
          setTimeout(() => setCalculatingStep(2), 600);
          setTimeout(() => setCalculatingStep(3), 1200);
          setTimeout(() => {
            setScreen('result');
            setFadeIn(false);
          }, 2000);
        }, 300);
      }
    }, 400);
  };

  const handleRestart = () => {
    setScreen('welcome');
    setCurrentQuestion(0);
    setScores({
      midnight_rose: 0,
      ocean_breeze: 0,
      golden_amber: 0,
      fresh_linen: 0,
      wild_orchid: 0,
    });
    setResult(null);
    setSelectedOption(null);
    setCalculatingStep(0);
    setFadeIn(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {screen === 'welcome' && <WelcomeScreen onStart={handleStart} fadeIn={fadeIn} />}
      {screen === 'quiz' && (
        <QuizScreen
          question={questions[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={questions.length}
          progress={progress}
          onAnswer={handleAnswer}
          fadeIn={fadeIn}
          selectedOption={selectedOption}
          animatingOut={animatingOut}
        />
      )}
      {screen === 'calculating' && <CalculatingScreen step={calculatingStep} />}
      {screen === 'result' && result && (
        <ResultScreen perfume={result} fadeIn={fadeIn} onRestart={handleRestart} />
      )}
    </div>
  );
}

function WelcomeScreen({ onStart, fadeIn }: { onStart: () => void; fadeIn: boolean }) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
          🧴
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
          Scent Profile
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-3 font-light">
          Discover Your Signature Perfume
        </p>
        <p className="text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">
          Answer 10 intriguing questions about your personality, lifestyle, and preferences — and we'll reveal the fragrance that was made for you.
        </p>

        <button
          onClick={onStart}
          className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-rose-600 rounded-full text-lg font-semibold 
                     hover:from-purple-500 hover:to-rose-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25
                     active:scale-95"
        >
          <span className="relative z-10">Begin the Journey</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-rose-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
        </button>

        <div className="mt-16 flex items-center justify-center gap-8 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span>⏱️</span> <span>3 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <span>❓</span> <span>10 questions</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🧴</span> <span>5 perfumes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  progress,
  onAnswer,
  fadeIn,
  selectedOption,
  animatingOut,
}: {
  question: (typeof questions)[0];
  questionIndex: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (perfumeId: PerfumeId, optionIndex: number) => void;
  fadeIn: boolean;
  selectedOption: number | null;
  animatingOut: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col px-6 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 font-medium">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${animatingOut ? 'opacity-0 -translate-x-8' : ''}`}
      >
        <div className="text-center mb-10">
          <span className="text-4xl mb-4 block">{question.emoji}</span>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3 flex-1">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option.points, idx)}
              className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 
                ${
                  selectedOption === idx
                    ? 'bg-purple-600/30 border-purple-400 scale-[1.02] shadow-lg shadow-purple-500/10'
                    : 'bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 hover:border-gray-600 hover:scale-[1.01]'
                }
                ${animatingOut && selectedOption !== idx ? 'opacity-30 scale-95' : ''}
              `}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                    ${
                      selectedOption === idx
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }
                  `}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={`text-base md:text-lg transition-colors duration-300 ${
                  selectedOption === idx ? 'text-white' : 'text-gray-300'
                }`}>
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalculatingScreen({ step }: { step: number }) {
  const labels = [
    'Analyzing your personality...',
    'Matching scent profiles...',
    'Your signature fragrance is...',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
          <div
            className="absolute inset-2 rounded-full border-2 border-rose-500/30 animate-ping"
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className="absolute inset-4 rounded-full border-2 border-amber-500/30 animate-ping"
            style={{ animationDelay: '1s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-5xl">
            {['🔍', '🧪', '✨'][step] || '🔍'}
          </div>
        </div>
        <p className="text-xl text-gray-300 animate-pulse">{labels[Math.min(step, 2)]}</p>
      </div>
    </div>
  );
}

function ResultScreen({
  perfume,
  fadeIn,
  onRestart,
}: {
  perfume: Perfume;
  fadeIn: boolean;
  onRestart: () => void;
}) {
  const isLight = perfume.id === 'fresh_linen';

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: perfume.bgGradient }} />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: perfume.color }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: perfume.color, animationDelay: '1s' }}
        />
      </div>

      <div
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-all duration-1000 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-xl w-full text-center">
          {/* Emoji & Label */}
          <div className="mb-6">
            <span className="text-7xl block mb-4">{perfume.emoji}</span>
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase ${
                isLight ? 'bg-black/10 text-gray-700' : 'bg-white/10 text-white/80'
              }`}
            >
              Your Signature Scent
            </span>
          </div>

          {/* Name & Tagline */}
          <h1
            className={`text-5xl md:text-6xl font-bold mb-3 ${
              isLight ? 'text-gray-800' : 'text-white'
            }`}
          >
            {perfume.name}
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 italic ${
              isLight ? 'text-gray-600' : 'text-white/70'
            }`}
          >
            "{perfume.tagline}"
          </p>

          {/* Description */}
          <div
            className={`rounded-3xl p-6 mb-6 backdrop-blur-md ${
              isLight ? 'bg-white/30' : 'bg-white/5'
            }`}
          >
            <p className={`leading-relaxed text-base ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
              {perfume.description}
            </p>
          </div>

          {/* Fragrance Notes */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div
              className={`rounded-2xl p-4 backdrop-blur-md ${
                isLight ? 'bg-white/25' : 'bg-white/5'
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isLight ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Top Notes
              </h3>
              <div className="space-y-1">
                {perfume.topNotes.map((note, i) => (
                  <p key={i} className={`text-sm ${isLight ? 'text-gray-700' : 'text-white/80'}`}>
                    {note}
                  </p>
                ))}
              </div>
            </div>
            <div
              className={`rounded-2xl p-4 backdrop-blur-md ${
                isLight ? 'bg-white/25' : 'bg-white/5'
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isLight ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Heart Notes
              </h3>
              <div className="space-y-1">
                {perfume.heartNotes.map((note, i) => (
                  <p key={i} className={`text-sm ${isLight ? 'text-gray-700' : 'text-white/80'}`}>
                    {note}
                  </p>
                ))}
              </div>
            </div>
            <div
              className={`rounded-2xl p-4 backdrop-blur-md ${
                isLight ? 'bg-white/25' : 'bg-white/5'
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isLight ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Base Notes
              </h3>
              <div className="space-y-1">
                {perfume.baseNotes.map((note, i) => (
                  <p key={i} className={`text-sm ${isLight ? 'text-gray-700' : 'text-white/80'}`}>
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Personality */}
          <div
            className={`rounded-3xl p-6 mb-8 backdrop-blur-md ${
              isLight ? 'bg-white/30' : 'bg-white/5'
            }`}
          >
            <h3
              className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                isLight ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              What This Says About You
            </h3>
            <p className={`leading-relaxed text-base ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
              {perfume.personality}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className={`px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                isLight
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              Retake the Quiz
            </button>
            <button
              onClick={() => {
                const text = `My signature scent is ${perfume.name}! ${perfume.tagline} 🧴✨`;
                if (navigator.share) {
                  navigator.share({ title: 'Scent Profile', text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert('Result copied to clipboard!');
                }
              }}
              className={`px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                isLight
                  ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-rose-500 text-white'
              }`}
            >
              Share My Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
