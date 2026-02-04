// components/QuizLobby.js
import { Zap, Layers, Trophy, Clock, Target, Info } from 'lucide-react';

export default function QuizLobby({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">

      {/* Welcome & Global Stats */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3 h-3" />
          Challenge Status: Active
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Ready for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Knowledge Drill?</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto leading-relaxed text-lg">
          Sharpen your skills with our curated question database. Track your accuracy, review your mistakes, and dominate the leaderboard.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="p-6 bg-[#0a0f1e] border border-white/5 rounded-2xl text-center hover:border-indigo-500/30 transition-colors">
          <Target className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">85%</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Avg. Accuracy</p>
        </div>
        <div className="p-6 bg-[#0a0f1e] border border-white/5 rounded-2xl text-center hover:border-indigo-500/30 transition-colors">
          <Clock className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">1.2k</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Minutes Practiced</p>
        </div>
        <div className="p-6 bg-[#0a0f1e] border border-white/5 rounded-2xl text-center hidden md:block hover:border-indigo-500/30 transition-colors">
          <Layers className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">50+</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Sets Available</p>
        </div>
      </div>

      {/* Main Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Random Mode Card */}
        <button
          onClick={() => onStart('random', 10)}
          className="relative w-full p-8 bg-[#0a0f1e] border border-white/5 rounded-3xl overflow-hidden group text-left hover:bg-[#111827] hover:border-indigo-500/30 transition-all duration-200"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-32 h-32 text-indigo-500" />
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Quick Mix</h3>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Jump straight into action with 10 random questions from all topics. Best for daily practice.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Start Drill <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        {/* Set Mode Card */}
        <button
          onClick={() => onStart('set')}
          className="relative w-full p-8 bg-[#0a0f1e] border border-white/5 rounded-3xl overflow-hidden group text-left hover:bg-[#111827] hover:border-cyan-500/30 transition-all duration-200"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Layers className="w-32 h-32 text-cyan-500" />
          </div>
          <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Mystery Set</h3>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Take on a hand-crafted set of 10 themed questions. Perfect for mastering specific chapters.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Do Set <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>
      </div>

      {/* Footer Pro-Tip Section */}
      <div className="w-full max-w-2xl p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-yellow-500/10 rounded-lg">
          <Info className="w-4 h-4 text-yellow-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pro Tip</p>
          <p className="text-xs text-slate-500 mt-1">
            Always read the <span className="text-slate-400 font-semibold italic">reasoning</span> after answering, even if you got it right. It helps cement the logic in your long-term memory.
          </p>
        </div>
      </div>

    </div>
  );
}