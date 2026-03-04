'use client';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
    ZoomIn,
    ZoomOut,
    Download,
    X,
    Maximize2,
    Minimize2,
    RotateCw,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// Set up the worker automatically from a CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function PdfViewer({ fileUrl, fileName, onDownload, onClose, onMinimize, isFullScreen: initialFullScreen = true }) {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.0);
    const [isFullScreen, setIsFullScreen] = useState(initialFullScreen);
    const [rotate, setRotate] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const handleRotate = () => setRotate(prev => (prev + 90) % 360);

    return (
        <div className={`flex flex-col h-full bg-[#0a0f1e] overflow-hidden ${isFullScreen ? 'fixed inset-0 z-[60]' : 'relative rounded-xl border border-white/10 shadow-2xl'}`}>
            {/* Custom Toolbar */}
            <div className="flex items-center justify-between p-3 bg-[#0f172a] border-b border-white/10 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-rose-400"
                            title="Go Back / Close"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}
                    <div className="hidden sm:block">
                        <h3 className="text-sm font-bold text-slate-200 truncate max-w-[200px]">{fileName || "PDF Viewer"}</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Document Preview</p>
                    </div>
                </div>

                {/* Center Controls: Zoom & Rotate */}
                <div className="flex items-center gap-2 sm:gap-4 bg-black/20 p-1 rounded-xl border border-white/5">

                    <div className="flex items-center gap-1">
                        <button onClick={handleZoomOut} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                            <ZoomOut size={18} />
                        </button>
                        <span className="text-xs font-mono text-slate-300 w-12 text-center">
                            {Math.round(scale * 100)}%
                        </span>
                        <button onClick={handleZoomIn} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                            <ZoomIn size={18} />
                        </button>
                    </div>

                    <button onClick={handleRotate} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all hidden sm:block" title="Rotate">
                        <RotateCw size={18} />
                    </button>
                </div>

                {/* Right Area: Actions */}
                <div className="flex items-center gap-2">
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            className="p-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all border border-indigo-500/20"
                            title="Download PDF"
                        >
                            <Download size={18} />
                        </button>
                    )}

                    <button
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                        title={isFullScreen ? "Minimize" : "Maximize"}
                    >
                        {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all border border-rose-500/20 inline-flex"
                            title="Close"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-[#020617] scrollbar-hide flex justify-center p-4">
                <div className="pdf-container shadow-2xl origin-top transition-transform duration-200">
                    <Document
                        file={fileUrl.endsWith('/') ? fileUrl : fileUrl + '/'}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex flex-col items-center justify-center h-[60vh] text-indigo-400 gap-4">
                                <RotateCw className="animate-spin" size={48} />
                                <p className="font-bold text-sm uppercase tracking-widest animate-pulse">Initializing Document...</p>
                            </div>
                        }
                        error={
                            <div className="flex flex-col items-center justify-center h-[60vh] text-rose-400 gap-4">
                                <X size={48} />
                                <p className="font-bold text-sm uppercase tracking-widest">Failed to load PDF</p>
                            </div>
                        }
                    >
                        {Array.from(new Array(numPages || 0), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                scale={scale}
                                rotate={rotate}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                className="shadow-2xl border border-white/5 mb-4"
                            />
                        ))}
                    </Document>
                </div>
            </div>

            {/* Bottom Info Bar (Optional) */}
            <div className="px-4 py-2 bg-[#0f172a] border-t border-white/10 flex justify-between items-center">
                <div className="text-[10px] text-slate-500 font-medium">
                    {numPages} Pages Detected
                </div>
                <div className="flex gap-4">
                    <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Secure Viewer
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .pdf-container .react-pdf__Page {
                    margin-bottom: 2rem !important;
                }
                .pdf-container canvas {
                    max-width: 100%;
                    height: auto !important;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}