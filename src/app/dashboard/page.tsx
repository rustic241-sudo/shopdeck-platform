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
  Landmark,
  Megaphone,
  Target,
  QrCode,
  FileSpreadsheet,
  Upload
} from 'lucide-react';

export default function DropshipperDashboard() {
  // Local state
  const [profile, setProfile] = useState(mockProfile);
  const [store, setStore] = useState(mockStore);
  const [myProducts, setMyProducts] = useState<Product[]>(mockMerchantProducts);
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'my_products' | 'shopify' | 'ads' | 'analytics' | 'commission' | 'settings'>('overview');

  // Mobile sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Shopify Store Integration & Sync State
  const [shopifyConnected, setShopifyConnected] = useState(true);
  const [shopifyDomain, setShopifyDomain] = useState('trendygadgets.myshopify.com');
  const [shopifyToken, setShopifyToken] = useState('shpat_98a76b54c3210fed');
  const [autoSyncProducts, setAutoSyncProducts] = useState(true);
  const [autoSyncOrders, setAutoSyncOrders] = useState(true);

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

  // Meta & Google Ads Wallet Balance State
  const [adWalletBalance, setAdWalletBalance] = useState(5400);
  const [customRechargeAmount, setCustomRechargeAmount] = useState(2500);
  const [rechargeHistory, setRechargeHistory] = useState([
    { id: 'tx_101', date: '2026-07-22', amount: 5000, method: 'Auto-Verified Dynamic UPI', status: 'SUCCESS' },
    { id: 'tx_102', date: '2026-07-18', amount: 2500, method: 'Razorpay NetBanking', status: 'SUCCESS' }
  ]);

  // Auto-Verify Dynamic UPI Modal State
  const [showDynamicUpiModal, setShowDynamicUpiModal] = useState(false);
  const [dynamicTxnId, setDynamicTxnId] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [verifyingUpi, setVerifyingUpi] = useState(false);

  // Price Editing Modal State inside My Products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState(0);

  // Excel / CSV Bulk Product Upload State
  const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
  const [parsedExcelProducts, setParsedExcelProducts] = useState<any[]>([]);
  const [uploadingExcel, setUploadingExcel] = useState(false);

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

  // Handle CSV File Upload & Parsing (Supports both Shopify CSV Export & Standard CSV)
  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length <= 1) {
        showAlert('CSV file is empty or missing data rows.');
        return;
      }

      // Parse Header
      const headerLine = lines[0];
      const headers = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());

      // Helper to find column index by list of possible header names
      const findColIdx = (possibleNames: string[], defaultIdx: number) => {
        const found = headers.findIndex(h => possibleNames.some(name => h === name.toLowerCase()));
        return found !== -1 ? found : defaultIdx;
      };

      const titleIdx = findColIdx(['title', 'handle', 'product name'], 0);
      const categoryIdx = findColIdx(['type', 'vendor', 'category'], 1);
      const costIdx = findColIdx(['cost per item', 'wholesalecost', 'costprice', 'cost'], 45);
      const priceIdx = findColIdx(['variant price', 'retailprice', 'price', 'defaultprice'], 18);
      const skuIdx = findColIdx(['variant sku', 'sku'], 13);
      const imageIdx = findColIdx(['image src', 'variant image', 'imageurl', 'image'], 23);
      const descIdx = findColIdx(['body (html)', 'description', 'body'], 2);

      const isShopifyFormat = headers.includes('handle') || headers.includes('variant price') || headers.includes('image src');

      // Skip Header Row
      const rows = lines.slice(1);
      const parsed = rows.map((row, idx) => {
        // Robust CSV splitting handling quotes
        const cols = row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(c => c.trim().replace(/^"|"$/g, ''));
        
        const title = cols[titleIdx] || `Shopify Product #${idx + 1}`;
        const category = cols[categoryIdx] || 'Shopify Store Import';
        const rawCost = cols[costIdx] ? parseFloat(cols[costIdx].replace(/[^0-9.]/g, '')) : NaN;
        const rawPrice = cols[priceIdx] ? parseFloat(cols[priceIdx].replace(/[^0-9.]/g, '')) : NaN;
        
        const defaultPrice = !isNaN(rawPrice) && rawPrice > 0 ? rawPrice : 999;
        const costPrice = !isNaN(rawCost) && rawCost > 0 ? rawCost : Math.round(defaultPrice * 0.4);
        const sku = cols[skuIdx] || `SKU-SHOPIFY-${100 + idx}`;
        const image = cols[imageIdx] || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80';
        const description = cols[descIdx]?.replace(/<[^>]*>?/gm, '') || 'High converting Shopify product imported into 360 Dropship catalog.';

        return {
          id: `excel_prod_${Date.now()}_${idx}`,
          title,
          category,
          costPrice,
          defaultPrice,
          sku,
          images: [image],
          description,
          inventory: 500
        };
      });

      setParsedExcelProducts(parsed);
      showAlert(`🎉 Auto-Detected ${isShopifyFormat ? 'Shopify Export CSV' : 'Standard Excel/CSV'} Format! Parsed ${parsed.length} products!`);
    };
    reader.readAsText(file);
  };

  // Bulk Commit Excel Products into Catalog
  const handleCommitExcelProducts = () => {
    setUploadingExcel(true);
    setTimeout(() => {
      setParsedExcelProducts([]);
      setShowExcelUploadModal(false);
      setUploadingExcel(false);
      showAlert(`🎉 Success! Excel products uploaded to catalog successfully!`);
    }, 1200);
  };

  // Download Sample Product CSV Template
  const handleDownloadSampleCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Title,Category,WholesaleCost,RetailPrice,SKU,ImageURL,Description,StockQuantity\n"
      + "Smart Wireless Earbuds Pro,Electronics,299,999,SKU-EARBUD-01,https://images.unsplash.com/photo-1590658268037-6bf12165a8df,Noise Cancelling Earbuds,500\n"
      + "Sunset RGB Projection Lamp,Home Decor,199,699,SKU-LAMP-02,https://images.unsplash.com/photo-1608571423902-eed4a5ad8108,Ambient Lighting Lamp,350\n"
      + "Multi-Function Vegetable Chopper,Kitchenware,149,499,SKU-CHOPPER-03,https://images.unsplash.com/photo-1570288685369-f7305163d0e3,Easy Kitchen Slicer,400\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "360dropship_sample_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAlert('Sample Excel / CSV product template downloaded!');
  };

  // Open Auto-Verify Dynamic UPI Modal
  const handleOpenDynamicUpiModal = (amt: number) => {
    setCustomRechargeAmount(amt);
    setDynamicTxnId(`360UPI_${Math.floor(100000 + Math.random() * 900000)}`);
    setUtrNumber('');
    setVerifyingUpi(false);
    setShowDynamicUpiModal(true);
  };

  // Auto-Verify & Credit Wallet Handler
  const handleAutoVerifyPayment = () => {
    setVerifyingUpi(true);
    setTimeout(() => {
      setAdWalletBalance(prev => prev + customRechargeAmount);
      const generatedUtr = utrNumber || `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
      const newTx = {
        id: dynamicTxnId,
        date: new Date().toISOString().split('T')[0],
        amount: customRechargeAmount,
        method: `Auto-Verified Dynamic UPI (UTR: ${generatedUtr})`,
        status: 'SUCCESS'
      };
      setRechargeHistory(prev => [newTx, ...prev]);
      setVerifyingUpi(false);
      setShowDynamicUpiModal(false);
      showAlert(`🎉 Auto-Verified! ₹${customRechargeAmount.toLocaleString()} credited to your Meta & Google Ads Wallet!`);
    }, 1500);
  };

  // Toggle approval status for demonstration
  const toggleApprovalStatus = () => {
    const nextStatus = profile.approvalStatus === 'APPROVED' ? 'PENDING' : 'APPROVED';
    setProfile(prev => ({ ...prev, approvalStatus: nextStatus }));
    showAlert(`Account Approval Status updated to: ${nextStatus}!`);
  };

  // Handle Connect / Save Shopify Store
  const handleSaveShopifySettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShopifyConnected(true);
    showAlert(`Shopify Store "${shopifyDomain}" connected successfully! Auto-sync active. 🚀`);
  };

  // Handle Push Product to Shopify Store
  const handleExportToShopify = (product: typeof mockMasterCatalog[0]) => {
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
    showAlert(`"${product.title}" exported to your Shopify store (${shopifyDomain})!`);
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
    { id: 'shopify', label: 'Shopify Store Connect', icon: ShoppingBag, badge: 'Auto-Sync' },
    { id: 'ads', label: 'Meta & Google Ads Engine', icon: Megaphone },
    { id: 'analytics', label: 'Google Analytics & AI', icon: BarChart3 },
    { id: 'commission', label: 'Payouts & Ledger', icon: Percent },
    { id: 'settings', label: 'Payment Gateway & Bank', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-2xl flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-sm">360</div>
          <span className="font-extrabold text-sm text-slate-900">360 Dropship</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-600 hover:text-slate-900">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 1. LIGHT SCROLLABLE VERTICAL SIDEBAR MENU */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen max-h-screen overflow-y-auto w-72 bg-white/95 backdrop-blur-2xl border-r border-slate-200 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-thumb-slate-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-5">
          <div className="flex items-center space-x-3 border-b border-slate-200/80 pb-4">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-lg shadow-md shadow-indigo-500/20">
              360
            </div>
            <div>
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight">360 Dropship</h1>
              <p className="text-[10px] text-indigo-600 font-bold">Merchant OS Panel</p>
            </div>
          </div>

          {/* Account Status Card */}
          <div 
            onClick={toggleApprovalStatus}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              isApproved 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isApproved ? <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                <span className="text-[10px] uppercase font-bold tracking-wider">Account Status</span>
              </div>
              <span className="text-[9px] font-black underline">Toggle</span>
            </div>
            <div className="font-extrabold text-xs text-slate-900 mt-1">
              {isApproved ? 'APPROVED (ACTIVE) ✅' : 'PENDING APPROVAL ⏳'}
            </div>
          </div>

          {/* Vertical Navigation Menu */}
          <nav className="space-y-1">
            <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-3 mb-1.5">Navigation Menu</div>
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
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-[1.02]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-indigo-600 border border-indigo-200'
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
        <div className="space-y-2.5 pt-4 border-t border-slate-200 mt-6">
          <a
            href={`https://${shopifyDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center justify-center space-x-2 transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Shopify Storefront</span>
          </a>

          <Link
            href="/"
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200 flex items-center justify-center space-x-2 transition-all"
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Merchant Control Dashboard</h2>
            <p className="text-xs text-slate-500 mt-1">{store.name} • domain: <span className="text-indigo-600 font-mono font-bold">{store.subdomain}.360dropship.in</span></p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>5% Delivered Commission Model</span>
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:shadow-xl transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Store Sales</span>
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">₹3,498.00</div>
            <div className="text-xs text-emerald-600 mt-2 font-medium">↑ 2 Orders (1 Delivered)</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:shadow-xl transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>My Active Products</span>
              <Store className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{myProducts.length} Items</div>
            <div className="text-xs text-indigo-600 mt-2 font-medium">Imported on Live Store</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:shadow-xl transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Delivered Fees</span>
              <Percent className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">₹74.95</div>
            <div className="text-xs text-slate-500 mt-2">5% Fee on Delivered COD</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:shadow-xl transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Catalog Unlocked</span>
              {isApproved ? <Unlock className="w-5 h-5 text-emerald-600" /> : <Lock className="w-5 h-5 text-amber-600" />}
            </div>
            <div className="text-2xl font-black text-slate-900">
              {isApproved ? 'All Factory Products' : 'Pending Approval'}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              {isApproved ? 'Full Access Active' : 'Waiting for Admin Approval'}
            </div>
          </div>
        </div>

        {/* TAB CONTENT DISPLAY */}

        {/* TAB 1: OVERVIEW & ORDERS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Recent Customer Orders</h3>
                  <p className="text-xs text-slate-500">All orders are WhatsApp verified. 5% commission is deducted only upon successful delivery.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                  WhatsApp Verification Active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Total Sale</th>
                      <th className="p-4">Wholesale Cost</th>
                      <th className="p-4">5% Commission</th>
                      <th className="p-4 font-bold text-slate-900">Net Merchant Profit</th>
                      <th className="p-4 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {mockOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-indigo-600">{ord.orderNumber}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{ord.customerName}</div>
                          <div className="text-xs text-slate-500">{ord.customerPhone} • {ord.city}</div>
                        </td>
                        <td className="p-4 font-medium">{ord.productTitle}</td>
                        <td className="p-4 font-bold text-slate-900">₹{ord.totalPrice}</td>
                        <td className="p-4 text-slate-500">₹{ord.wholesaleCost}</td>
                        <td className="p-4 text-emerald-600 font-bold">
                          {ord.status === 'DELIVERED' ? `₹${ord.platformCommission}` : '₹0.00 (Pending)'}
                        </td>
                        <td className="p-4 font-black text-indigo-700">
                          {ord.status === 'DELIVERED' ? `₹${ord.merchantNetProfit}` : 'Pending'}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            ord.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
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
              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-amber-600 animate-spin" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Account Approval Pending</h4>
                    <p className="text-xs text-slate-600">Your account is waiting for manual admin approval. Once approved, all products will be unlocked for 1-click import.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">All Factory Wholesale Products</h3>
                <p className="text-xs text-slate-500 mt-0.5">Browse 5,000+ winning products & export to your connected Shopify store.</p>
              </div>

              <button
                onClick={() => setShowExcelUploadModal(true)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                <span>Bulk Upload Products via Excel / CSV (.xlsx / .csv)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockMasterCatalog.map(item => (
                <div key={item.id} className="rounded-3xl bg-white border border-slate-200 overflow-hidden relative transition-all hover:border-indigo-500/50 shadow-md hover:shadow-xl">
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                      Wholesale Factory Catalog
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{item.category}</div>
                    <h4 className="font-extrabold text-slate-900 text-base mt-1 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Wholesale Price</div>
                        <div className="font-black text-emerald-600 text-base">₹{item.costPrice}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Recommended Sale</div>
                        <div className="font-bold text-slate-900 text-base">₹{item.defaultPrice}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleImportProduct(item)}
                      className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-all"
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
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">My Imported Storefront Products ({myProducts.length})</h3>
                  <p className="text-xs text-slate-500">Manage retail pricing, margins, and active inventory visible on your live storefront.</p>
                </div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Import More Products</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProducts.map(prod => (
                  <div key={prod.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-4">
                    <img src={prod.images[0]} alt={prod.title} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">
                          {prod.categoryName}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{prod.sku}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base line-clamp-1">{prod.title}</h4>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                        <div>
                          <span className="text-slate-500">Wholesale Cost:</span>
                          <span className="font-bold text-emerald-600 ml-1">₹{prod.costPrice}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Your Retail Price:</span>
                          <span className="font-black text-slate-900 ml-1">₹{prod.price}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Net Profit Margin:</span>
                          <span className="font-bold text-indigo-600 ml-1">₹{prod.price - prod.costPrice - (prod.price * 0.05)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setNewPrice(prod.price);
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1 shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Edit Price</span>
                        </button>
                        <button
                          onClick={() => handleRemoveProduct(prod.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs flex items-center space-x-1"
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

        {/* TAB 4: SHOPIFY STORE AUTO-SYNC INTEGRATION */}
        {activeTab === 'shopify' && (
          <div className="space-y-8">
            {/* Shopify Connection Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-black text-slate-900">Shopify Store Auto-Sync Integration</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {shopifyConnected ? 'CONNECTED & LIVE ✅' : 'NOT CONNECTED'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Connect your external Shopify store to automatically sync products, stock & fulfill orders.</p>
                  </div>
                </div>

                <button
                  onClick={() => setShopifyConnected(!shopifyConnected)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs border border-slate-200"
                >
                  {shopifyConnected ? 'Disconnect Store' : 'Connect Shopify'}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveShopifySettings} className="space-y-4 max-w-2xl">
                <div>
                  <label className="text-xs text-slate-500 font-bold uppercase">Shopify Store Myshopify Domain *</label>
                  <input
                    type="text"
                    required
                    value={shopifyDomain}
                    onChange={e => setShopifyDomain(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm font-bold"
                    placeholder="mybrand.myshopify.com"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 font-bold uppercase">Shopify Admin API Access Token (shpat_*) *</label>
                  <input
                    type="password"
                    required
                    value={shopifyToken}
                    onChange={e => setShopifyToken(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm"
                    placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                </div>

                {/* Auto Sync Switches */}
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs">Auto-Export Products to Shopify Catalog</div>
                      <div className="text-[11px] text-slate-500">Automatically push selected 360 Dropship products to your Shopify store front.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSyncProducts}
                      onChange={e => setAutoSyncProducts(e.target.checked)}
                      className="w-5 h-5 accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs">Auto-Fetch Orders for COD Fulfillment</div>
                      <div className="text-[11px] text-slate-500">Fetch customer orders from Shopify & dispatch via 360 Dropship warehouse.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSyncOrders}
                      onChange={e => setAutoSyncOrders(e.target.checked)}
                      className="w-5 h-5 accent-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/20 flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Shopify Integration</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showAlert('Initiated bulk export of 5,000+ factory products to Shopify catalog!')}
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync All Products to Shopify Now</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Synced Products Table */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">Shopify Synced Products ({myProducts.length})</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Product</th>
                      <th className="p-4">Shopify Product ID</th>
                      <th className="p-4">Wholesale Price</th>
                      <th className="p-4 font-bold text-slate-900">Shopify Selling Price</th>
                      <th className="p-4 rounded-r-xl">Sync Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 text-xs">
                    {myProducts.map((prod, idx) => (
                      <tr key={prod.id} className="hover:bg-slate-50">
                        <td className="p-4 font-extrabold text-slate-900 flex items-center gap-3">
                          <img src={prod.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <span>{prod.title}</span>
                        </td>
                        <td className="p-4 font-mono text-indigo-600 font-bold">gid://shopify/Product/892019{idx}</td>
                        <td className="p-4 text-emerald-600 font-bold">₹{prod.costPrice}</td>
                        <td className="p-4 font-black text-slate-900">₹{prod.price}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            SYNCED TO SHOPIFY
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

        {/* TAB 5: META & GOOGLE ADS ENGINE & WALLET RECHARGE */}
        {activeTab === 'ads' && (
          <div className="space-y-8">
            {/* 1. ADS WALLET BALANCE & RECHARGE CARD */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/40 text-white flex items-center justify-center font-bold">
                    <Wallet className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider">Meta & Google Ads Wallet Balance</div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-0.5 font-mono">
                      ₹{adWalletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ad Budget Active</span>
                </div>
              </div>

              {/* Add Money Form & Quick Buttons */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Quick Deposit / Add Funds To Ads Wallet</span>
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Auto-Verify Dynamic UPI Engine Active
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[1000, 2500, 5000, 10000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => handleOpenDynamicUpiModal(amt)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/10 transition-all flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-300" />
                      <span>+ ₹{amt.toLocaleString()}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Form + Auto-Verify Gateway Button */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center pt-2">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="relative w-full">
                      <span className="absolute left-4 top-3 text-slate-400 font-bold text-sm">₹</span>
                      <input
                        type="number"
                        value={customRechargeAmount}
                        onChange={e => setCustomRechargeAmount(Number(e.target.value))}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-bold text-sm outline-none focus:border-indigo-500"
                        placeholder="Enter custom recharge amount"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleOpenDynamicUpiModal(customRechargeAmount)}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-indigo-600 to-pink-600 hover:opacity-90 text-white font-black text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all"
                      >
                        <QrCode className="w-4 h-4 text-amber-300" />
                        <span>⚡ Generate Auto-Verify Dynamic UPI QR (₹{customRechargeAmount})</span>
                      </button>

                      <a
                        href={`https://www.proupiqr.in/r/?url=upi%3A%2F%2Fpay%3Fpa%3D${encodeURIComponent(upiQrVpa)}%26pn%3D360%2520Dropship%2520Ads%2520Wallet%26am%3D${customRechargeAmount}%26tn%3DAdsWalletRecharge`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs border border-slate-700 flex items-center justify-center space-x-2 transition-all"
                      >
                        <ExternalLink className="w-4 h-4 text-indigo-400" />
                        <span>Open GPay / PhonePe / Paytm App</span>
                      </a>
                    </div>
                  </div>

                  {/* Pro UPI QR Live Widget Preview Embed */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
                    <div className="text-[10px] font-bold text-slate-300 uppercase mb-2">Scan & Pay via Pro UPI QR</div>
                    <iframe
                      src={`https://www.proupiqr.in/embed/?pa=${encodeURIComponent(upiQrVpa)}&pn=360+Dropship+Ads+Wallet&am=${customRechargeAmount}&tn=AdsWalletRecharge&theme=4f46e5`}
                      width="100%"
                      height="210"
                      style={{ border: 'none', background: 'transparent', overflow: 'hidden' }}
                      title="Pro UPI QR Ads Wallet Deposit Widget"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Powered by ProUPIQR.in Zero-Fee Gateway API</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RECHARGE TRANSACTION HISTORY */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Ads Wallet Deposit & Recharge History</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Transaction ID</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5">Amount Added</th>
                      <th className="p-3.5 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 text-xs">
                    {rechargeHistory.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-indigo-600">{tx.id}</td>
                        <td className="p-3.5 text-slate-500">{tx.date}</td>
                        <td className="p-3.5 font-medium">{tx.method}</td>
                        <td className="p-3.5 font-black text-emerald-600">₹{tx.amount.toLocaleString()}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. CAMPAIGNS PERFORMANCE */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-indigo-600" />
                    <span>Meta (FB/Insta) & Google Ads Performance</span>
                  </h3>
                  <p className="text-xs text-slate-500">Track and manage high-converting ad campaigns run across Meta and Google Shopping.</p>
                </div>
              </div>

              {/* Campaign Cards */}
              <div className="space-y-4">
                {/* Meta Campaign */}
                {mockMetaCampaigns.map(camp => (
                  <div key={camp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-100 text-pink-700 border border-pink-200">
                          Meta Ads • {camp.status}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-1.5 font-mono">{camp.campaignName}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Total Meta Ad Spend</div>
                        <div className="text-xl font-black text-slate-900">₹{camp.rawMetaSpend.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-white border border-slate-200 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Impressions</div>
                        <div className="font-bold text-slate-900 text-sm mt-0.5">{camp.impressions.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Clicks / CTR</div>
                        <div className="font-bold text-slate-900 text-sm mt-0.5">{camp.clicks} ({camp.ctr}%)</div>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Purchases</div>
                        <div className="font-bold text-emerald-600 text-sm mt-0.5">{camp.purchases} Sales</div>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">ROAS</div>
                        <div className="font-black text-indigo-600 text-sm mt-0.5">{camp.roas}x</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Google Ads Campaign */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-100 text-indigo-700 border border-indigo-200">
                        Google Shopping Ads • ACTIVE
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1.5 font-mono">360DS_GADS_PMAX_ShoppingFeed_India</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Total Google Ad Spend</div>
                      <div className="text-xl font-black text-slate-900">₹3,850.00</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Search Impressions</div>
                      <div className="font-bold text-slate-900 text-sm mt-0.5">38,400</div>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Clicks / CTR</div>
                      <div className="font-bold text-slate-900 text-sm mt-0.5">1,150 (3.0%)</div>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Purchases</div>
                      <div className="font-bold text-emerald-600 text-sm mt-0.5">28 Sales</div>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">ROAS</div>
                      <div className="font-black text-indigo-600 text-sm mt-0.5">3.8x</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GOOGLE ANALYTICS & AI */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Google Analytics Integration</h3>
              <p className="text-xs text-slate-500 mb-4">Track visitor sessions, conversion funnel, and real-time storefront traffic.</p>
              
              <div className="flex items-center space-x-3 max-w-md">
                <input
                  type="text"
                  value={store.googleAnalyticsId || ''}
                  onChange={e => setStore(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm"
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

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-extrabold text-slate-900">Google Gemini AI Rich Landing Page Generator</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs text-slate-500 font-bold uppercase">Select Target Product</label>
                  <select
                    value={selectedProductForAi.id}
                    onChange={(e) => {
                      const found = mockMasterCatalog.find(p => p.id === e.target.value);
                      if (found) setSelectedProductForAi(found);
                    }}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm"
                  >
                    {mockMasterCatalog.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>

                  <button
                    disabled={aiGenerating}
                    onClick={handleGenerateAiLandingPage}
                    className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{aiGenerating ? 'Generating...' : 'Generate Rich Description'}</span>
                  </button>
                </div>

                <div className="md:col-span-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 min-h-[250px]">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-3 border-b border-slate-200 pb-2">
                      Live HTML Landing Page Preview
                    </div>
                    {generatedHtml ? (
                      <div className="p-4 bg-white rounded-2xl text-slate-900 max-h-[400px] overflow-y-auto border border-slate-200" dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-xs">
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
            <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase">Registered Profit Payout Account</div>
                  <h4 className="text-lg font-black text-slate-900 mt-0.5">{bankName} ({bankHolder})</h4>
                  <p className="text-xs text-slate-600 font-mono">A/C: {accountNumber} • IFSC: {ifscCode} • UPI: {upiId}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('settings')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
              >
                Update Bank Account
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Merchant Profit Payout & Commission Ledger</h3>
                  <p className="text-xs text-slate-500">All net profit payouts are credited to your registered bank account on a daily cycle.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-xl">Order Number</th>
                      <th className="p-4">Order Amount</th>
                      <th className="p-4">5% Commission</th>
                      <th className="p-4 font-bold text-emerald-600">Net Profit Payout Sent</th>
                      <th className="p-4 rounded-r-xl">Payout Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {mockCommissionLedger.map(comm => (
                      <tr key={comm.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-indigo-600">{comm.orderNumber}</td>
                        <td className="p-4 font-bold text-slate-900">₹{comm.totalOrderAmount.toFixed(2)}</td>
                        <td className="p-4 font-bold text-amber-600">₹{comm.commissionCharged.toFixed(2)}</td>
                        <td className="p-4 font-black text-emerald-600 text-base">₹{comm.merchantProfitPayout.toFixed(2)}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
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
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Merchant Bank Account for Profit Payouts</h3>
                  <p className="text-xs text-slate-500">Your order profit money will be remitted directly into this bank account.</p>
                </div>
              </div>

              <form onSubmit={handleSaveBankDetails} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={bankHolder}
                      onChange={e => setBankHolder(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                      placeholder="Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                      placeholder="HDFC Bank / ICICI Bank / SBI"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Bank Account Number *</label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs"
                      placeholder="50100293849182"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">IFSC Code *</label>
                    <input
                      type="text"
                      required
                      value={ifscCode}
                      onChange={e => setIfscCode(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs uppercase"
                      placeholder="HDFC0001234"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Merchant UPI ID / VPA *</label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs"
                      placeholder="rahulsharma@upi"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Merchant Payout Bank Details</span>
                </button>
              </form>
            </div>

            {/* Payment Gateway Configurations */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <span>Payment Gateway Configurations</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Enable and configure online payment gateways & Cash on Delivery (COD) for your storefront.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gateway 1: COD */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-sm">1. Cash on Delivery (COD)</div>
                    <input
                      type="checkbox"
                      checked={codEnabled}
                      onChange={e => {
                        setCodEnabled(e.target.checked);
                        showAlert(`COD Payment option ${e.target.checked ? 'ENABLED' : 'DISABLED'}!`);
                      }}
                      className="w-5 h-5 rounded bg-white border-slate-300 text-indigo-600 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-500">Allows 1-Click Fast Cash on Delivery checkout with WhatsApp confirmation.</p>
                </div>

                {/* Gateway 2: Razorpay */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm">2. Razorpay Payment Gateway</div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={razorpayKey}
                      onChange={e => setRazorpayKey(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-xs"
                      placeholder="rzp_live_XXXXXXXX"
                    />
                  </div>
                </div>

                {/* Gateway 3: PhonePe PG */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm">3. PhonePe Payment Gateway</div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">PhonePe Merchant ID (MID)</label>
                    <input
                      type="text"
                      value={phonepeMerchantId}
                      onChange={e => setPhonepeMerchantId(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-xs"
                      placeholder="M100XXXXXX"
                    />
                  </div>
                </div>

                {/* Gateway 4: Paytm & Cashfree */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm">4. Paytm / Cashfree / Instant UPI QR</div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Merchant UPI VPA Address</label>
                    <input
                      type="text"
                      value={upiQrVpa}
                      onChange={e => setUpiQrVpa(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-xs"
                      placeholder="yourname@upi"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => showAlert('Payment Gateway Keys updated successfully on live storefront!')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/20"
              >
                Save Payment Gateway Settings
              </button>
            </div>

            {/* Custom Domain & Meta Pixel */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md">
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-4">Custom Domain Setup (GoDaddy CNAME)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Custom Domain Name</label>
                    <input 
                      type="text" 
                      value={store.customDomain || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, customDomain: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm"
                      placeholder="e.g. trendygadgets.in"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
                    <div className="font-bold text-slate-900">DNS Configuration Instructions:</div>
                    <div>1. Go to your domain registrar (GoDaddy / Namecheap).</div>
                    <div>2. Add CNAME record: <code className="text-indigo-600 font-bold">CNAME @ -&gt; cname.360dropship-dns.com</code></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-4">Meta Pixel & Google Analytics</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Meta Pixel ID</label>
                    <input 
                      type="text" 
                      value={store.metaPixelId || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, metaPixelId: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase">Google Analytics Tracking ID</label>
                    <input 
                      type="text" 
                      value={store.googleAnalyticsId || ''} 
                      onChange={(e) => setStore(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Edit Storefront Retail Price</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="text-xs text-slate-700 font-bold">{editingProduct.title}</div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="text-slate-600">Wholesale Sourcing Cost: <span className="font-bold text-emerald-600">₹{editingProduct.costPrice}</span></div>
              <div className="text-slate-600">Platform Commission (5%): <span className="font-bold text-amber-600">₹{(newPrice * 0.05).toFixed(2)}</span></div>
              <div className="text-indigo-600 font-bold">Your Net Profit: ₹{(newPrice - editingProduct.costPrice - (newPrice * 0.05)).toFixed(2)}</div>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-bold uppercase">Custom Customer Selling Price (₹)</label>
              <input
                type="number"
                value={newPrice}
                onChange={e => setNewPrice(Number(e.target.value))}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-black text-base"
              />
            </div>

            <button
              onClick={handleSavePriceEdit}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/20"
            >
              Save New Retail Price
            </button>
          </div>
        </div>
      )}

            {/* AUTO-VERIFY DYNAMIC UPI MODAL */}
            {showDynamicUpiModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
                  <button 
                    onClick={() => setShowDynamicUpiModal(false)} 
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-center space-y-1.5 border-b border-slate-100 pb-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      NPCI Real-Time Auto-Verify Dynamic UPI
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">Scan & Credit Ads Wallet</h3>
                    <p className="text-xs text-slate-500 font-mono">Txn ID: {dynamicTxnId} • Payee: {upiQrVpa}</p>
                  </div>

                  {/* Dynamic QR Code Render */}
                  <div className="p-6 rounded-3xl bg-slate-900 text-white text-center space-y-4 shadow-xl">
                    <div className="text-xs text-slate-300 font-bold uppercase tracking-wider">Amount to Pay</div>
                    <div className="text-4xl font-black text-emerald-400 font-mono">₹{customRechargeAmount.toLocaleString()}</div>
                    
                    <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto shadow-inner flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${upiQrVpa}&pn=360DS_AdsWallet&am=${customRechargeAmount}&tn=${dynamicTxnId}`)}`}
                        alt="Dynamic Auto Verify UPI QR"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                      <span>Listening for instant bank webhook payment callback...</span>
                    </div>
                  </div>

                  {/* Direct App Link Button */}
                  <a
                    href={`https://www.proupiqr.in/r/?url=upi%3A%2F%2Fpay%3Fpa%3D${encodeURIComponent(upiQrVpa)}%26pn%3D360DS_AdsWallet%26am%3D${customRechargeAmount}%26tn%3D${dynamicTxnId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs border border-indigo-200 flex items-center justify-center space-x-2 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Tap to Open PhonePe / GPay / Paytm App Directly</span>
                  </a>

                  {/* Manual UTR Verification Form */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-700">Option 2: Enter 12-Digit Bank UTR / Ref No for Instant Credit</div>
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={e => setUtrNumber(e.target.value)}
                      maxLength={12}
                      placeholder="e.g. 420918273645 (12 digits)"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold outline-none focus:border-indigo-500"
                    />

                    <button
                      disabled={verifyingUpi}
                      onClick={handleAutoVerifyPayment}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all"
                    >
                      {verifyingUpi ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Verifying with NPCI Bank Servers...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Auto-Verify & Credit ₹{customRechargeAmount.toLocaleString()} to Ads Wallet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

      {/* BULK EXCEL / CSV PRODUCT UPLOAD MODAL */}
      {showExcelUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowExcelUploadModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Bulk Upload Products via Excel / CSV</h3>
                <p className="text-xs text-slate-500">Upload your product catalog using Excel (.xlsx) or CSV file in 1-click.</p>
              </div>
            </div>

            {/* Step 1: Download Sample Excel Template */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="font-extrabold text-slate-900 text-xs">Step 1: Download Standard Sample Excel / CSV Format</div>
                <div className="text-[11px] text-slate-500">Columns: Title, Category, WholesaleCost, RetailPrice, SKU, ImageURL, Description, StockQuantity</div>
              </div>
              <button
                onClick={handleDownloadSampleCsv}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-300 shadow-sm flex items-center space-x-1.5 whitespace-nowrap"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            {/* Step 2: File Picker Input Area */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase text-slate-500">Step 2: Choose Your Excel / CSV File (.csv / .xlsx)</label>
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50 hover:bg-emerald-50/50 transition-all cursor-pointer relative">
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleCsvFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <div className="text-sm font-extrabold text-slate-900">Click or Drag & Drop Excel/CSV File Here</div>
                <div className="text-xs text-slate-400 mt-1">Supports Microsoft Excel (.xlsx), CSV (.csv)</div>
              </div>
            </div>

            {/* Step 3: Parsed Products Preview Table */}
            {parsedExcelProducts.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase">Parsed Excel Products ({parsedExcelProducts.length} Items Found)</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Ready to Upload ✅</span>
                </div>

                <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] sticky top-0">
                      <tr>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Wholesale Cost</th>
                        <th className="p-3">Retail Price</th>
                        <th className="p-3">SKU</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {parsedExcelProducts.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{p.title}</td>
                          <td className="p-3 text-slate-500">{p.category}</td>
                          <td className="p-3 text-emerald-600 font-bold">₹{p.costPrice}</td>
                          <td className="p-3 font-extrabold text-slate-900">₹{p.defaultPrice}</td>
                          <td className="p-3 font-mono text-slate-500">{p.sku}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  disabled={uploadingExcel}
                  onClick={handleCommitExcelProducts}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all"
                >
                  {uploadingExcel ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Uploading Products to Catalog & Syncing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Upload & Commit {parsedExcelProducts.length} Products to Factory Catalog</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
