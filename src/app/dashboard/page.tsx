'use client';

import React, { useState } from 'react';
import { 
  mockProfile, 
  mockStore, 
  mockMasterCatalog, 
  mockMerchantProducts, 
  mockMetaCampaigns, 
  mockWalletTransactions, 
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
  Key
} from 'lucide-react';

export default function DropshipperDashboard() {
  // Local state for interactive demo
  const [profile, setProfile] = useState(mockProfile);
  const [store, setStore] = useState(mockStore);
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'customization' | 'ads' | 'settings' | 'wallet' | 'ai_generator'>('overview');
  
  // Wallet modal state
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [rechargeType, setRechargeType] = useState<'FIRST' | 'REGULAR'>('FIRST');

  // AI Generator state
  const [selectedProductForAi, setSelectedProductForAi] = useState(mockMasterCatalog[0]);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  // Success alert
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Handle Wallet Recharge Simulation
  const handleRechargeWallet = (type: 'FIRST' | 'REGULAR') => {
    const baseAmount = type === 'FIRST' ? 1500 : 1000;
    const gstAmount = baseAmount * 0.18;
    const totalPaid = baseAmount + gstAmount;

    setProfile(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + baseAmount,
      walletActivated: true,
      onboardingStep: Math.max(prev.onboardingStep, 4)
    }));

    showAlert(`Success! Recharge of ₹${baseAmount} (+ ₹${gstAmount} GST = ₹${totalPaid}) processed. 2000+ Premium Products Unlocked! 🎉`);
    setShowWalletModal(false);
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

  // Calculate Wallet Calculations
  const isFirstDeposit = !profile.walletActivated;
  const currentMinBase = isFirstDeposit ? 1500 : 1000;
  const currentGst = currentMinBase * 0.18;
  const currentTotal = currentMinBase + currentGst;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
            S
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
              Shopdeck <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Merchant OS</span>
            </h1>
            <p className="text-xs text-slate-400">{store.name} ({store.subdomain}.shopdeck.in)</p>
          </div>
        </div>

        {/* Right Actions & Wallet Balance */}
        <div className="flex items-center space-x-4">
          {/* Wallet Balance Pill */}
          <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-3 ${profile.walletActivated ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/40 border-amber-500/40 text-amber-300'}`}>
            <Wallet className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">Wallet Balance</div>
              <div className="font-black text-sm text-white">₹{profile.walletBalance.toFixed(2)}</div>
            </div>
            {!profile.walletActivated && (
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">Inactive</span>
            )}
          </div>

          <button
            onClick={() => setShowWalletModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Recharge Wallet</span>
          </button>

          <a
            href={`/store/${store.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 flex items-center space-x-2 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Store</span>
          </a>
        </div>
      </header>

      {/* Alert Notification Toast */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-2xl border border-indigo-400 flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{alertMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Onboarding Checklist Header Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
                <span>Onboarding Setup</span>
                <span>•</span>
                <span>Step {profile.onboardingStep} of 5</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">Welcome back, {profile.fullName}!</h2>
              <p className="text-sm text-slate-400 mt-1">Complete your store setup & activate wallet to unlock 2,000+ winning products.</p>
            </div>
            
            {/* Step Indicators */}
            <div className="flex items-center space-x-2 bg-slate-950/60 p-2 rounded-2xl border border-slate-800">
              {[
                { step: 1, label: 'Account' },
                { step: 2, label: 'Store Name' },
                { step: 3, label: 'Theme Style' },
                { step: 4, label: 'Import Product' },
                { step: 5, label: 'Launch Ads' }
              ].map(s => (
                <div 
                  key={s.step} 
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 ${
                    profile.onboardingStep >= s.step 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {profile.onboardingStep > s.step ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <span>{s.step}</span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Store Sales</span>
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">₹3,498.00</div>
            <div className="text-xs text-emerald-400 mt-2 font-medium">↑ 2 Confirmed Orders</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Meta Ad Spend</span>
              <TrendingUp className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-2xl font-black text-white">₹6,840.00</div>
            <div className="text-xs text-slate-400 mt-2">Includes 20% platform charge</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>RTO / Return Rate</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">0%</div>
            <div className="text-xs text-emerald-400/80 mt-2">100% WhatsApp Verified</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Catalog Unlocked</span>
              {profile.walletActivated ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400" />}
            </div>
            <div className="text-2xl font-black text-white">
              {profile.walletActivated ? '2,000+ Products' : '50 Starter Products'}
            </div>
            <div className="text-xs text-amber-400 mt-2 font-medium">
              {profile.walletActivated ? 'Full Access Active' : 'Recharge ₹1500 to unlock full'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview & Orders', icon: ShoppingBag },
            { id: 'catalog', label: 'Product Catalog', icon: Layers },
            { id: 'customization', label: 'Store Theme & Styling', icon: Palette },
            { id: 'ads', label: 'Meta Ads Performance', icon: TrendingUp },
            { id: 'ai_generator', label: 'AI Landing Page Gen', icon: Sparkles },
            { id: 'wallet', label: 'Wallet & GST Receipts', icon: Wallet },
            { id: 'settings', label: 'Pixel & Domain Setup', icon: Key }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ORDERS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Recent Customer Orders</h3>
                  <p className="text-xs text-slate-400">All orders are automatically WhatsApp-verified & routed to logistics.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                  Auto-Fulfillment Active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Total Price</th>
                      <th className="p-4">Wholesale Cost</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 rounded-r-xl">Tracking</th>
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
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-mono text-slate-400">{ord.trackingNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG (50 STARTER VS 2000+ LOCKED) */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            {/* Wallet Activation Banner */}
            {!profile.walletActivated && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">You are currently viewing 50 Free Starter Products</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Recharge your wallet (Min ₹1,500 + 18% GST) to unlock 2,000+ high-converting winning products.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition-all whitespace-nowrap shadow-lg shadow-amber-500/20"
                >
                  Unlock 2,000+ Products Now
                </button>
              </div>
            )}

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockMasterCatalog.map(item => {
                const isLocked = !item.isStarter && !profile.walletActivated;
                return (
                  <div key={item.id} className={`rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative transition-all ${isLocked ? 'opacity-60' : 'hover:border-indigo-500/50 hover:shadow-xl'}`}>
                    {/* Image */}
                    <div className="h-48 relative overflow-hidden bg-slate-950">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      {item.isStarter && (
                        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                          Starter Free
                        </span>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-amber-400 p-4 text-center">
                          <Lock className="w-8 h-8 mb-2" />
                          <div className="font-extrabold text-sm text-white">Locked Premium Product</div>
                          <div className="text-[11px] text-slate-400 mt-1">Recharge Wallet to Access</div>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{item.category}</div>
                      <h4 className="font-extrabold text-white text-base mt-1 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>

                      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Wholesale Cost</div>
                          <div className="font-black text-emerald-400 text-base">₹{item.costPrice}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Recommended Price</div>
                          <div className="font-bold text-white text-base">₹{item.defaultPrice}</div>
                        </div>
                      </div>

                      <button
                        disabled={isLocked}
                        onClick={() => handleImportProduct(item)}
                        className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                          isLocked 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Import to Storefront</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STORE CUSTOMIZATION (TEMPLATES 1 TO 12 & STYLING) */}
        {activeTab === 'customization' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h3 className="text-lg font-extrabold text-white mb-2">Store Theme Preset (Choose 1 of 12 Templates)</h3>
              <p className="text-xs text-slate-400 mb-6">Select a pre-built conversion-optimized layout for your store.</p>

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

            {/* Custom Brand Colors & Assets */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-extrabold text-white text-base mb-4">Brand Colors</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Primary Accent Color</label>
                    <div className="flex items-center space-x-3 mt-1.5">
                      <input 
                        type="color" 
                        value={store.primaryColor} 
                        onChange={(e) => setStore(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={store.primaryColor} 
                        onChange={(e) => setStore(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm w-36"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Secondary Color</label>
                    <div className="flex items-center space-x-3 mt-1.5">
                      <input 
                        type="color" 
                        value={store.secondaryColor} 
                        onChange={(e) => setStore(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={store.secondaryColor} 
                        onChange={(e) => setStore(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm w-36"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base mb-4">Custom Banners & Logo</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Hero Banner Image URL</label>
                    <input 
                      type="text" 
                      value={store.bannerUrl || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, bannerUrl: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Store Logo Image URL</label>
                    <input 
                      type="text" 
                      value={store.logoUrl || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, logoUrl: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: META ADS PERFORMANCE (20% SERVICE MARKUP) */}
        {activeTab === 'ads' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Live Meta (Facebook/Instagram) Campaigns</h3>
                  <p className="text-xs text-slate-400">Synced from Master Agency Ad Account. Ad spend includes 20% platform management fee.</p>
                </div>
                <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-xs text-indigo-300 font-semibold">
                  Auto-Pause Protection Active
                </div>
              </div>

              <div className="space-y-4">
                {mockMetaCampaigns.map(camp => (
                  <div key={camp.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${camp.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                          {camp.status}
                        </span>
                        <h4 className="font-extrabold text-white text-sm mt-1.5 font-mono">{camp.campaignName}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Total Deducted Spend</div>
                        <div className="text-xl font-black text-white">₹{camp.totalDeductedSpend.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-500">Meta: ₹{camp.rawMetaSpend} + 20% Fee: ₹{camp.platformFee}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Impressions</div>
                        <div className="font-bold text-white text-sm mt-0.5">{camp.impressions.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Clicks / CTR</div>
                        <div className="font-bold text-white text-sm mt-0.5">{camp.clicks} ({camp.ctr}%)</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Cost Per Click (CPC)</div>
                        <div className="font-bold text-white text-sm mt-0.5">₹{camp.cpc}</div>
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

        {/* TAB 5: AI LANDING PAGE GENERATOR */}
        {activeTab === 'ai_generator' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Google Gemini AI Rich Landing Page Generator</h3>
                  <p className="text-xs text-slate-400">Uses readymade product photos to generate high-converting e-commerce HTML landing pages at ₹0 image cost!</p>
                </div>
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
                    className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{aiGenerating ? 'Generating Landing Page...' : 'Generate Rich AI Description'}</span>
                  </button>
                </div>

                <div className="md:col-span-2">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[300px]">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-3 border-b border-slate-800 pb-2">
                      Live HTML Landing Page Preview
                    </div>

                    {generatedHtml ? (
                      <div className="p-4 bg-white rounded-2xl text-slate-900 max-h-[500px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-xs">
                        <Sparkles className="w-8 h-8 mb-2 opacity-40 text-indigo-400" />
                        <span>Click "Generate Rich AI Description" to create landing page HTML using readymade product photos.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: WALLET & GST RECEIPTS */}
        {activeTab === 'wallet' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Wallet & GST Tax Ledger</h3>
                  <p className="text-xs text-slate-400">All deposits are processed with 18% GST invoice compliance.</p>
                </div>

                <button
                  onClick={() => setShowWalletModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Recharge Wallet (+18% GST)</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Date</th>
                      <th className="p-4">Transaction Type</th>
                      <th className="p-4">Description</th>
                      <th className="p-4">Net Wallet Credit</th>
                      <th className="p-4">GST (18%)</th>
                      <th className="p-4 rounded-r-xl">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {mockWalletTransactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-800/40">
                        <td className="p-4 text-xs font-mono text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-xs text-slate-300">{tx.description}</td>
                        <td className="p-4 font-black text-emerald-400">₹{tx.amount.toFixed(2)}</td>
                        <td className="p-4 text-slate-400">₹{tx.gstAmount.toFixed(2)}</td>
                        <td className="p-4 font-bold text-white">₹{tx.totalPaid.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: PIXEL & DOMAIN SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="e.g. myfancystore.com"
                    />
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-400">
                    <div className="font-bold text-slate-200">DNS Configuration Instructions:</div>
                    <div>1. Go to your domain registrar (GoDaddy / Namecheap).</div>
                    <div>2. Add CNAME record: <code className="text-indigo-400">CNAME @ -&gt; cname.vercel-dns.com</code></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base mb-4">Meta Pixel & Payment Gateway Keys</h4>
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
                    <label className="text-xs text-slate-400 font-bold uppercase">Merchant Razorpay Key ID</label>
                    <input 
                      type="text" 
                      value={store.razorpayKeyId || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, razorpayKeyId: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WALLET RECHARGE MODAL */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white">Recharge Wallet</h3>
                <p className="text-xs text-slate-400">18% GST applied as per Indian tax compliance.</p>
              </div>
              <button onClick={() => setShowWalletModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                onClick={() => setRechargeType('FIRST')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${rechargeType === 'FIRST' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}
              >
                1st Activation (₹1500)
              </button>
              <button
                onClick={() => setRechargeType('REGULAR')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${rechargeType === 'REGULAR' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}
              >
                Subsequent (₹1000)
              </button>
            </div>

            {/* Price breakdown */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Net Wallet Credit:</span>
                <span className="font-bold text-white">₹{currentMinBase.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18%):</span>
                <span className="font-bold text-white">₹{currentGst.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-extrabold text-base text-emerald-400">
                <span>Total Amount Payable:</span>
                <span>₹{currentTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => handleRechargeWallet(rechargeType)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/20"
            >
              Proceed to Pay ₹{currentTotal.toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
