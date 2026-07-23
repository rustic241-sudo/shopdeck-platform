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
import { Product } from '@/lib/types';
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
  X,
  CreditCard,
  Trash2,
  Edit3,
  Building,
  Landmark
} from 'lucide-react';

export default function DropshipperDashboard() {
  // Local state
  const [profile, setProfile] = useState(mockProfile);
  const [store, setStore] = useState(mockStore);
  const [myProducts, setMyProducts] = useState<Product[]>(mockMerchantProducts);
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'my_products' | 'customization' | 'ads' | 'analytics' | 'commission' | 'settings'>('overview');

  // Mobile sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Payment Gateway Configuration State
  const [codEnabled, setCodEnabled] = useState(true);
  const [razorpayKey, setRazorpayKey] = useState(store.razorpayKeyId || 'rzp_live_123456789');
  const [phonepeMerchantId, setPhonepeMerchantId] = useState('M1092837465');
  const [paytmMerchantId, setPaytmMerchantId] = useState('PAYTM_MID_9018');
  const [upiQrVpa, setUpiQrVpa] = useState('merchant360@upi');

  // Merchant Bank Payout Details State
  const [bankHolder, setBankHolder] = useState(profile.bankAccountHolder || 'Rahul Sharma');
  const [bankName, setBankName] = useState(profile.bankName || 'HDFC Bank');
  const [accountNumber, setAccountNumber] = useState(profile.accountNumber || '50100293849182');
  const [ifscCode, setIfscCode] = useState(profile.ifscCode || 'HDFC0001234');
  const [upiId, setUpiId] = useState(profile.upiId || 'rahulsharma@hdfcbank');

  // Price Editing Modal State inside My Products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState(0);

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
    const newMerchantProd: Product = {
      id: `prod_${Date.now()}`,
      storeId: store.id,
      masterProductId: product.id,
      title: product.title,
      description: product.description,
      price: product.defaultPrice,
      costPrice: product.costPrice,
      images: product.images,
      categoryName: product.category,
      sku: product.sku,
      inventory: product.inventory,
      createdAt: new Date().toISOString()
    };

    setMyProducts(prev => [newMerchantProd, ...prev]);
    showAlert(`"${product.title}" imported to your storefront ("My Products")!`);
  };

  // Handle Edit Price in My Products
  const handleSavePriceEdit = () => {
    if (!editingProduct) return;
    setMyProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, price: newPrice } : p));
    setEditingProduct(null);
    showAlert('Retail price updated successfully on live storefront!');
  };

  // Handle Save Bank Payout Details
  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      bankAccountHolder: bankHolder,
      bankName: bankName,
      accountNumber: accountNumber,
      ifscCode: ifscCode,
      upiId: upiId
    }));
    showAlert('Merchant Bank Account Payout Details updated & verified!');
  };

  // Handle Remove Product from My Products
  const handleRemoveProduct = (id: string) => {
    setMyProducts(prev => prev.filter(p => p.id !== id));
    showAlert('Product removed from your storefront.');
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

  // Clean Navigation Menu Items
  const menuItems = [
    { id: 'overview', label: 'Overview & Orders', icon: ShoppingBag, badge: 'Live' },
    { id: 'catalog', label: 'All Products', icon: Layers, badge: '5,000+' },
    { id: 'my_products', label: 'My Products', icon: Store, badge: `${myProducts.length}` },
    { id: 'customization', label: 'Store Theme & Styling', icon: Palette },
    { id: 'ads', label: 'Meta Ads Manager', icon: TrendingUp },
    { id: 'analytics', label: 'Google Analytics & AI', icon: BarChart3 },
    { id: 'commission', label: 'Payouts & Ledger', icon: Percent },
    { id: 'settings', label: 'Payment Gateway & Bank', icon: CreditCard }
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

      {/* 1. SCROLLABLE VERTICAL SIDEBAR MENU */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen max-h-screen overflow-y-auto w-72 bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-thumb-slate-800
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-5">
          <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/30">
              360
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white tracking-tight">360 Dropship</h1>
              <p className="text-[10px] text-indigo-400 font-bold">Merchant OS Panel</p>
            </div>
          </div>

          {/* Account Status Card */}
          <div 
            onClick={toggleApprovalStatus}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              isApproved 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isApproved ? <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
                <span className="text-[10px] uppercase font-bold tracking-wider">Account Status</span>
              </div>
              <span className="text-[9px] font-black underline">Toggle</span>
            </div>
            <div className="font-extrabold text-xs text-white mt-1">
              {isApproved ? 'APPROVED (ACTIVE) ✅' : 'PENDING APPROVAL ⏳'}
            </div>
          </div>

          {/* Vertical Navigation Menu */}
          <nav className="space-y-1">
            <div className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider px-3 mb-1.5">Navigation Menu</div>
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
                  className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-[1.02]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
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
        <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mt-6">
          <a
            href={`/store/${store.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs border border-indigo-500/30 flex items-center justify-center space-x-2 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Storefront</span>
          </a>

          <Link
            href="/"
            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 flex items-center justify-center space-x-2 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Portal</span>
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
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
              <span>My Active Products</span>
              <Store className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{myProducts.length} Items</div>
            <div className="text-xs text-indigo-400 mt-2 font-medium">Imported on Live Store</div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Delivered Fees</span>
              <Percent className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">₹74.95</div>
            <div className="text-xs text-slate-400 mt-2">5% Fee on Delivered COD</div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Catalog Unlocked</span>
              {isApproved ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400" />}
            </div>
            <div className="text-2xl font-black text-white">
              {isApproved ? 'All Factory Products' : 'Pending Approval'}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-medium">
              {isApproved ? 'Full Access Active' : 'Waiting for Admin Approval'}
            </div>
          </div>
        </div>

        {/* TAB CONTENT DISPLAY */}

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
                      <th className="p-4 font-bold text-white">Net Merchant Profit</th>
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
                          {ord.status === 'DELIVERED' ? `₹${ord.platformCommission}` : '₹0.00 (Pending)'}
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

        {/* TAB 2: ALL PRODUCTS (MASTER WHOLESALE CATALOG) */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            {!isApproved && (
              <div className="p-6 rounded-3xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-amber-400 animate-spin" />
                  <div>
                    <h4 className="font-extrabold text-white text-base">Account Approval Pending</h4>
                    <p className="text-xs text-slate-300">Your account is waiting for manual admin approval. Once approved, all products will be unlocked for 1-click import.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-white">All Factory Wholesale Products</h3>
                <p className="text-xs text-slate-400 mt-0.5">Browse 5,000+ winning products & import to your live storefront in 1-click.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockMasterCatalog.map(item => (
                <div key={item.id} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative transition-all hover:border-indigo-500/50 shadow-xl">
                  <div className="h-48 relative overflow-hidden bg-slate-950">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                      Wholesale Factory Catalog
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

        {/* TAB 3: MY PRODUCTS (IMPORTED STOREFRONT PRODUCTS & PRICE EDITING) */}
        {activeTab === 'my_products' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">My Imported Storefront Products ({myProducts.length})</h3>
                  <p className="text-xs text-slate-400">Manage retail pricing, margins, and active inventory visible on your live storefront.</p>
                </div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Import More Products</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProducts.map(prod => (
                  <div key={prod.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-4">
                    <img src={prod.images[0]} alt={prod.title} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-500/30">
                          {prod.categoryName}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{prod.sku}</span>
                      </div>
                      <h4 className="font-extrabold text-white text-base line-clamp-1">{prod.title}</h4>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <div>
                          <span className="text-slate-400">Wholesale Cost:</span>
                          <span className="font-bold text-emerald-400 ml-1">₹{prod.costPrice}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Your Retail Price:</span>
                          <span className="font-black text-white ml-1">₹{prod.price}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Net Profit Margin:</span>
                          <span className="font-bold text-indigo-300 ml-1">₹{prod.price - prod.costPrice - (prod.price * 0.05)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setNewPrice(prod.price);
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Edit Price</span>
                        </button>
                        <button
                          onClick={() => handleRemoveProduct(prod.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 font-bold text-xs flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STORE THEME & STYLING */}
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

        {/* TAB 5: META ADS MANAGER */}
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

        {/* TAB 6: GOOGLE ANALYTICS & AI */}
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

        {/* TAB 7: PAYOUTS & COMMISSION LEDGER */}
        {activeTab === 'commission' && (
          <div className="space-y-8">
            {/* Merchant Registered Payout Bank Card */}
            <div className="p-6 rounded-3xl bg-indigo-950/60 border border-indigo-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-300 uppercase">Registered Profit Payout Account</div>
                  <h4 className="text-lg font-black text-white mt-0.5">{bankName} ({bankHolder})</h4>
                  <p className="text-xs text-slate-300 font-mono">A/C: {accountNumber} • IFSC: {ifscCode} • UPI: {upiId}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('settings')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Update Bank Account
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Merchant Profit Payout & Commission Ledger</h3>
                  <p className="text-xs text-slate-400">All net profit payouts are credited to your registered bank account on a daily cycle.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order Number</th>
                      <th className="p-4">Order Amount</th>
                      <th className="p-4">5% Commission</th>
                      <th className="p-4 font-bold text-emerald-400">Net Profit Payout Sent</th>
                      <th className="p-4 rounded-r-xl">Payout Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {mockCommissionLedger.map(comm => (
                      <tr key={comm.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-indigo-400">{comm.orderNumber}</td>
                        <td className="p-4 font-bold text-white">₹{comm.totalOrderAmount.toFixed(2)}</td>
                        <td className="p-4 font-bold text-amber-400">₹{comm.commissionCharged.toFixed(2)}</td>
                        <td className="p-4 font-black text-emerald-400 text-base">₹{comm.merchantProfitPayout.toFixed(2)}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {comm.status} (Bank Transfer)
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

        {/* TAB 8: PAYMENT GATEWAY & MERCHANT BANK SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            {/* Merchant Bank Payout Details Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Merchant Bank Account for Profit Payouts</h3>
                  <p className="text-xs text-slate-400">Your order profit money will be remitted directly into this bank account.</p>
                </div>
              </div>

              <form onSubmit={handleSaveBankDetails} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={bankHolder}
                      onChange={e => setBankHolder(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs"
                      placeholder="Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs"
                      placeholder="HDFC Bank / ICICI Bank / SBI"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Bank Account Number *</label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                      placeholder="50100293849182"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">IFSC Code *</label>
                    <input
                      type="text"
                      required
                      value={ifscCode}
                      onChange={e => setIfscCode(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs uppercase"
                      placeholder="HDFC0001234"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase">Merchant UPI ID / VPA *</label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                      placeholder="rahulsharma@upi"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Merchant Payout Bank Details</span>
                </button>
              </form>
            </div>

            {/* Payment Gateway Configurations */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-400" />
                  <span>Payment Gateway Configurations</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Enable and configure online payment gateways & Cash on Delivery (COD) for your storefront.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gateway 1: COD */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-white text-sm">1. Cash on Delivery (COD)</div>
                    <input
                      type="checkbox"
                      checked={codEnabled}
                      onChange={e => {
                        setCodEnabled(e.target.checked);
                        showAlert(`COD Payment option ${e.target.checked ? 'ENABLED' : 'DISABLED'}!`);
                      }}
                      className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-indigo-600 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Allows 1-Click Fast Cash on Delivery checkout with WhatsApp confirmation.</p>
                </div>

                {/* Gateway 2: Razorpay */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="font-extrabold text-white text-sm">2. Razorpay Payment Gateway</div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={razorpayKey}
                      onChange={e => setRazorpayKey(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs"
                      placeholder="rzp_live_XXXXXXXX"
                    />
                  </div>
                </div>

                {/* Gateway 3: PhonePe PG */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="font-extrabold text-white text-sm">3. PhonePe Payment Gateway</div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">PhonePe Merchant ID (MID)</label>
                    <input
                      type="text"
                      value={phonepeMerchantId}
                      onChange={e => setPhonepeMerchantId(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs"
                      placeholder="M100XXXXXX"
                    />
                  </div>
                </div>

                {/* Gateway 4: Paytm & Cashfree */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="font-extrabold text-white text-sm">4. Paytm / Cashfree / Instant UPI QR</div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Merchant UPI VPA Address</label>
                    <input
                      type="text"
                      value={upiQrVpa}
                      onChange={e => setUpiQrVpa(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs"
                      placeholder="yourname@upi"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => showAlert('Payment Gateway Keys updated successfully on live storefront!')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30"
              >
                Save Payment Gateway Settings
              </button>
            </div>

            {/* Custom Domain & Meta Pixel */}
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

      {/* EDIT PRICE MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white">Edit Storefront Retail Price</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400">✕</button>
            </div>

            <div className="text-xs text-slate-300 font-bold">{editingProduct.title}</div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400">Wholesale Sourcing Cost: <span className="font-bold text-emerald-400">₹{editingProduct.costPrice}</span></div>
              <div className="text-slate-400">Platform Commission (5%): <span className="font-bold text-amber-400">₹{(newPrice * 0.05).toFixed(2)}</span></div>
              <div className="text-indigo-400 font-bold">Your Net Profit: ₹{(newPrice - editingProduct.costPrice - (newPrice * 0.05)).toFixed(2)}</div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold uppercase">Custom Customer Selling Price (₹)</label>
              <input
                type="number"
                value={newPrice}
                onChange={e => setNewPrice(Number(e.target.value))}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-black text-base"
              />
            </div>

            <button
              onClick={handleSavePriceEdit}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30"
            >
              Save New Retail Price
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
