import React from 'react';
import { useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock, MessageSquare } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
// change title of document to "Contact | Crackfor"
export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact | Crackfor";
  }, []);
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Support',
      value: 'support@12crack.com',
      sub: 'We respond within 24 hours',
      link: 'mailto:support@12crack.com',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10'
    },
    {
      icon: MapPin,
      label: 'Office Location',
      value: 'Kathmandu, Bhaktapur',
      sub: 'Owner: Parlee Khadka',
      link: '#',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', link: 'https://facebook.com/12crack' },
    { icon: Instagram, label: 'Instagram', link: 'https://instagram.com/12crack' },
    { icon: Twitter, label: 'Twitter', link: 'https://twitter.com/12crack' },
    { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/company/12crack' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <img src="/logo.jpg" alt="12Crack Logo" className="w-20 h-20 rounded-2xl shadow-2xl shadow-indigo-500/20 animate-pulse-slow" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <MessageSquare size={14} className="text-indigo-400" />
              <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">We're here to help</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
              Get in touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Our Team</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Have questions about our courses, pricing, or technical support? We re just a message away.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <a
                  href={method.link}
                  className="block h-full bg-[#0a0f1e] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-[#111827] transition-all duration-300 text-center group"
                >
                  <div className={`w-14 h-14 ${method.bg} ${method.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{method.label}</h3>
                  <p className="text-slate-300 font-medium">{method.value}</p>
                  <p className="text-slate-500 text-sm mt-2">{method.sub}</p>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Socials - Centered */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/20 to-violet-900/20 p-10 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-2">Connect Socially</h3>
          <p className="text-slate-400 mb-8 text-sm">Follow us for updates, study tips, and success stories.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0a0f1e] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <Icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-medium text-slate-500 group-hover:text-slate-300">{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}