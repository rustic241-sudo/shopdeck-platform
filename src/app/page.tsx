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
  Check,
  ChevronDown,
  Calculator,
  Grid,
  CreditCard
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Profit Calculator State
  const [dailyOrders, setDailyOrders] = useState(15);
  const [avgSellingPrice, setAvgSellingPrice] = useState(1499);
  const [avgCostPrice, setAvgCostPrice] = useState(499);

  // Calculations for Profit Calculator
  const totalRevenue = dailyOrders * avgSellingPrice * 30;
  const totalWholesaleCost = dailyOrders * avgCostPrice * 30;
  const totalPlatformCommission = totalRevenue * 0.05; // 5% commission on delivered
  const estimatedNetMonthlyProfit = totalRevenue - totalWholesaleCost - totalPlatformCommission;

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'SIGNUP') {
      setIsSubmitted(true);
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleGoogleLogin = () => {
    // Google Sign in simulation
    window.location.href = '/dashboard';
  };

  const faqs = [
    {
      q: "Is there any monthly software or subscription fee?",
      a: "No! 360 Dropship is 100% free to start. We do NOT charge any monthly software fees, Shopify app costs, or server maintenance fees. You pay zero platform fees until you make delivered sales."
    },
    {
      q: "How does the 5% commission model work?",
      a: "We charge a flat 5% commission ONLY on orders that are successfully delivered to the customer. If an order is canceled or returned (RTO), 0% commission is charged."
    },    {
      q: "How do I get paid for Cash on Delivery (COD) orders?",
      a: "Our logistics courier partners collect the cash upon delivery. The order amount (minus 5% platform commission and wholesale product cost) is directly remitted into your registered bank account on a daily payout cycle."
    },
    {
      q: "How long does manual account approval take?",
      a: "Our merchant verification team typically reviews and approves onboarding applications within 2 to 6 business hours. Once approved, your status becomes 'ACCOUNT ACTIVE' and you unlock all factory products."
    },
    {
      q: "Can I connect my own custom GoDaddy domain?",
      a: "Yes! Every merchant gets a free subdomain (`mystore.360dropship.in`) and can also map their own custom domain (`mystore.com` or `.in`) via GoDaddy CNAME DNS records."
    },
    {
      q: "How does automated WhatsApp verification reduce RTO?",
      a: "As soon as a buyer places a COD order on your storefront, our automated WhatsApp engine sends an instant confirmation message to their phone. Orders are dispatched only after positive buyer confirmation, reducing return rates under 5%."
    }
  ];

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

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold text-slate-300">
            <a href="#how-it-works" className="hover:text-indigo-400 transition-all">How It Works</a>
            <a href="#categories" className="hover:text-indigo-400 transition-all">Wholesale Categories</a>
            <a href="#calculator" className="hover:text-indigo-400 transition-all">Profit Calculator</a>
            <a href="#faqs" className="hover:text-indigo-400 transition-all">FAQs</a>
            <a href="#comparison" className="hover:text-indigo-400 transition-all">Why 360 Dropship</a>
          </nav>

          {/* Action Buttons */}
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

      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-indigo-500/30 shadow-xl">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">
              India's Premier Managed B2B Dropshipping Platform (360dropship.in)
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Scale Your E-Commerce Brand With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              All Factory Wholesale Products.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Zero Monthly Software Fees. We provide 1-click stores, all winning products, automated WhatsApp COD verification, Google Analytics & Meta Ads integration. We charge only <span className="font-extrabold text-emerald-400 underline">5% Commission on Delivered Orders</span>!
          </p>

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

          {/* Stat Cards Matrix */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-white">All</div>
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

      {/* POPULAR WHOLESALE CATEGORIES SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase border border-indigo-500/30">
            High Margin Categories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Popular Factory Wholesale Categories</h2>
          <p className="text-slate-400 text-sm">Source top-performing winning products directly from Indian factory suppliers.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Electronics & Smart Gadgets',
              count: '1,200+ Products',
              margin: '60% - 75% Margin',
              image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
            },
            {
              title: 'Home Decor & Living',
              count: '950+ Products',
              margin: '65% - 80% Margin',
              image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
            },
            {
              title: 'Kitchenware & Appliances',
              count: '800+ Products',
              margin: '55% - 70% Margin',
              image: 'https://images.unsplash.com/photo-1570288685369-f7305163d0e3?auto=format&fit=crop&w=800&q=80'
            },
            {
              title: 'Beauty & Personal Care',
              count: '700+ Products',
              margin: '70% - 85% Margin',
              image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
            },
            {
              title: 'Fitness & Healthcare',
              count: '650+ Products',
              margin: '60% - 75% Margin',
              image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
            },
            {
              title: 'Fashion & Wearable Tech',
              count: '750+ Products',
              margin: '65% - 80% Margin',
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
            }
          ].map((cat, idx) => (
            <div key={idx} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden group hover:border-indigo-500/50 transition-all shadow-xl">
              <div className="h-44 relative overflow-hidden bg-slate-950">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                  {cat.margin}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-extrabold text-white text-lg">{cat.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{cat.count} Available for 1-Click Import</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PROFIT CALCULATOR SECTION */}
      <section id="calculator" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase">
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>Estimate Your Earnings</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white">Calculate Your Monthly Net Profit</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                See how much you can earn every month with 360 Dropship. We charge only <span className="text-emerald-400 font-bold">5% commission on delivered orders</span> with zero monthly subscription fees!
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                    <span>Daily Orders Shipped</span>
                    <span className="text-indigo-400 font-mono">{dailyOrders} Orders / Day</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={dailyOrders}
                    onChange={e => setDailyOrders(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                    <span>Average Customer Retail Price</span>
                    <span className="text-indigo-400 font-mono">₹{avgSellingPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="699"
                    max="3999"
                    step="100"
                    value={avgSellingPrice}
                    onChange={e => setAvgSellingPrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                    <span>Factory Wholesale Cost</span>
                    <span className="text-indigo-400 font-mono">₹{avgCostPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="199"
                    max="1500"
                    step="50"
                    value={avgCostPrice}
                    onChange={e => setAvgCostPrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Profit Calculation Box */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-extrabold text-white border-b border-slate-800 pb-4">Estimated Monthly Revenue & Profit</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Monthly Sales (30 Days):</span>
                  <span className="font-bold text-white font-mono">₹{totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Wholesale Product Sourcing Cost:</span>
                  <span className="font-bold text-slate-300 font-mono">- ₹{totalWholesaleCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>360 Dropship 5% Delivered Commission:</span>
                  <span className="font-bold text-amber-400 font-mono">- ₹{totalPlatformCommission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Monthly Software Subscription Fee:</span>
                  <span className="font-extrabold text-emerald-400">₹0 FREE</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-center">
                <div className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Your Estimated Net Monthly Profit</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1 font-mono">
                  ₹{estimatedNetMonthlyProfit.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Credited directly to your Indian Bank Account</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
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
              title: 'Access All Catalog',
              desc: 'Once approved, unlock full access to all factory winning products & set up your 1-Click Store.',
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

      {/* FAQ SECTION */}
      <section id="faqs" className="max-w-5xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16">
          <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold uppercase border border-pink-500/30">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about 360 Dropship platform & policies.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-6 text-left font-extrabold text-white text-base sm:text-lg flex items-center justify-between hover:text-indigo-400 transition-all"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`} />
              </button>
              {openFaqIndex === idx && (
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
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

      {/* DROPSHIPPER-ONLY LOGIN & ONBOARDING REGISTRATION MODAL WITH GOOGLE LOGIN */}
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

            {/* GOOGLE SIGN IN BUTTON */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm flex items-center justify-center space-x-3 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="uppercase font-bold">OR USE EMAIL</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
            </div>

            {/* Form */}
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
                  Thank you, <span className="font-bold text-white">{fullName}</span> ({businessName}). Our admin team is verifying your details. Your catalog access will be activated upon approval!
                </p>

                <button
                  onClick={() => { window.location.href = '/dashboard'; }}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Proceed to Merchant Dashboard Demo
                </button>
              </div>
            ) : (
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
