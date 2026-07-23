'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  ShieldCheck, 
  Wallet, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Globe, 
  Star, 
  Lock, 
  Unlock, 
  ShoppingBag, 
  Smartphone,
  Eye,
  Bot,
  Truck,
  DollarSign,
  Package,
  UserCheck,
  Percent,
  RefreshCw,
  PhoneCall,
  MessageSquare,
  BarChart3,
  X,
  User,
  ArrowUpRight,
  HelpCircle,
  Award
} from 'lucide-react';

export default function RootHomePage() {
  const [activeTab, setActiveTab] = useState<'features' | 'catalog' | 'comparison' | 'pricing'>('features');
  
  // Login / Signup Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [userRole, setUserRole] = useState<'DROPSHIPPER' | 'SUPPLIER' | 'ADMIN'>('DROPSHIPPER');
  
  // Auth Form Fields
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'ADMIN') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
              360
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight">360 Dropship</span>
              <span className="ml-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                360dropship.in
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold text-slate-300">
            <a href="#features" className="hover:text-white transition-all">Dropshipper Features</a>
            <a href="#catalog" className="hover:text-white transition-all">Wholesale Catalog</a>
            <a href="#how-it-works" className="hover:text-white transition-all">How It Works</a>
            <a href="#comparison" className="hover:text-white transition-all">Why 360 Dropship</a>
            <a href="#pricing" className="hover:text-white transition-all">Pricing & Wallet</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }}
              className="px-4 py-2.5 rounded-xl text-sm font-extrabold text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all flex items-center space-x-2"
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span>Login</span>
            </button>

            <button
              onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
            >
              <span>Start Free Signup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Top Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-indigo-500/30 shadow-xl">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">
              India's #1 Complete 360° Managed Dropshipping OS (360dropship.in)
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Start Your E-Commerce Business With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Zero Inventory Investment.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Access 2,000+ factory wholesale winning products across India. We handle website creation, product sourcing, WhatsApp COD verification, managed Meta ads, and 3-day doorstep delivery.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base shadow-2xl shadow-indigo-600/40 flex items-center space-x-3 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Start Dropshipping Free</span>
            </button>

            <Link
              href="/store/trendygadgets"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-base transition-all flex items-center space-x-2 hover:scale-105"
            >
              <Eye className="w-5 h-5 text-indigo-400" />
              <span>Explore Live Store Demo</span>
            </Link>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-black text-white">2,000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Wholesale Products</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">28,000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">COD Pincodes Covered</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">&lt; 5%</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">WhatsApp Verified RTO</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-black text-pink-400">100%</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Daily Profit Payouts</div>
            </div>
          </div>
        </div>
      </section>

      {/* DROPSHIPPER FEATURES SECTION (WHAT DROPSHIPPERS GET) */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase border border-indigo-500/30">
            Complete 360° Business-In-A-Box
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">What You Get As A 360 Dropshipper</h2>
          <p className="text-slate-400 text-sm">Everything you need to launch and scale your D2C brand without inventory risk.</p>
        </div>

        {/* 6 Core Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">2,000+ Factory Wholesale Catalog</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct access to trending products at wholesale factory prices. Get 50 Free Starter products instantly upon signup + 2,000+ locked catalog unlocked on ₹1,500 wallet deposit.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold">
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">1-Click Fast Storefront & Domains</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Free 1-click store creation with 12 theme presets, brand color customization, GoDaddy custom domain mapping, and 1-Click Fast COD checkout.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">WhatsApp COD Verification & Low RTO</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated WhatsApp confirmation messages sent to every buyer. Orders ship only after customer confirmation, reducing RTO (returns) to under 5%.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Managed Meta (Facebook/Insta) Ads</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Run ads managed by expert agency accounts. Track daily ad spend with 20% platform charge & auto-pause protection when wallet balance reaches ₹0.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Google Gemini AI Landing Page Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uses readymade product supplier photos to generate high-converting e-commerce HTML landing pages with feature banners at ₹0 extra image API cost!
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
              <Wallet className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">18% GST Ledger & Daily Profit Settlements</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent GST tax invoices on all deposits (₹1,500 1st deposit + 18% GST = ₹1,770). Profit margins credited directly to your bank account daily.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (4 STEPS) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold uppercase border border-pink-500/30">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">How 360 Dropship Works</h2>
          <p className="text-slate-400 text-sm">Launch your store and start making sales in 4 easy steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Free Sign Up', desc: 'Create your free account & get instant access to 50 Starter Products.' },
            { step: '02', title: 'Recharge Wallet', desc: 'Deposit ₹1,500 + GST to activate wallet & unlock 2,000+ winning products.' },
            { step: '03', title: 'Customize & Launch', desc: 'Pick template, set custom price markup, and launch Meta Ads.' },
            { step: '04', title: 'We Ship & You Earn', desc: 'We verify COD, ship item to buyer, and deposit profits into your bank.' }
          ].map((s, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-3">
              <div className="text-4xl font-black text-indigo-500/40">{s.step}</div>
              <h4 className="font-extrabold text-white text-lg">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE SECTION */}
      <section id="comparison" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase border border-emerald-500/30">
            Why Dropshippers Choose Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Traditional Dropshipping vs 360 Dropship</h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-5">Feature</th>
                <th className="p-5 text-slate-500">Traditional Dropshipping (Shopify)</th>
                <th className="p-5 text-indigo-400 font-extrabold bg-indigo-950/40">360 Dropship Managed Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="p-5 font-bold text-white">Monthly Software Fees</td>
                <td className="p-5 text-red-400 font-medium">₹3,000+ / month (Shopify)</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">₹0 Monthly Subscription</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Inventory & Sourcing</td>
                <td className="p-5 text-slate-400">Slow 15-20 days shipping from China</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">2,000+ Factory Indian Wholesale Catalog</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">COD Order Returns (RTO)</td>
                <td className="p-5 text-red-400 font-medium">30% - 40% RTO Losses</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">&lt; 5% RTO (WhatsApp Verified)</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Product Landing Pages</td>
                <td className="p-5 text-slate-400">Manual copywriting (Hours of work)</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">1-Second Google Gemini AI Landing Pages</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Marketing & Meta Ads</td>
                <td className="p-5 text-slate-400">Ad accounts getting banned constantly</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">Managed Agency Ad Accounts + Auto-Pause</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING & WALLET ACTIVATION SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase border border-indigo-500/30">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Simple Monetization & Wallet Rules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Free Starter Plan */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold uppercase">Free Tier</span>
              <h3 className="text-3xl font-black text-white">₹0 <span className="text-sm font-normal text-slate-400">/ forever</span></h3>
              <p className="text-xs text-slate-400">Ideal for testing the platform & setting up your store.</p>

              <ul className="space-y-3 text-xs text-slate-300 font-semibold pt-4 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Access to 50 Free Starter Products</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Free Store Subdomain + Custom Domain Support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1-Click Fast Cash on Delivery Form</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Sign Up Free
            </button>
          </div>

          {/* Card 2: Pro Wallet Deposit Plan */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/80 to-slate-900 border border-indigo-500/50 space-y-6 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-black text-[10px] uppercase rounded-full shadow-lg">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase border border-indigo-500/30">
                Pro Wallet Deposit
              </span>
              <div>
                <h3 className="text-3xl font-black text-white">₹1,500 <span className="text-xs font-normal text-slate-400">+ 18% GST (₹270) = ₹1,770 Total</span></h3>
                <p className="text-xs text-slate-300 mt-1">100% of ₹1,500 credited to your wallet balance for spending!</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 font-semibold pt-4 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Unlocks Full 2,000+ Factory Wholesale Catalog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google Gemini AI Rich Landing Page Generator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Managed Meta Ads Campaign Tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Subsequent Recharges Min ₹1,000 + 18% GST</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              Activate Pro Account Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">360</div>
          <span className="font-bold text-slate-300 text-sm">360 Dropship Managed Platform (360dropship.in)</span>
        </div>
        <p>© 2026 360 Dropship Inc. All Rights Reserved. Factori-Style B2B E-Commerce Platform.</p>
      </footer>

      {/* AUTHENTICATION MODAL (LOGIN / SIGNUP) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold mx-auto">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">
                {authMode === 'LOGIN' ? 'Welcome Back to 360 Dropship' : 'Create Free 360 Dropshipper Account'}
              </h3>
              <p className="text-xs text-slate-400">Select your account type to proceed to dashboard.</p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setUserRole('DROPSHIPPER')}
                className={`py-2 rounded-xl transition-all ${userRole === 'DROPSHIPPER' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}
              >
                Dropshipper
              </button>
              <button
                type="button"
                onClick={() => setUserRole('SUPPLIER')}
                className={`py-2 rounded-xl transition-all ${userRole === 'SUPPLIER' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}
              >
                Supplier
              </button>
              <button
                type="button"
                onClick={() => setUserRole('ADMIN')}
                className={`py-2 rounded-xl transition-all ${userRole === 'ADMIN' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400'}`}
              >
                Super Admin
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Email / Mobile Number</label>
                <input
                  type="text"
                  required
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:border-indigo-500 outline-none"
                  placeholder="merchant@360dropship.in"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Password</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:border-indigo-500 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all"
              >
                {authMode === 'LOGIN' ? `Login as ${userRole}` : `Create ${userRole} Account`}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              {authMode === 'LOGIN' ? (
                <span>Don't have an account? <button onClick={() => setAuthMode('SIGNUP')} className="text-indigo-400 font-bold hover:underline">Sign up free</button></span>
              ) : (
                <span>Already have an account? <button onClick={() => setAuthMode('LOGIN')} className="text-indigo-400 font-bold hover:underline">Login here</button></span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
