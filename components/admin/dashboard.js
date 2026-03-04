// app/admin/unverified/page.tsx
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Check, X, Eye, FileText, ExternalLink, RefreshCw, Trash2, Search, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import AdminNavigation from './AdminNavigation';
import DeleteModal from './DeleteModal';
const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#0a0f1e]">
      <Loader2 size={48} className="text-indigo-500 animate-spin" />
    </div>
  ),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UnverifiedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [viewMode, setViewMode] = useState('unverified'); // 'unverified' | 'verified'
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState(null); // stores id of item being processed
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, type: null });

  useEffect(() => {
    fetchSubjects();
  }, [viewMode, searchQuery]);

  // Add debounce for search if needed, but for now direct effect dependency is fine for small scale

  const verifyDocument = async (id, type) => {
    setActionLoading(id);
    try {
      const res = await fetch(`${API_URL}/api/verifySubject/?id=${id}&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('admin_token')}`,
        },
      });
      const result = await res.json();
      fetchSubjects();
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setActionLoading(null);
      if (type === 'delete') {
        setDeleteModal({ isOpen: false, id: null, type: null });
      }
    }
  }

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/unverifiedSubject/?status=${viewMode}`;
      if (viewMode === 'verified' && searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const res = await fetch(url);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-32 px-6">
      <AdminNavigation />

      {/* Header and Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {viewMode === 'unverified' ? 'Pending Approval' : 'Verified Documents'}
          </h1>
          <button onClick={fetchSubjects} className="btn-secondary flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#111111] p-4 rounded-xl border border-white/10">

          {/* View Mode Toggle */}
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => { setViewMode('unverified'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'unverified'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Unverified
            </button>
            <button
              onClick={() => setViewMode('verified')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'verified'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Verified
            </button>
          </div>

          {/* Search Bar (Only for Verified) */}
          {viewMode === 'verified' && (
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verified documents..."
                className="block w-full pl-10 pr-10 py-2 border border-white/10 rounded-lg leading-5 bg-black/20 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-400">Subject & Category</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-400">Description</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-400">Date Added</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-white/[0.01]">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.name}</div>
                      <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${viewMode === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* View PDF Button (Common) */}
                        <button
                          onClick={() => {
                            setSelectedPdf(item.pdfLink);
                            setIsFullScreen(true);
                          }}
                          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:bg-blue-600/20 hover:text-blue-400 transition-all border border-white/5"
                          title="View PDF"
                        >
                          <Eye size={18} />
                        </button>

                        {viewMode === 'unverified' ? (
                          <>
                            {/* Approve Button */}
                            <button
                              onClick={() => { verifyDocument(item.id, "approve") }}
                              disabled={actionLoading === item.id}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 disabled:opacity-50"
                              title="Approve"
                            >
                              {actionLoading === item.id ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                            </button>
                            {/* Reject Button */}
                            <button
                              onClick={() => { verifyDocument(item.id, "reject") }}
                              disabled={actionLoading === item.id}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20 disabled:opacity-50"
                              title="Reject"
                            >
                              {actionLoading === item.id ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Delete Button (Verified Mode) */}
                            <button
                              onClick={() => setDeleteModal({ isOpen: true, id: item.id, type: 'delete' })}
                              disabled={actionLoading === item.id}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20 disabled:opacity-50"
                              title="Delete Document"
                            >
                              {actionLoading === item.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    {loading ? 'Loading...' : 'No documents found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullScreen ? 'p-0' : 'p-4 sm:p-6'}`}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => {
            setSelectedPdf(null);
            setIsFullScreen(false);
          }} />

          {/* Modal Content */}
          <div className={`relative bg-[#181818] border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[85vh] rounded-2xl'}`}>
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText size={18} className="text-blue-400" />
                <span>Document Preview</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-1 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <a
                  href={`${API_URL}${selectedPdf}`}
                  target="_blank"
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  Open in new tab <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => {
                    setSelectedPdf(null);
                    setIsFullScreen(false);
                  }}
                  className="p-1 hover:bg-white/10 rounded-md"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white">
              <PdfViewer fileUrl={`${API_URL}${selectedPdf}`} />
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={() => verifyDocument(deleteModal.id, deleteModal.type)}
        title="Delete Document"
        message="Are you sure you want to delete this document from the verified list? This action cannot be undone."
        isDeleting={actionLoading === deleteModal.id}
      />
    </div>
  );
}