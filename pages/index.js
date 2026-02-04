import React, { useState } from 'react';
import { ArrowRight, Star, Zap, Beaker, Atom, BookOpen, Users, CheckCircle2, ChevronDown, PlayCircle, ShieldCheck, Trophy, Upload, Brain, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const subjects = [
    {
      id: 1,
      title: 'Chemistry',
      icon: Beaker,
      topics: 'Organic, Inorganic, Physical',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      description: 'Master the science of molecules and reactions with immersive labs.'
    },
    {
      id: 2,
      title: 'Physics',
      icon: Atom,
      topics: 'Mechanics, Thermodynamics, Waves',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      description: 'Understand the laws of motion and energy through real-world examples.'
    },
    {
      id: 3,
      title: 'Biology',
      icon: BookOpen,
      topics: 'Cells, Genetics, Evolution',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      description: 'Explore the science of life with detailed anatomical visualizations.'
    },
    {
      id: 4,
      title: 'Mathematics',
      icon: Zap,
      topics: 'Algebra, Geometry, Calculus',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      description: 'Solve complex problems with precision and interactive graphs.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '1.2M', label: 'Questions Solved' },
    { number: '98%', label: 'Exam Success Rate' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  const faqs = [
    { q: "Are there all notes of every subject", a: "Mostly yes. But Subject like Maths,Physics,Computers are less available " },
    { q: "Is it completely Free ?", a: "Yes it is completely free" },
    { q: "How are notes/Questions made ?", a: "Notes are made by myself(Parlee Khadka) based on OLD IS GOLD book + Old questions  (Mostly repeated+important) in a easy way to memorize" },
    { q: "What will I get from this website ?", a: "You will get notes,questions,quizzes,simulations that will mostly help you to score good marks . As we have mentioned . If you are here for knowledge (This website is not for you)" }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 text-xs font-medium tracking-wide uppercase">New Session Started</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
              Master Your Exams with <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Professional Precision
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              A complete ecosystem for science students. High-yield notes, adaptive quizzes, and performance analytics designed to maximize your score.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {[
                { title: "Subjects", icon: BookOpen, href: "/subjects", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { title: "Quiz Zone", icon: Brain, href: "/quiz", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                { title: "Simulations", icon: Atom, href: "/science-links", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                { title: "Upload Notes", icon: Upload, href: "/upload", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="group relative">
                  <div className={`h-full p-6 ${item.bg} border ${item.border} rounded-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-sm`}>
                    <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                      <item.icon size={28} />
                    </div>
                    <span className="text-white font-bold tracking-wide">{item.title}</span>

                    {/* Hover Glow */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/5 to-transparent pointer-events-none`}></div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Subjects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Subjects</h2>
              <p className="text-slate-400 text-lg max-w-xl">Deep dive into the fundamental sciences with our structured curriculum.</p>
            </div>
            <Link href="/subjects" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2">
              View Syllabus <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <Link key={subject.id} href={`/subjects#${subject.title.toLowerCase()}`} className="group block h-full">
                  <div className={`h-full p-8 bg-[#0a0f1e] rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-[#111827] transition-all duration-300 relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 p-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity ${subject.bg.replace('/10', '/30')}`}></div>

                    <div className={`w-14 h-14 rounded-xl ${subject.bg} ${subject.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                      <IconComponent size={28} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{subject.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                      {subject.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white transition-colors uppercase tracking-wider">
                      Explore Module <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>





      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0a0f1e] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="text-lg font-medium text-slate-200">{faq.q}</span>
                  <ChevronDown className={`text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 text-slate-400 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-indigo-900/50 to-violet-900/50 rounded-3xl p-12 md:p-20 text-center border border-white/10 overflow-hidden">

            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to dominate your finals?</h2>
              <p className="text-slate-300 mb-10 text-xl max-w-2xl mx-auto">Join the platform that is redefining high school education in Nepal.</p>
              <Link href="/subjects">
                <button className="px-10 py-5 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl shadow-indigo-900/50">
                  Join 12Crack Today
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

    </main>
  );
}