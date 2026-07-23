'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  mockProfile, 
  mockStore, 
  mockMasterCatalog, 
  mockMerchantProducts, 
  mockMetaCampaigns, 
  mockCommissionLedger, 
  mockOrders 
} from '@/lib/mockData';
import { generateRichLandingPageHTML } from '@/lib/ai/gemini';
import { 
  Store, 
  Wallet, 
  ShoppingBag, 
  TrendingUp, 
  Sparkles, 
  Lock, 
  Unlock, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Copy, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  Smartphone,
  Eye,
  RefreshCw,
  ExternalLink,
  Zap,
  Tag,
  Palette,
  Key,
  BarChart3,
  Percent,
  Clock,
  UserCheck,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function DropshipperDashboard() {
  // Local state
  const [profile, setProfile] = useState(mockProfile);
  const [store, setStore] = useState(mockStore);
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'customization' | 'ads' | 'analytics' | 'commission' | 'settings'>('overview');

  // Mobile sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // AI Generator state
  const [selectedProductForAi, setSelectedProductForAi] = useState(mockMasterCatalog[0]);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  // Alert Toast
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Toggle approval status for demonstration
  const toggleApprovalStatus = () => {
    const nextStatus = profile.approvalStatus === 'APPROVED' ? 'PENDING' : 'APPROVED';
    setProfile(prev => ({ ...prev, approvalStatus: nextStatus }));
    showAlert(`Account Approval Status updated to: ${nextStatus}!`);
  };

  // Handle Product Import to Merchant Store
  const handleImportProduct = (product: typeof mockMasterCatalog[0]) => {
    showAlert(`"${product.title}" imported to your storefront! Custom retail price set to ₹${product.defaultPrice}.`);
  };

  // Handle Gemini AI Landing Page Generation
  const handleGenerateAiLandingPage = async () => {
    setAiGenerating(true);
    const result = await generateRichLandingPageHTML(
      selectedProductForAi.title,
      selectedProductForAi.category,
      selectedProductForAi.images
    );
    setGeneratedHtml(result.descriptionHtml);
    setAiGenerating(false);
    showAlert('AI Rich Landing Page with readymade image banners generated! 🚀');
  };

  const isApproved = profile.approvalStatus === 'APPROVED';

  // Navigation Menu Items
  const menuItems = [
    { id: 'overview', label: 'Overview & Orders', icon: ShoppingBag, badge: 'Live' },
    { id: 'catalog', label: '5,000+ Product Catalog', icon: Layers, badge: '5,000+' },
    { id: 'customization', label: 'Store Theme & Styling', icon: Palette },
    { id: 'ads', label: 'Meta Ads Manager', icon: TrendingUp },
    { id: 'analytics', label: 'Google Analytics & AI', icon: BarChart3 },
    { id: 'commission', label: '5% Commission Ledger', icon: Percent, badge: '5%' },
    { id: 'settings', label: 'Store & Domain Settings', icon: Key }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-2xl border border-indigo-400 flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-sm">360</div>
          <span className="font-extrabold text-sm text-white">360 Dropship</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-300 hover:text-white">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 1. VERTICAL SIDEBAR MENU (LEFT COLUMN) */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800/80 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
              360
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white tracking-tight">360 Dropship</h1>
              <p className="text-[11px] text-indigo-400 font-bold">Merchant OS Panel</p>
            </div>
          </div>

          {/* Account Status Card */}
          <div 
            onClick={toggleApprovalStatus}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
              isApproved 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isApproved ? <UserCheck className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-amber-400 animate-spin" />}
                <span className="text-[10px] uppercase font-bold tracking-wider">Account Status</span>
              </div>
              <span className="text-[9px] font-black underline">Click to Toggle</span>
            </div>
            <div className="font-extrabold text-xs text-white mt-1">
              {isApproved ? 'APPROVED (ACTIVE) ✅' : 'PENDING APPROVAL ⏳'}
            </div>
          </div>

          {/* Vertical Menu Navigation */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider px-3 mb-2">Navigation Menu</div>
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-[1.02]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <a
            href={`/store/${store.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs border border-indigo-500/30 flex items-center justify-center space-x-2 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Storefront</span>
          </a>

          <Link
            href="/"
            className="w-full py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 flex items-center justify-center space-x-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Portal</span>
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (RIGHT COLUMN) */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl overflow-x-hidden">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Merchant Control Dashboard</h2>
            <p className="text-xs text-slate-400 mt-1">{store.name} • domain: <span className="text-indigo-400 font-mono">{store.subdomain}.360dropship.in</span></p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>5% Delivered Commission Model</span>
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Store Sales</span>
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">₹3,498.00</div>
            <div className="text-xs text-emerald-400 mt-2 font-medium">↑ 2 Orders (1 Delivered)</div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>5% Delivered Commission</span>
              <Percent className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">₹74.95</div>
            <div className="text-xs text-slate-400 mt-2">Deducted ONLY on delivered COD</div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Merchant Net Payout</span>
              <DollarSign className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">₹925.05</div>
            <div className="text-xs text-emerald-400 mt-2 font-medium">Credited to Bank Daily</div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Catalog Unlocked</span>
              {isApproved ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400" />}
            </div>
            <div className="text-2xl font-black text-white">
              {isApproved ? '5,000+ Products' : 'Pending Approval'}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-medium">
              {isApproved ? 'Full Factory Access' : 'Waiting for Admin Approval'}
            </div>
          </div>
        </div>

        {/* ACTIVE TAB CONTENT DISPLAY */}

        {/* TAB 1: OVERVIEW & ORDERS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Recent Customer Orders</h3>
                  <p className="text-xs text-slate-400">All orders are WhatsApp verified. 5% commission is deducted only upon successful delivery.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                  WhatsApp Verification Active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Total Sale</th>
                      <th className="p-4">Wholesale Cost</th>
                      <th className="p-4">5% Commission</th>
                      <th className="p-4">Net Merchant Profit</th>
                      <th className="p-4 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {mockOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-indigo-400">{ord.orderNumber}</td>
                        <td className="p-4">
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <div className="text-xs text-slate-400">{ord.customerPhone} • {ord.city}</div>
                        </td>
                        <td className="p-4 font-medium">{ord.productTitle}</td>
                        <td className="p-4 font-bold text-white">₹{ord.totalPrice}</td>
                        <td className="p-4 text-slate-400">₹{ord.wholesaleCost}</td>
                        <td className="p-4 text-emerald-400 font-bold">
                          {ord.status === 'DELIVERED' ? `₹${ord.platformCommission}` : '₹0.00 (Pending Delivery)'}
                        </td>
                        <td className="p-4 font-black text-indigo-300">
                          {ord.status === 'DELIVERED' ? `₹${ord.merchantNetProfit}` : 'Pending'}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            ord.status === 'DELIVERED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 5,000+ PRODUCT CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            {!isApproved && (
              <div className="p-6 rounded-3xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-amber-400 animate-spin" />
                  <div>
                    <h4 className="font-extrabold text-white text-base">Account Approval Pending</h4>
                    <p className="text-xs text-slate-300">Your account is waiting for manual admin approval. Once approved, all 5,000+ products will be unlocked for 1-click import.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockMasterCatalog.map(item => (
                <div key={item.id} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative transition-all hover:border-indigo-500/50 shadow-xl">
                  <div className="h-48 relative overflow-hidden bg-slate-950">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                      5,000+ Factory Catalog
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{item.category}</div>
                    <h4 className="font-extrabold text-white text-base mt-1 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Wholesale Price</div>
                        <div className="font-black text-emerald-400 text-base">₹{item.costPrice}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Recommended Sale</div>
                        <div className="font-bold text-white text-base">₹{item.defaultPrice}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleImportProduct(item)}
                      className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Import to My Storefront</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STORE THEME & STYLING */}
        {activeTab === 'customization' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-extrabold text-white mb-2">Store Theme Preset (Choose 1 of 12 Templates)</h3>
              <p className="text-xs text-slate-400 mb-6">Select a pre-built conversion-optimized layout for your storefront.</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(id => (
                  <div
                    key={id}
                    onClick={() => {
                      setStore(prev => ({ ...prev, templateId: id }));
                      showAlert(`Store Template #${id} selected & applied!`);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      store.templateId === id 
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-xl ring-2 ring-indigo-500' 
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="h-24 rounded-xl bg-slate-900 mb-3 flex items-center justify-center font-black text-2xl text-slate-700">
                      T-{id}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">Template #{id}</span>
                      {store.templateId === id && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: META ADS MANAGER */}
        {activeTab === 'ads' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Meta (Facebook/Instagram) Campaign Performance</h3>
                  <p className="text-xs text-slate-400">Launch & track ad campaigns directly from your dashboard.</p>
                </div>
              </div>

              <div className="space-y-4">
                {mockMetaCampaigns.map(camp => (
                  <div key={camp.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {camp.status}
                        </span>
                        <h4 className="font-extrabold text-white text-sm mt-1.5 font-mono">{camp.campaignName}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Total Ad Spend</div>
                        <div className="text-xl font-black text-white">₹{camp.rawMetaSpend.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Impressions</div>
                        <div className="font-bold text-white text-sm mt-0.5">{camp.impressions.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Clicks / CTR</div>
                        <div className="font-bold text-white text-sm mt-0.5">{camp.clicks} ({camp.ctr}%)</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Purchases</div>
                        <div className="font-bold text-emerald-400 text-sm mt-0.5">{camp.purchases} Sales</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">ROAS</div>
                        <div className="font-black text-indigo-400 text-sm mt-0.5">{camp.roas}x</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOOGLE ANALYTICS & AI GENERATOR */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-extrabold text-white mb-2">Google Analytics Integration</h3>
              <p className="text-xs text-slate-400 mb-4">Track visitor sessions, conversion funnel, and real-time storefront traffic.</p>
              
              <div className="flex items-center space-x-3 max-w-md">
                <input
                  type="text"
                  value={store.googleAnalyticsId || ''}
                  onChange={e => setStore(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm"
                  placeholder="G-XXXXXXXXXX"
                />
                <button
                  onClick={() => showAlert('Google Analytics Tracking ID updated successfully!')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500"
                >
                  Save GA ID
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-extrabold text-white">Google Gemini AI Rich Landing Page Generator</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase">Select Target Product</label>
                  <select
                    value={selectedProductForAi.id}
                    onChange={(e) => {
                      const found = mockMasterCatalog.find(p => p.id === e.target.value);
                      if (found) setSelectedProductForAi(found);
                    }}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                  >
                    {mockMasterCatalog.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>

                  <button
                    disabled={aiGenerating}
                    onClick={handleGenerateAiLandingPage}
                    className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{aiGenerating ? 'Generating...' : 'Generate Rich Description'}</span>
                  </button>
                </div>

                <div className="md:col-span-2">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[250px]">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-3 border-b border-slate-800 pb-2">
                      Live HTML Landing Page Preview
                    </div>
                    {generatedHtml ? (
                      <div className="p-4 bg-white rounded-2xl text-slate-900 max-h-[400px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-xs">
                        <span>Click "Generate Rich Description" to create landing page HTML.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: 5% COMMISSION LEDGER */}
        {activeTab === 'commission' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">5% Commission Ledger (Delivered Orders Only)</h3>
                  <p className="text-xs text-slate-400">Commission is charged strictly on successfully delivered orders. Returned / RTO orders incur 0% commission.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                  5% Delivered Fee Policy
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order Number</th>
                      <th className="p-4">Order Amount</th>
                      <th className="p-4">Commission (5%)</th>
                      <th className="p-4">Merchant Profit Payout</th>
                      <th className="p-4 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {mockCommissionLedger.map(comm => (
                      <tr key={comm.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-indigo-400">{comm.orderNumber}</td>
                        <td className="p-4 font-bold text-white">₹{comm.totalOrderAmount.toFixed(2)}</td>
                        <td className="p-4 font-black text-emerald-400">₹{comm.commissionCharged.toFixed(2)}</td>
                        <td className="p-4 font-bold text-indigo-300">₹{comm.merchantProfitPayout.toFixed(2)}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {comm.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: STORE & DOMAIN SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
              <div>
                <h4 className="font-extrabold text-white text-base mb-4">Custom Domain Setup (GoDaddy CNAME)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Custom Domain Name</label>
                    <input 
                      type="text" 
                      value={store.customDomain || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, customDomain: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm"
                      placeholder="e.g. trendygadgets.in"
                    />
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-400">
                    <div className="font-bold text-slate-200">DNS Configuration Instructions:</div>
                    <div>1. Go to your domain registrar (GoDaddy / Namecheap).</div>
                    <div>2. Add CNAME record: <code className="text-indigo-400">CNAME @ -&gt; cname.360dropship-dns.com</code></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base mb-4">Meta Pixel & Google Analytics</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Meta Pixel ID</label>
                    <input 
                      type="text" 
                      value={store.metaPixelId || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, metaPixelId: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Google Analytics Tracking ID</label>
                    <input 
                      type="text" 
                      value={store.googleAnalyticsId || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
