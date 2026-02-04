import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-[#020617] pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <img src="/logo.jpg" alt="12Crack Logo" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-xl font-bold text-white">12Crack</span>
                    </div>
                    <p className="text-slate-500 max-w-xs leading-relaxed">
                        Empowering students with cutting-edge tools and resources for academic excellence.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-3 text-slate-500">
                        <li className="hover:text-indigo-400 cursor-pointer"><a href="/">Home</a></li>
                        <li className="hover:text-indigo-400 cursor-pointer"><a href="/subjects">Subjects</a></li>
                        <li className="hover:text-indigo-400 cursor-pointer"><a href="/quiz">Quiz Zone</a></li>
                        <li className="hover:text-indigo-400 cursor-pointer"><a href="/science-links">Simulations</a></li>
                        <li className="hover:text-indigo-400 cursor-pointer"><a href="/about">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Resources</h4>
                    <ul className="space-y-3 text-slate-500">
                        <li className="hover:text-indigo-400 cursor-pointer">Study Notes</li>
                        <li className="hover:text-indigo-400 cursor-pointer">Question Bank</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm">
                <p>© 2024 12Crack. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Cookies</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
