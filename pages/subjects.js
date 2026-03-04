'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Search, FileText, Calendar, User, Download, X, Loader, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#0a0f1e]">
      <Loader size={48} className="text-indigo-500 animate-spin" />
    </div>
  ),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
// change title of document to "Subjects | Crackfor"
export default function SubjectsPage() {
  useEffect(() => {
    document.title = "Subjects | Crackfor";
  }, []);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(true);

  const categories = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'computer', label: 'Computer' }
  ];

  // Fetch subjects from API
  const fetchSubjects = useCallback(async (search = '', category = '') => {
    try {
      setLoading(true);
      setError('');

      let url = `${API_BASE_URL}/api/getSubjects/?`;
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (category && category !== 'all') url += `category=${encodeURIComponent(category)}&`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }

      const data = await response.json();

      // Handle both array and paginated response formats
      const subjectsData = Array.isArray(data) ? data : data.results || [];
      setSubjects(subjectsData);
      setFilteredSubjects(subjectsData);
    } catch (err) {
      setError(err.message || 'Failed to load subjects. Please try again later.');
      setSubjects([]);
      setFilteredSubjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSubjects(searchQuery, selectedCategory !== 'all' ? selectedCategory : '');
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, fetchSubjects]);

  const handleDownloadPdf = (pdfLink, name) => {
    const fullUrl = `${API_BASE_URL}${pdfLink}`;
    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4">
      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col">
          <PdfViewer
            fileUrl={`${API_BASE_URL}${selectedPdf.pdfLink}`}
            fileName={selectedPdf.name}
            onDownload={() => handleDownloadPdf(selectedPdf.pdfLink, selectedPdf.name)}
            onClose={() => {
              setSelectedPdf(null);
              setIsFullScreen(false);
            }}
            isFullScreen={isFullScreen}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white tracking-tight">
              Study <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Materials</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Access comprehensive high-yield study notes shared by top rankers.
            </p>
          </div>
          {/* create an X button to undo search query */}

          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search subjects, topics, materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-[#0a0f1e] border border-white/10 rounded-2xl focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all duration-300 text-slate-200 placeholder-slate-600 text-lg shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === cat.value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 border border-indigo-500'
                  : 'bg-[#0a0f1e] text-slate-400 border border-white/5 hover:border-indigo-500/30 hover:text-indigo-400 hover:bg-[#111827]'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {error && (
          <ScrollReveal>
            <div className="mb-8 p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-rose-400 mb-1">Error</h4>
                <p className="text-rose-300 text-sm">{error}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader size={48} className="mx-auto text-indigo-500 animate-spin mb-4" />
              <p className="text-slate-500 text-lg">Loading study materials...</p>
            </div>
          </div>
        )}

        {!loading && (
          <ScrollReveal>
            <div className="mb-8 text-center">
              <p className="text-slate-500 font-medium">
                Found <span className="text-indigo-400 font-bold">{filteredSubjects.length}</span> {filteredSubjects.length === 1 ? 'material' : 'materials'}
              </p>
            </div>
          </ScrollReveal>
        )}

        {!loading && filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject, index) => {
              const categoryTheme = {
                mathematics: { text: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/10', via: 'via-blue-500' },
                physics: { text: 'text-indigo-400', border: 'border-indigo-500/20', bg: 'bg-indigo-500/10', via: 'via-indigo-500' },
                chemistry: { text: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', via: 'via-emerald-500' },
                biology: { text: 'text-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/10', via: 'via-rose-500' },
                english: { text: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/10', via: 'via-amber-500' },
                computer: { text: 'text-violet-400', border: 'border-violet-500/20', bg: 'bg-violet-500/10', via: 'via-violet-500' },
                default: { text: 'text-slate-400', border: 'border-slate-500/20', bg: 'bg-slate-500/10', via: 'via-slate-500' }
              };

              const theme = categoryTheme[subject.category?.toLowerCase()] || categoryTheme.default;

              return (
                <ScrollReveal key={subject.id} delay={index * 0.05}>
                  <div className={`group flex flex-col h-full bg-[#0a0f1e] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:bg-[#111827] transition-all duration-300`}>
                    <div className={`h-1 w-full bg-gradient-to-r from-transparent ${theme.via} to-transparent opacity-50`} />

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${theme.bg} ${theme.text} border ${theme.border}`}>
                          {subject.category}
                        </span>
                        {subject.isAuthenticated && (
                          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <span className="text-[10px] font-bold uppercase tracking-wide">Verified</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors line-clamp-1">
                        {subject.name}
                      </h3>

                      <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                        {subject.description || "No description available for this study material."}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center text-slate-500 text-xs font-medium mb-4 uppercase tracking-wide">
                          <Calendar size={14} className="mr-1.5" />
                          <span>Updated {formatDate(subject.date)}</span>
                        </div>

                        <div className="flex flex-row gap-3">
                          <button
                            onClick={() => {
                              setSelectedPdf(subject);
                              setIsFullScreen(true);
                            }}
                            className="flex-1 py-2.5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                          >
                            <FileText size={16} />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadPdf(subject.pdfLink, subject.name)}
                            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center justify-center hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-900/20"
                            aria-label="Download PDF"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : !loading && filteredSubjects.length === 0 ? (
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-[#0a0f1e] rounded-3xl border border-dashed border-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <FileText size={32} className="text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-300">No materials found</h3>
              <p className="text-slate-500 max-w-xs mt-2">
                We couldn t find any documents matching your current filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-6 text-indigo-400 hover:text-indigo-300 font-bold text-sm hover:underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </div>
  );
}