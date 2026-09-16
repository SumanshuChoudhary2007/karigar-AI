import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mic, Wand2, Calculator, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Heart, Award } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 w-full selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-extrabold shadow-sm">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-gray-900 block leading-tight">
                Karigar <span className="text-amber-600">AI</span>
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 block font-bold">
                SIH 2026 • Problem Statement SIH26090
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-xs md:text-sm font-bold text-gray-700 hover:text-amber-600 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-xs md:text-sm shadow-sm active-press flex items-center space-x-1.5"
            >
              <span>Launch App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pt-12 md:pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-200 text-amber-900 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI-Driven Market Linkage for Marginalized Artisans</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Turn Your Craft Into a <span className="text-amber-600 underline decoration-amber-300">Digital Business</span>
          </h1>

          <p className="text-base md:text-xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empowering rural artisans with voice-driven multilingual cataloging, mathematical cost-plus pricing, and direct B2B market linkage.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-full text-lg shadow-md active-press flex items-center justify-center space-x-3"
            >
              <span>🚀 Open Artisan App</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/buyer')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-900 font-extrabold rounded-full text-lg shadow-sm active-press flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <span>💼 B2B Buyer Portal</span>
            </button>
          </div>

          {/* Impact Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-xs md:text-sm font-bold text-gray-500">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Zero Digital Literacy Required</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Punjabi, Hindi & English AI Speech</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Verified Wholesale B2B Buyers</span>
            </span>
          </div>
        </div>
      </section>

      {/* CORE 3 PILLARS SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900">
            Designed for Artisan Empowerment
          </h2>
          <p className="text-sm md:text-base font-medium text-gray-500">
            How Karigar AI bridges the gap between rural craftsmanship and wholesale markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Mic className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Voice-to-Catalog</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Artisans simply speak about their product in Punjabi, Hindi, or English. Whisper AI generates professional multilingual catalogs instantly.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Calculator className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fair Pricing Engine</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Calculates itemized production costs (Material, Labour, Packaging, Shipping) to recommend fair, mathematical market prices.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Direct B2B Linkage</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Matches artisans with verified bulk buyers and wholesale retailers based on capacity, budget, and geographic location.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-white py-16 px-4 md:px-8 border-y border-gray-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900">
              From Craft Photo to B2B Order
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Photo & Clean', desc: 'Upload product photo with AI studio background cleanup.' },
              { step: '2', title: 'Speak Details', desc: 'Speak in your native language or type manually.' },
              { step: '3', title: 'Calculate Price', desc: 'Input itemized costs for AI margin recommendation.' },
              { step: '4', title: 'Connect Buyer', desc: 'Get matched with verified B2B wholesale orders.' }
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center space-y-3">
                <span className="w-10 h-10 rounded-full bg-amber-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
                  {item.step}
                </span>
                <h3 className="font-extrabold text-gray-900 text-base">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-full text-lg shadow-md active-press inline-flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <span className="font-black text-2xl text-white block">
              Karigar <span className="text-amber-500">AI</span>
            </span>
            <p className="text-xs text-gray-400 mt-1">
              Smart India Hackathon 2026 • Problem Statement SIH26090
            </p>
          </div>

          <div className="flex space-x-6 text-xs font-bold">
            <button onClick={() => navigate('/login')} className="hover:text-white transition">Artisan Login</button>
            <button onClick={() => navigate('/buyer')} className="hover:text-white transition">Buyer Portal</button>
            <button onClick={() => navigate('/products')} className="hover:text-white transition">Catalog Gallery</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
