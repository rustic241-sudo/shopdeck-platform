import Link from 'next/link';
import { Store, ShieldCheck, Wallet, Sparkles, TrendingUp, Layers, CheckCircle2, ArrowRight, Zap, Flame } from 'lucide-react';

export default function RootHomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-600/20 via-pink-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-indigo-500/30">
              S
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">Shopdeck OS</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all"
            >
              Dropshipper Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 space-y-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Full-Stack Managed Dropshipping SaaS Platform
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Launch Your E-Commerce Brand In 5 Minutes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300">
              We Handle The Heavy Lifting.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Custom Storefronts, 2000+ Wholesale Catalog, Automated WhatsApp COD Verification, 1-Click Fast Checkout, and Programmatic Meta Ads Management.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-2xl shadow-indigo-600/40 flex items-center space-x-3 transition-all hover:scale-105"
            >
              <span>Launch Dropshipper Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/admin"
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-extrabold text-base transition-all hover:scale-105"
            >
              <span>Super Admin Panel</span>
            </Link>

            <Link
              href="/store/trendygadgets"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-400 font-extrabold text-base transition-all flex items-center space-x-2"
            >
              <span>View Storefront Demo</span>
            </Link>
          </div>
        </div>

        {/* Portal Switcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Dropshipper Panel */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Dropshipper Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Free signup, 50 Starter Products, Wallet Recharge (₹1500+GST) to unlock 2000+ products, Meta Ads tracker (20% fee), & Google Gemini AI Landing Page Generator.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center block transition-all"
            >
              Open Merchant Dashboard
            </Link>
          </div>

          {/* Card 2: Super Admin Panel */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Super Admin Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage 2000+ Master Wholesale products, set cost prices vs retail prices, approve merchant wallet deposits, and monitor platform profit margins.
              </p>
            </div>
            <Link
              href="/admin"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center block transition-all"
            >
              Open Admin Control Panel
            </Link>
          </div>

          {/* Card 3: Dynamic Storefront */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">1-Click Fast Storefront</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-speed custom storefront with 12 theme presets, brand color pickers, custom domain support, and 1-Click Cash on Delivery checkout.
              </p>
            </div>
            <Link
              href="/store/trendygadgets"
              target="_blank"
              className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs text-center block transition-all"
            >
              Test Live Store Demo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
