"use client";
import React, { useState, useRef } from 'react';
import { Upload, FileJson, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNavigation from '@/components/admin/AdminNavigation';

export default function UploadQuestion() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' }); // 'success' | 'error'
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log(API_URL, 'this was it man')
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/json") {
            setFile(selectedFile);
            setStatus({ type: '', message: '' });
        } else {
            setStatus({ type: 'error', message: 'Please upload a valid .json file' });
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_URL}/api/addQuestions/`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: data.message || 'Questions uploaded successfully!' });
                setFile(null); // Reset after success
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to upload questions.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please check your backend connection.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 bg-[#0a0a0a] text-white p-6 font-sans">
            <div className="max-w-xl mx-auto w-full">
                <AdminNavigation />

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Question Lab
                    </h1>
                    <p className="text-gray-400">Bulk upload your MCQ sets via JSON</p>
                </div>

                {/* Main Card */}
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">

                    {/* Dropzone Area */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className={`group relative border-2 border-dashed rounded-xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center
              ${file ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'}`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".json"
                        />

                        {file ? (
                            <FileJson className="w-12 h-12 text-blue-500 mb-4" />
                        ) : (
                            <Upload className="w-12 h-12 text-gray-500 group-hover:text-gray-300 mb-4 transition-colors" />
                        )}

                        <p className="text-sm font-medium">
                            {file ? file.name : "Click to browse or drag & drop"}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Only .json files are supported</p>

                        {file && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
              ${!file || loading
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-gray-200 active:scale-[0.98]'}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Upload Questions"
                        )}
                    </button>

                    {/* Status Messages */}
                    <AnimatePresence mode="wait">
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`mt-6 p-4 rounded-lg flex items-start gap-3 border ${status.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                                    }`}
                            >
                                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                <p className="text-sm">{status.message}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer info */}
                <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.2em]">
                    Internal Administrator Access Only
                </p>
            </div>
        </div>
    );
}
