'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link';

const navMenu = ['Home', 'Subjects', 'Quiz', 'Simulation', 'Upload', 'Contact', 'About', 'Admin'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.jpg" alt="12Crack Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 border border-white/10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              12Crack
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navMenu.map((item) => (
              <Link key={item} href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-slate-400 hover:text-white font-medium transition-colors duration-200 relative group text-sm tracking-wide">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
            {/* Add an Link to /subject in Button get started */}
            <Link href="/subjects">
              <button className="px-6 py-2.5 bg-white text-slate-900 rounded-lg hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 font-semibold text-sm">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#0f172a] border-b border-white/5 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-6 space-y-4">
            {navMenu.map((item) => (
              <Link
                onClick={() => setIsOpen(false)}
                key={item}
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                className="block text-lg font-medium text-slate-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-indigo-500 pl-4"
              >
                {item}
              </Link>
            ))}
            <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-900/50 mt-4 border border-white/10">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar