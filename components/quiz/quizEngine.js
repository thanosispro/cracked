// components/QuizEngine.js
import { useState, useEffect } from 'react';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

export default function QuizEngine({ questions, onFinish, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReason, setShowReason] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  const currentQ = questions[currentIndex];
  useEffect(() => {
    // Set website scroll to top of document
    window.scrollTo(0, 0);
  }, []);
  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    setShowReason(true);

    const isCorrect = option === currentQ.answer;
    const updatedAnswers = [...userAnswers, { questionId: currentQ.id, choice: option, isCorrect }];

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setShowReason(false);
        setUserAnswers(updatedAnswers);
        // Scroll to top of card if needed, but usually redundant in this focused view
      } else {
        onFinish(updatedAnswers);
      }
    }, 2000); // Shorter delay for snappier feel
  };

  return (
    <div className="w-full relative">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setConfirmExit(true)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Quit Session
        </button>

        <div className="text-right">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
            Accuracy: {userAnswers.length > 0 ? Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/5 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Exit Confirmation Overlay */}
      {confirmExit && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl p-6 text-center">
          <div className="space-y-4 max-w-sm bg-[#0a0f1e] p-8 rounded-2xl shadow-2xl border border-white/10">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">Abandon Progress?</h3>
            <p className="text-slate-400 text-sm">Your answers for this session will not be saved.</p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setConfirmExit(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-all"
              >
                Stay
              </button>
              <button
                onClick={onExit}
                className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-bold transition-all border border-red-500/20"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-[#0a0f1e] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl">
        <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-[0.2em] bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Step {currentIndex + 1}</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-8 leading-relaxed text-slate-200">{currentQ.question}</h2>

        <div className="grid gap-4">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              disabled={!!selected || confirmExit}
              onClick={() => handleSelect(opt)}
              className={`p-6 rounded-2xl text-left border-2 transition-all duration-200 font-medium ${selected === opt
                ? opt === currentQ.answer
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                : selected && opt === currentQ.answer
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-slate-400 hover:text-slate-200'
                }`}
            >
              <div className="flex justify-between items-center">
                <span>{opt}</span>
                {selected === opt && (
                  <span className="text-[10px] font-bold uppercase tracking-wider">{opt === currentQ.answer ? 'Correct' : 'Incorrect'}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {showReason && (
          <div className="mt-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm leading-relaxed text-slate-400">
              <span className="text-indigo-400 font-bold block mb-1">Explanation:</span> {currentQ.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}