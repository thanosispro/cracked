// components/QuizPreview.js

export default function QuizPreview({ questions, results, onReset, onNextSet }) {
  const score = results.filter(r => r.isCorrect).length;
  const accuracy = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-6">

      <div className="text-center p-12 bg-[#0a0f1e] rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="inline-block p-4 rounded-full bg-white/5 mb-4 border border-white/5">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            {accuracy}%
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white">Performance Report</h2>
        <p className="text-slate-500 mt-2">Set Completed! Excellent progress.</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
          <button
            onClick={onNextSet}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            Generate Next Set
          </button>
          <button
            onClick={onReset}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-bold transition-all border border-white/5"
          >
            Back to Lobby
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold px-4 text-white">Review Answers</h3>
        {questions.map((q, idx) => {
          const userAns = results.find(r => r.questionId === q.id);
          const isCorrect = userAns?.isCorrect;

          return (
            <div key={idx} className={`p-6 rounded-2xl border transition-all duration-300 ${isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
              <p className="font-bold text-slate-200 text-lg mb-3">{q.question}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    Your Answer: {userAns?.choice}
                  </span>
                  {!isCorrect && (
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded text-xs font-bold uppercase border border-rose-500/20">Incorrect</span>
                  )}
                  {isCorrect && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs font-bold uppercase border border-emerald-500/20">Correct</span>
                  )}
                </div>

                {!isCorrect && <p className="text-emerald-400 font-bold">Correct: {q.answer}</p>}

                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-slate-500 text-xs leading-relaxed"><span className="font-bold text-slate-400">Note:</span> {q.reason}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}