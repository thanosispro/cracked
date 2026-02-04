'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(process.env.NEXT_PUBLIC_API_URL, 'this was it man')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adminAuth/`, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.status === 'success') {
      console.log(data.token)
      Cookies.set("admin_token", data.token, { expires: 1 });
      window.location.href = "/admin"; // expires 1 day
      // Reload to let SSR pick it up

    } else {
      setError('Invalid administrator password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Lock className="text-indigo-500" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Security Gate</h1>
          <p className="text-slate-400 text-sm mt-2">Authentication required for administrative access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}