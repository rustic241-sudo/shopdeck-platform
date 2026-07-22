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
  Flame, 
  Globe, 
  Star, 
  Lock, 
  Unlock, 
  ShoppingBag, 
  Smartphone,
  ChevronRight,
  Eye,
  Bot,
  Truck,
  DollarSign
} from 'lucide-react';

export default function RootHomePage() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'catalog' | 'ads' | 'ai'>('storefront');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-600/20 via-pink-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -right-32 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-indigo-500/30">
              S
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight">Shopdeck</span>
              <span className="ml-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Managed D2C OS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="hidden sm:flex px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all"
            >
              Super Admin Panel
            </Link>

            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
            >
              <span>Merchant Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-indigo-500/30 shadow-xl">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider">
              Shopify-Independent Full-Stack Dropshipping Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Build Your 7-Figure E-Commerce Brand <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Without Shopify Subscriptions.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Custom Multi-Tenant Stores, 2,000+ Wholesale Winning Catalog, 1-Click Fast COD Checkout, Automated WhatsApp Verification, and AI-Powered Rich Landing Pages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base shadow-2xl shadow-indigo-600/40 flex items-center space-x-3 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Launch Dropshipper Dashboard</span>
            </Link>

            <Link
              href="/store/trendygadgets"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-base transition-all flex items-center space-x-2 hover:scale-105"
            >
              <Eye className="w-5 h-5 text-indigo-400" />
              <span>Test Live Storefront Demo</span>
            </Link>
          </div>

          {/* Key Trust Stats Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/80 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-white">2,000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Winning Products</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">1-Click</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Fast COD Checkout</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">₹0</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Shopify Fees</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-pink-400">Google AI</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Rich Description Gen</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURE SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Everything You Need To Scale</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">A full-stack ecosystem built specifically for high-converting Indian dropshippers.</p>
        </div>

        {/* Feature Tab Switcher */}
        <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'storefront', label: '1-Click Storefronts', icon: Store },
            { id: 'catalog', label: '50 Starter vs 2,000+ Catalog', icon: Layers },
            { id: 'ads', label: 'Meta Ads & 20% Fee Markup', icon: TrendingUp },
            { id: 'ai', label: 'Google Gemini AI Engine', icon: Bot }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center space-x-2 transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 scale-105' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
          {activeTab === 'storefront' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase border border-indigo-500/30">
                  Custom Domain & Multi-Tenant Routing
                </span>
                <h3 className="text-3xl font-extrabold text-white">Ultra-Fast Stores with Custom Domain Support</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every merchant receives an instant subdomain (`store.shopdeck.in`) and can map their own custom domain (`mystore.com` via GoDaddy) with free automated SSL certificates.
                </p>
                <ul className="space-y-3 text-sm text-slate-300 font-medium">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>12 Conversion-Optimized Theme Presets</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>1-Click Fast Cash on Delivery Form with Auto-Pincode lookup</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>100% Server-Side Meta Pixel Tracking (Conversion API)</span>
                  </li>
                </ul>

                <Link
                  href="/store/trendygadgets"
                  target="_blank"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
                >
                  <span>Open Live Store Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">trendygadgets.shopdeck.in</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl space-y-3">
                  <div className="h-40 rounded-xl bg-gradient-to-r from-indigo-900 to-slate-900 p-4 text-white flex flex-col justify-end">
                    <span className="text-xs font-bold text-amber-300">🔥 TRENDING DEALS</span>
                    <h4 className="text-lg font-bold">Flame Aura Ultrasonic Diffuser</h4>
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg">
                    BUY NOW - 1-CLICK COD (₹1,499)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase border border-amber-500/30">
                  Gated Monetization Model
                </span>
                <h3 className="text-3xl font-extrabold text-white">50 Starter Products vs 2,000+ Full Catalog</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Free signups immediately get access to 50 curated starter winning products. Recharging the wallet (Min ₹1,500 + 18% GST) activates `wallet_activated = true` and unlocks 2,000+ winning products.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-emerald-400 font-extrabold text-lg">50 Free Products</div>
                    <div className="text-xs text-slate-400 mt-1">Unlocked immediately on signup</div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30">
                    <div className="text-amber-400 font-extrabold text-lg">2,000+ Premium</div>
                    <div className="text-xs text-slate-400 mt-1">Unlocked on ₹1500 wallet deposit</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                      <Unlock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Wireless Flame Diffuser</h4>
                      <p className="text-xs text-slate-400">Category: Home & Living • Cost: ₹499</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Starter Free</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-between opacity-80">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Smart AMOLED Watch Pro</h4>
                      <p className="text-xs text-slate-400">Category: Electronics • Cost: ₹999</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">Recharge to Unlock</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold uppercase border border-pink-500/30">
                  Programmatic Meta Ads Tracking
                </span>
                <h3 className="text-3xl font-extrabold text-white">Agency Meta Sync & 20% Fee Margin</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Ads run manually via master agency accounts. The platform automatically tracks campaigns via naming convention, adds a 20% platform management fee, and auto-pauses campaigns if wallet balance hits ₹0.
                </p>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-2">
                  <div className="text-slate-400">Actual Meta Spend: ₹100.00</div>
                  <div className="text-indigo-400">+ 20% Platform Charge: ₹20.00</div>
                  <div className="text-emerald-400 font-bold border-t border-slate-800 pt-1">Total Deducted Wallet Spend: ₹120.00</div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-mono text-xs text-indigo-400 font-bold">Shopdeck_ID_101_FlameDiffuser</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black rounded-full">ACTIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Deducted Spend</div>
                    <div className="font-black text-white text-base">₹5,040.00</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">ROAS</div>
                    <div className="font-black text-indigo-400 text-base">3.45x</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase border border-purple-500/30">
                  Google Gemini AI Vision
                </span>
                <h3 className="text-3xl font-extrabold text-white">Readymade Image Rich Landing Page Generator</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Uses existing supplier product photos to generate high-converting e-commerce HTML landing pages with feature banners & FAQs at **₹0 extra image API cost**!
                </p>
                <div className="flex items-center space-x-3 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Instant 1-Second Rich Description Generation</span>
                </div>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="p-3 bg-indigo-900/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 font-semibold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AI Generated Rich HTML Preview</span>
                </div>
                <div className="p-4 bg-white rounded-xl text-slate-900 text-xs space-y-2">
                  <div className="font-bold text-sm text-indigo-900">🔥 Flame Aura Ultrasonic Mist Diffuser</div>
                  <p className="text-slate-600">Experience soothing ambient warmth with ultrasonic aromatherapy mist.</p>
                  <div className="p-2 bg-slate-100 rounded border border-slate-200 text-[10px] font-mono text-slate-500">[Embedded Readymade Feature Image Banner]</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PORTAL ACCESS LAUNCHPAD */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Access Platform Dashboards</h2>
          <p className="text-slate-400 text-sm">Select the portal you want to test and explore.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dropshipper Dashboard */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                <Store className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Dropshipper Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Free signup, 50 Starter Products, Wallet Recharge (₹1500+GST) to unlock 2000+ catalog, Meta Ads tracker (20% fee), & Google Gemini AI Landing Page Generator.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm text-center block transition-all shadow-lg shadow-indigo-600/30"
            >
              Open Merchant Dashboard
            </Link>
          </div>

          {/* Super Admin Control Panel */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Super Admin Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage 2000+ Master Wholesale products, set cost prices vs retail prices, approve merchant wallet deposits, and monitor platform profit margins.
              </p>
            </div>
            <Link
              href="/admin"
              className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm text-center block transition-all shadow-lg shadow-purple-600/30"
            >
              Open Admin Control Panel
            </Link>
          </div>

          {/* Live Storefront Demo */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-pink-500 transition-all flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">1-Click Fast Storefront</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-speed custom storefront with 12 theme presets, brand color pickers, custom domain support, and 1-Click Cash on Delivery checkout.
              </p>
            </div>
            <Link
              href="/store/trendygadgets"
              target="_blank"
              className="w-full py-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-sm text-center block transition-all shadow-lg shadow-pink-600/30"
            >
              Test Live Store Demo
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">S</div>
          <span className="font-bold text-slate-300 text-sm">Shopdeck Multi-Tenant E-Commerce OS</span>
        </div>
        <p>© 2026 Shopdeck Platform Inc. Built with Next.js, TypeScript, Tailwind CSS & Supabase PostgreSQL.</p>
      </footer>
    </div>
  );
}
