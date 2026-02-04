import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // note: framer-motion is standard name
import { Search, ExternalLink, MoveRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { simulationsData } from '../data/simulations';
import { X } from 'lucide-react';
const ScienceLinks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('physics');

    // Filter Logic
    const filteredSims = useMemo(() => {
        return simulationsData.filter((sim) => {
            const matchesSearch = sim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sim.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTab = sim.category === activeTab;
            return matchesSearch && matchesTab;
        });
    }, [searchTerm, activeTab]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">

            {/* Header & Search Section */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Science</span>
                            <span className="text-white">Links</span>
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-md">
                            Interactive simulation command center for Grade 12 students.
                        </p>
                    </motion.div>

                    {/* Search Bar UI */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search topics (e.g. 'Doppler', 'Circuit')..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-xl"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex space-x-8 border-b border-neutral-800 pb-px">
                    {['physics'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "relative pb-4 text-sm font-bold uppercase tracking-widest transition-colors",
                                activeTab === tab ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Container */}
            <div className="max-w-7xl mx-auto">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredSims.map((sim) => (
                            <motion.div
                                key={sim.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <a href={sim.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                                    <div className="relative h-full bg-neutral-900/40 border border-white/5 rounded-3xl p-8 hover:bg-neutral-800/40 transition-all duration-500 hover:border-cyan-500/30 overflow-hidden">

                                        {/* Icon & External Link */}
                                        <div className="flex justify-between items-start mb-12">
                                            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                                                {sim.icon}
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{sim.title}</h3>
                                        <p className="text-neutral-400 leading-relaxed mb-6">{sim.description}</p>

                                        <div className="flex items-center text-cyan-400 font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                                            Open Simulation <MoveRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredSims.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-neutral-500 text-xl">No simulations found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScienceLinks;