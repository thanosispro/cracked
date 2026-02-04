"use client";
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import QuizEngine from '@/components/quiz/quizEngine';
import QuizLobby from '@/components/quiz/lobby';
import QuizPreview from '@/components/quiz/quizPreview';
// change title of document to "Quizzes | Crackfor"
export default function QuizPage() {
  useEffect(() => {
    document.title = "Quizzes | Crackfor";
  }, []);
  const [view, setView] = useState('lobby');
  const [questions, setQuestions] = useState([]);
  const [currentSetId, setCurrentSetId] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Function to get excluded sets from Cookies
  const getCompletedSets = () => {
    const saved = Cookies.get('completed_sets');
    return saved ? saved : '';
  };

  const startQuiz = async (mode) => {
    const excluded = getCompletedSets();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quiz/?mode=${mode}&exclude=${excluded}`
      );
      const data = await res.json();

      setQuestions(data.questions);
      setCurrentSetId(data.set_number); // Store the ID of the set we just fetched
      setView('playing');
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const finishQuiz = (userAnswers) => {
    setResults(userAnswers);

    // 2. Save the completed set ID to Cookies
    if (currentSetId) {
      const existing = getCompletedSets();
      const updated = existing ? `${existing},${currentSetId}` : `${currentSetId}`;

      // Store for 7 days
      Cookies.set('completed_sets', updated, { expires: 7 });
    }

    setView('preview');
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 pt-32 pb-20 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-400 animate-pulse">Preparing your challenge...</p>
          </div>
        ) : (
          <>
            {view === 'lobby' && <QuizLobby onStart={startQuiz} />}
            {view === 'playing' && (
              <QuizEngine
                questions={questions}
                onFinish={finishQuiz}
                onExit={() => setView('lobby')}
              />
            )}
            {view === 'preview' && (
              <QuizPreview
                questions={questions}
                results={results}
                onReset={() => setView('lobby')}
                onNextSet={() => startQuiz('set')} // Direct "Next Set" trigger
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}