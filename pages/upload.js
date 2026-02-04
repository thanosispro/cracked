'use client'
import React, { useState, useEffect } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X, Loader, Shield, Info } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mathematics',
    description: '',
    pdfLink: null
  });
  // change title of document to "Upload | Crackfor"
  useEffect(() => {
    document.title = "Upload | Crackfor";
  }, []);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const categories = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'computer', label: 'Computer' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subject name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Subject name must be at least 3 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    if (!formData.pdfLink) {
      newErrors.pdfLink = 'Please upload a PDF file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.type !== 'application/pdf') {
        // ... (Error handling omitted for brevity, logic remains same)
        setErrors(prev => ({ ...prev, pdfLink: 'Only PDF files are allowed' }));
        return;
      }
      // ... (Size check logic)
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, pdfLink: 'File size must be less than 100MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, pdfLink: file }));
      setFileName(file.name);
      if (errors.pdfLink) setErrors(prev => ({ ...prev, pdfLink: '' }));
    }
  };

  // ... (Drag and drop handlers remain same)
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      // ... logic
      const input = document.createElement('input');
      input.type = 'file';
      input.files = files;
      handleFileChange({ target: input });
    }
  };


  const removeFile = () => {
    setFormData(prev => ({ ...prev, pdfLink: null }));
    setFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('pdfLink', formData.pdfLink);

      const response = await fetch(`${API_BASE_URL}/api/addSubject/`, {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (result.status === 'success') {
        setSuccess(true);
        setSuccessMessage(result.message || 'File uploaded successfully!');
        setFormData({ name: '', category: 'mathematics', description: '', pdfLink: null });
        setFileName('');
        setErrors({});
        setTimeout(() => { setSuccess(false); }, 5000);
      } else {
        setErrors({ submit: result.message || 'Failed to upload file. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-white tracking-tight">
              Share <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Knowledge</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Contribute to the largest student-led resource library.
            </p>
          </div>
        </ScrollReveal>

        {success && (
          <ScrollReveal>
            <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-emerald-400 mb-1">Success!</h4>
                <p className="text-slate-300 text-sm">{successMessage}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {errors.submit && (
          <ScrollReveal>
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-rose-400 mb-1">Upload Error</h4>
                <p className="text-slate-300 text-sm">{errors.submit}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.1}>
          <div className="bg-[#0a0f1e] p-8 rounded-2xl border border-white/5 shadow-2xl shadow-indigo-500/10">
            <div className="space-y-6">

              {/* Note Box */}
              <div className="flex gap-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <Shield className="text-indigo-400 shrink-0" size={20} />
                <div>
                  <h4 className="text-indigo-400 font-bold text-sm mb-1">Content Guidelines</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Ensure your PDF is clear, readable, and original. All uploads are manually verified by our moderation team (24h turnaround).</p>
                </div>
              </div>

              {/* Subject Name */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Subject Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Advanced Calculus Notes"
                  className={`w-full px-4 py-3 bg-[#020617] border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-300 text-slate-300 placeholder-slate-600 ${errors.name ? 'border-rose-500/50' : 'border-white/10'
                    }`}
                />
                {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#020617] border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-300 text-slate-300 appearance-none cursor-pointer ${errors.category ? 'border-rose-500/50' : 'border-white/10'
                      }`}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Description <span className="text-slate-600 font-normal">({formData.description.length}/500)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide context about the material (e.g. Chapter 1-5 summary)..."
                  rows="4"
                  className={`w-full px-4 py-3 bg-[#020617] border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-300 text-slate-300 placeholder-slate-600 resize-none ${errors.description ? 'border-rose-500/50' : 'border-white/10'
                    }`}
                />
                {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Upload PDF File</label>
                {!formData.pdfLink ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${errors.pdfLink
                      ? 'border-rose-500/30 bg-rose-500/5'
                      : 'border-white/10 hover:border-indigo-500/50 hover:bg-[#111827]'
                      }`}
                  >
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-input" />
                    <label htmlFor="pdf-input" className="cursor-pointer block">
                      <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
                        <Upload size={24} />
                      </div>
                      <p className="text-slate-300 font-bold mb-1">Click to upload or drag & drop</p>
                      <p className="text-slate-500 text-xs">PDF only • Max 10MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                        <FileText size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-emerald-400 text-sm truncate">{fileName}</p>
                        <p className="text-xs text-emerald-600/70">Ready to upload</p>
                      </div>
                    </div>
                    <button onClick={removeFile} className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors text-emerald-400 hover:text-white">
                      <X size={18} />
                    </button>
                  </div>
                )}
                {errors.pdfLink && <p className="text-rose-400 text-xs mt-1">{errors.pdfLink}</p>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Submit Resource
                  </>
                )}
              </button>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}