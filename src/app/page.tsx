'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  ShieldCheck, 
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
  Award,
  Clock,
  Check
} from 'lucide-react';

export default function RootHomePage() {
  // Login / Signup Modal State (DROPSHIPPER USER ONLY)
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('SIGNUP');
  
  // Onboarding Form State inside Signup
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [gstPanOptional, setGstPanOptional] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'SIGNUP') {
      setIsSubmitted(true);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Ambient Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* 1. ATTRACTIVE & SLEEK HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-xl shadow-indigo-500/30">
              360
            </div>
            <div>
              <span className="font-black text-2xl text-white tracking-tight">360 Dropship</span>
              <span className="ml-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                360dropship.in
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Factori Retailing Style) */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold text-slate-300">
            <a href="#how-it-works" className="hover:text-indigo-400 transition-all">How It Works</a>
            <a href="#features" className="hover:text-indigo-400 transition-all">Dropshipper Benefits</a>
            <a href="#catalog" className="hover:text-indigo-400 transition-all">5,000+ Catalog</a>
            <a href="#commission" className="hover:text-indigo-400 transition-all">5% Commission Model</a>
            <a href="#comparison" className="hover:text-indigo-400 transition-all">Why 360 Dropship</a>
          </nav>

          {/* Action Buttons (Dropshipper Login/Signup Only) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => { setAuthMode('LOGIN'); setIsSubmitted(false); setShowAuthModal(true); }}
              className="px-4 py-2.5 rounded-xl text-sm font-extrabold text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all flex items-center space-x-2"
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span>Merchant Login</span>
            </button>

            <button
              onClick={() => { setAuthMode('SIGNUP'); setIsSubmitted(false); setShowAuthModal(true); }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center space-x-2 hover:scale-105"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION (Retailing Factori Reference Style) */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-indigo-500/30 shadow-xl">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">
              India's Premier Managed B2B Dropshipping Platform (360dropship.in)
            </span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Scale Your E-Commerce Business With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              5,000+ Factory Wholesale Products.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Zero Monthly Software Fees. We provide 1-click stores, 5,000+ winning products, automated WhatsApp COD verification, Google Analytics & Meta Ads integration. We charge only <span className="font-extrabold text-emerald-400 underline">5% Commission on Delivered Orders</span>!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => { setAuthMode('SIGNUP'); setIsSubmitted(false); setShowAuthModal(true); }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base shadow-2xl shadow-indigo-600/40 flex items-center space-x-3 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Apply for Merchant Approval</span>
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

          {/* Stat Cards Matrix (Factori Style) */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-white">5,000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Wholesale Products</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">5%</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Commission on Delivered</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">₹0</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Monthly Subscription</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-pink-400">&lt; 5%</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">WhatsApp Verified RTO</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS / ONBOARDING STEPS SECTION (FACTORI RETAILING STYLE) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase border border-indigo-500/30">
            Simple 4-Step Onboarding
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">How 360 Dropship Works</h2>
          <p className="text-slate-400 text-sm">Follow these 4 simple steps to start dropshipping with manual account approval.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Fill Onboarding Form',
              desc: 'Submit your basic details, phone number, and business name in our registration form.',
              status: 'Step 1'
            },
            {
              step: '02',
              title: 'Admin Verification',
              desc: 'Our team verifies your onboarding details and approves your account ("ACCOUNT ACTIVE").',
              status: 'Approval Needed'
            },
            {
              step: '03',
              title: 'Access 5,000+ Catalog',
              desc: 'Once approved, unlock full access to 5,000+ winning products & set up your 1-Click Store.',
              status: 'Full Access'
            },
            {
              step: '04',
              title: 'We Ship, You Keep 95%',
              desc: 'We verify COD, ship orders to buyers, and charge only 5% commission on delivered orders.',
              status: 'Daily Payouts'
            }
          ].map((s, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4 hover:border-indigo-500/50 transition-all shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-4xl font-black text-indigo-500/40 font-mono">{s.step}</div>
                <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-black rounded-full uppercase">
                  {s.status}
                </span>
              </div>
              <h4 className="font-extrabold text-white text-lg">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DROPSHIPPER FEATURES & INTEGRATIONS */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold uppercase border border-pink-500/30">
            Full-Stack E-Commerce Infrastructure
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Built Specifically For High-Volume Dropshippers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">5,000+ Factory Wholesale Catalog</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct factory pricing on 5,000+ trending winning products across Electronics, Home, Kitchenware, & Lifestyle.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Google Analytics & Meta Ads Integrated</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track store traffic with built-in Google Analytics ID (`G-XXXXXXXX`) and launch high-ROAS Meta (Facebook/Instagram) ad campaigns directly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <Percent className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">5% Commission on Delivered Orders</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No upfront order fees, no monthly software charges. We charge a flat 5% commission only when an order is successfully delivered!
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">WhatsApp COD Verification (&lt;5% RTO)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated WhatsApp order confirmation sent to every buyer before dispatch, cutting return (RTO) rates to under 5%.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Google Gemini AI Landing Page Gen</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically creates high-converting HTML landing page descriptions using supplier photos at ₹0 extra image API cost.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white">1-Click Fast Stores & Custom Domains</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant subdomains (`mystore.360dropship.in`) + custom GoDaddy domain mapping with 12 conversion-tested templates.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE (SHOPDEV VS TRADITIONAL DROPSHIPPING) */}
      <section id="comparison" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase border border-emerald-500/30">
            Factori Retailing Benchmark
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Why Merchants Switch To 360 Dropship</h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-5">Platform Metric</th>
                <th className="p-5 text-slate-500">Traditional Platforms (Shopify)</th>
                <th className="p-5 text-indigo-400 font-extrabold bg-indigo-950/40">360 Dropship (360dropship.in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="p-5 font-bold text-white">Monthly Software Fees</td>
                <td className="p-5 text-red-400 font-medium">₹3,000+ / month</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">₹0 / Month (Zero Charges)</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Platform Commission</td>
                <td className="p-5 text-slate-400">Fixed monthly + app fees</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">Only 5% on Delivered Orders</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Wholesale Product Catalog</td>
                <td className="p-5 text-slate-400">China suppliers (15-20 days delivery)</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">5,000+ Indian Factory Products (3-day delivery)</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Account Security & Verification</td>
                <td className="p-5 text-slate-400">Instant bot signups</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">Manual Admin Verification & Approval</td>
              </tr>
              <tr>
                <td className="p-5 font-bold text-white">Analytics & Tracking</td>
                <td className="p-5 text-slate-400">Paid app plugins</td>
                <td className="p-5 text-emerald-400 font-bold bg-indigo-950/20">Built-in Google Analytics & Meta Ads Sync</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">360</div>
          <span className="font-bold text-slate-300 text-sm">360 Dropship B2B Platform (360dropship.in)</span>
        </div>
        <p>© 2026 360 Dropship Inc. All Rights Reserved. Factori Retailing Reference Architecture.</p>
      </footer>

      {/* DROPSHIPPER-ONLY LOGIN & ONBOARDING REGISTRATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold mx-auto">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">
                {authMode === 'LOGIN' ? '360 Dropshipper Portal Login' : 'Merchant Registration & Onboarding'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'LOGIN' ? 'Enter your merchant credentials to access dashboard.' : 'Fill onboarding details for manual account approval.'}
              </p>
            </div>

            {/* If Form Submitted -> Show Pending Approval Notice */}
            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 animate-spin" />
                </div>
                <h4 className="text-xl font-extrabold text-white">Application Submitted!</h4>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase border border-amber-500/30">
                  Status: PENDING FOR APPROVAL
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, <span className="font-bold text-white">{fullName}</span> ({businessName}). Our admin team is verifying your details. Your 5,000+ catalog access will be activated upon approval!
                </p>

                <button
                  onClick={() => { window.location.href = '/dashboard'; }}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Proceed to Merchant Dashboard Demo
                </button>
              </div>
            ) : (
              /* Auth Form */
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'SIGNUP' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:border-indigo-500 outline-none"
                          placeholder="Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase">Business Name *</label>
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={e => setBusinessName(e.target.value)}
                          className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:border-indigo-500 outline-none"
                          placeholder="Trendy Gadgets"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase">Phone / WhatsApp *</label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:border-indigo-500 outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase">City & State *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:border-indigo-500 outline-none"
                          placeholder="Mumbai, MH"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase">GST / PAN Number (Optional)</label>
                      <input
                        type="text"
                        value={gstPanOptional}
                        onChange={e => setGstPanOptional(e.target.value)}
                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:border-indigo-500 outline-none"
                        placeholder="27AAAAA0000A1Z5 (Optional)"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:border-indigo-500 outline-none"
                    placeholder="merchant@360dropship.in"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all"
                >
                  {authMode === 'LOGIN' ? 'Login to Dashboard' : 'Submit for Manual Approval'}
                </button>
              </form>
            )}

            <div className="text-center text-xs text-slate-400">
              {authMode === 'LOGIN' ? (
                <span>New merchant? <button onClick={() => { setAuthMode('SIGNUP'); setIsSubmitted(false); }} className="text-indigo-400 font-bold hover:underline">Apply for approval</button></span>
              ) : (
                <span>Already approved? <button onClick={() => { setAuthMode('LOGIN'); setIsSubmitted(false); }} className="text-indigo-400 font-bold hover:underline">Login here</button></span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
