'use client';

import React, { useState } from 'react';
import { mockMasterCatalog, mockProfile, mockStore, mockOrders } from '@/lib/mockData';
import { MasterCatalogProduct, Profile } from '@/lib/types';
import { ShieldCheck, Plus, Package, Users, DollarSign, Layers, CheckCircle2, TrendingUp, Sparkles, Clock, Check, X, Landmark, CreditCard, Megaphone, FileSpreadsheet, Upload } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [catalog, setCatalog] = useState<MasterCatalogProduct[]>(mockMasterCatalog);
  
  // Pending Merchant Applications state
  const [pendingMerchants, setPendingMerchants] = useState<Profile[]>([
    {
      id: 'usr_merchant_102',
      email: 'kapil.retail@gmail.com',
      fullName: 'Kapil Verma',
      businessName: 'Apex Lifestyle Store',
      role: 'DROPSHIPPER',
      approvalStatus: 'PENDING',
      commissionRate: 5,
      securityDepositPaid: false,
      onboardingStep: 2,
      phoneNumber: '+91 98111 88990',
      city: 'Delhi',
      state: 'NCR',
      bankAccountHolder: 'Kapil Verma',
      bankName: 'ICICI Bank',
      accountNumber: '001201589218',
      ifscCode: 'ICIC0000012',
      upiId: 'kapilverma@icici',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 'usr_merchant_103',
      email: 'sneha.gadgets@gmail.com',
      fullName: 'Sneha Patel',
      businessName: 'Sneha Gadgets',
      role: 'DROPSHIPPER',
      approvalStatus: 'PENDING',
      commissionRate: 5,
      securityDepositPaid: false,
      onboardingStep: 2,
      phoneNumber: '+91 97222 44556',
      city: 'Ahmedabad',
      state: 'Gujarat',
      bankAccountHolder: 'Sneha Patel',
      bankName: 'Axis Bank',
      accountNumber: '9180200481920',
      ifscCode: 'UTIB0000214',
      upiId: 'sneha@axisbank',
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
    }
  ]);

  const [approvedCount, setApprovedCount] = useState(1240);

  // Handle Approve Merchant
  const handleApproveMerchant = (id: string) => {
    setPendingMerchants(prev => prev.filter(m => m.id !== id));
    setApprovedCount(prev => prev + 1);
  };

  // New single product form
  const [newTitle, setNewTitle] = useState('');
  const [newCostPrice, setNewCostPrice] = useState(499);
  const [newRetailPrice, setNewRetailPrice] = useState(1499);
  const [newCategory, setNewCategory] = useState('Electronics');
  const [showAddModal, setShowAddModal] = useState(false);

  // Excel / CSV Bulk Product Upload State for Super Admin
  const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
  const [parsedExcelProducts, setParsedExcelProducts] = useState<any[]>([]);
  const [uploadingExcel, setUploadingExcel] = useState(false);
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
        const cols = row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(c => c.trim().replace(/^"|"$/g, ''));
        
        const title = cols[titleIdx] || `Master Product #${idx + 1}`;
        const category = cols[categoryIdx] || 'Electronics';
        const rawCost = cols[costIdx] ? parseFloat(cols[costIdx].replace(/[^0-9.]/g, '')) : NaN;
        const rawPrice = cols[priceIdx] ? parseFloat(cols[priceIdx].replace(/[^0-9.]/g, '')) : NaN;
        
        const defaultPrice = !isNaN(rawPrice) && rawPrice > 0 ? rawPrice : 1499;
        const costPrice = !isNaN(rawCost) && rawCost > 0 ? rawCost : 499;
        const sku = cols[skuIdx] || `SKU-360-${100 + idx}`;
        const image = cols[imageIdx] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
        const description = cols[descIdx]?.replace(/<[^>]*>?/gm, '') || 'High quality factory wholesale product added to master catalog.';

        return {
          id: `mc_excel_${Date.now()}_${idx}`,
          title,
          category,
          costPrice,
          defaultPrice,
          sku,
          images: [image],
          description,
          inventory: 5000,
          isStarter: true,
          createdAt: new Date().toISOString()
        };
      });

      setParsedExcelProducts(parsed);
      showAlert(`🎉 Auto-Detected ${isShopifyFormat ? 'Shopify Export CSV' : 'Standard Excel/CSV'} Format! Parsed ${parsed.length} products!`);
    };
    reader.readAsText(file);
  };

  // Bulk Commit Excel Products into Admin Master Catalog
  const handleCommitExcelProducts = () => {
    setUploadingExcel(true);
    setTimeout(() => {
      setCatalog(prev => [...parsedExcelProducts, ...prev]);
      setParsedExcelProducts([]);
      setShowExcelUploadModal(false);
      setUploadingExcel(false);
      showAlert(`🎉 Success! ${parsedExcelProducts.length} Excel products added to Master Catalog for all dropshippers!`);
    }, 1200);
  };

  // Download Sample Product CSV Template
  const handleDownloadSampleCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Title,Category,WholesaleCost,RetailPrice,SKU,ImageURL,Description,StockQuantity\n"
      + "Smart Wireless Earbuds Pro,Electronics,299,999,SKU-EARBUD-01,https://images.unsplash.com/photo-1590658268037-6bf12165a8df,Noise Cancelling Earbuds,5000\n"
      + "Sunset RGB Projection Lamp,Home Decor,199,699,SKU-LAMP-02,https://images.unsplash.com/photo-1608571423902-eed4a5ad8108,Ambient Lighting Lamp,3500\n"
      + "Multi-Function Vegetable Chopper,Kitchenware,149,499,SKU-CHOPPER-03,https://images.unsplash.com/photo-1570288685369-f7305163d0e3,Easy Kitchen Slicer,4000\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "360dropship_admin_sample_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAlert('Sample Excel / CSV product template downloaded!');
  };

  const handleAddProduct = () => {
    if (!newTitle) return;
    const newProd: MasterCatalogProduct = {
      id: `mc_${Date.now()}`,
      title: newTitle,
      description: 'Master Catalog Product added by Super Admin.',
      costPrice: Number(newCostPrice),
      defaultPrice: Number(newRetailPrice),
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      sku: `SKU-360-${Math.floor(Math.random() * 1000)}`,
      category: newCategory,
      inventory: 5000,
      isStarter: true,
      createdAt: new Date().toISOString()
    };
    setCatalog(prev => [newProd, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Super Admin Topbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-md">
            360
          </div>
          <div>
            <h1 className="font-black text-lg text-slate-900">360 Dropship Super Admin Control Panel</h1>
            <p className="text-xs text-slate-500">Master Catalog (5,000+ Products), Meta & Google Ads Engine, Merchant Payouts & 5% Delivered Commission</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="text-xs text-indigo-600 hover:underline font-bold">Switch to Dropshipper Dashboard</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">Active Approved Merchants</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{approvedCount} Dropshippers</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">Master Wholesale Catalog</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">5,000+ Products</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">5% Delivered Order Commission</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">₹1,84,500</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">Pending Merchant Approvals</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingMerchants.length} Applications</div>
          </div>
        </div>

        {/* SECTION 1: PENDING MERCHANT APPROVAL & PAYOUT BANK DETAILS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Pending Dropshipper Applications & Payout Bank Details</span>
              </h3>
              <p className="text-xs text-slate-500">Review merchant onboarding details and registered bank accounts for profit payouts.</p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-full">
              Manual Verification Required
            </span>
          </div>

          {pendingMerchants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-xl">Applicant & Business</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Registered Bank Account (For Payouts)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {pendingMerchants.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{m.fullName}</div>
                        <div className="text-xs text-indigo-600 font-semibold">{m.businessName}</div>
                      </td>
                      <td className="p-4 text-xs text-slate-600">
                        <div>{m.email}</div>
                        <div className="text-slate-500">{m.phoneNumber} • {m.city}</div>
                      </td>
                      <td className="p-4 text-xs font-mono">
                        <div className="font-bold text-emerald-700">{m.bankName} ({m.bankAccountHolder})</div>
                        <div className="text-slate-600">A/C: {m.accountNumber} • IFSC: {m.ifscCode}</div>
                        <div className="text-indigo-600">UPI: {m.upiId}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Pending Approval
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleApproveMerchant(m.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve Account</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm font-semibold">
              🎉 All pending merchant onboarding applications have been approved!
            </div>
          )}
        </div>

        {/* SECTION 2: ACTIVE MERCHANT PROFIT PAYOUT SETTLEMENTS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-600" />
                <span>Active Merchant Profit Payout Transfer Queue</span>
              </h3>
              <p className="text-xs text-slate-500">Transfer order profits directly to merchant bank accounts after 5% delivered commission deduction.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900">{mockProfile.fullName} ({mockProfile.businessName})</div>
                <div className="text-xs text-slate-600 font-mono">Bank: {mockProfile.bankName} • A/C: {mockProfile.accountNumber} • IFSC: {mockProfile.ifscCode}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Net Profit Settlement Payout</div>
                <div className="text-xl font-black text-emerald-600">₹925.05</div>
              </div>
        </div>

        {/* SECTION: SUPER ADMIN GLOBAL PAYMENT GATEWAY SETTINGS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span>Super Admin Payment Gateway Credentials & UPI VPA</span>
              </h3>
              <p className="text-xs text-slate-500">Configure global payment gateway credentials and receiver UPI addresses for merchant ad wallet recharges.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-xs font-bold">
              SUPER ADMIN ONLY 🛡️
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase">Razorpay Live Key ID</label>
              <input
                type="text"
                defaultValue="rzp_live_9021839281"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase">PhonePe Merchant ID (MID)</label>
              <input
                type="text"
                defaultValue="M1092837465"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase">Platform Receiver UPI VPA</label>
              <input
                type="text"
                defaultValue="merchant360@upi"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs"
              />
            </div>
          </div>

          <button
            onClick={() => showAlert('Super Admin Payment Gateway Credentials saved & live across platform!')}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Global Payment Gateway Keys</span>
          </button>
        </div>

        {/* SECTION 3: MASTER CATALOG MANAGEMENT */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Master Wholesale Catalog Management ({catalog.length}+ Products)</h3>
              <p className="text-xs text-slate-500">Add & Bulk Upload winning products to the platform catalog at factory wholesale prices.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowExcelUploadModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                <span>Bulk Upload via Excel / CSV (.xlsx / .csv)</span>
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Single Master Product</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-xl">Product Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Wholesale Cost Price</th>
                  <th className="p-4">Recommended Retail</th>
                  <th className="p-4">Factory Inventory</th>
                  <th className="p-4 rounded-r-xl">SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {catalog.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900 flex items-center space-x-3">
                      <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                      <span>{item.title}</span>
                    </td>
                    <td className="p-4 text-xs text-indigo-600 font-bold">{item.category}</td>
                    <td className="p-4 font-black text-emerald-600">₹{item.costPrice}</td>
                    <td className="p-4 font-bold text-slate-900">₹{item.defaultPrice}</td>
                    <td className="p-4 text-xs font-bold text-slate-600">{item.inventory.toLocaleString()} units</td>
                    <td className="p-4 text-xs font-mono text-slate-500">{item.sku}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl bg-emerald-600 text-white font-semibold shadow-2xl flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* ADD MASTER PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Add Master Wholesale Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-bold uppercase">Product Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm"
                placeholder="e.g. Smart LED Lamp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-bold uppercase">Wholesale Cost (Charged to Merchant)</label>
                <input
                  type="number"
                  value={newCostPrice}
                  onChange={e => setNewCostPrice(Number(e.target.value))}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-bold uppercase">Recommended Retail Price</label>
                <input
                  type="number"
                  value={newRetailPrice}
                  onChange={e => setNewRetailPrice(Number(e.target.value))}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleAddProduct}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/20"
            >
              Add Product to Master Catalog
            </button>
          </div>
        </div>
      )}

      {/* ADMIN BULK EXCEL / CSV PRODUCT UPLOAD MODAL */}
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
                <h3 className="text-xl font-black text-slate-900">Admin Bulk Upload Master Products via Excel / CSV</h3>
                <p className="text-xs text-slate-500">Upload products in bulk using Excel (.xlsx) or Shopify CSV Export file.</p>
              </div>
            </div>

            {/* Step 1: Download Sample Excel Template */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="font-extrabold text-slate-900 text-xs">Step 1: Download Sample Format or Use Shopify Export CSV</div>
                <div className="text-[11px] text-slate-500">Auto-Detects standard CSV and Shopify CSV Export Format</div>
              </div>
              <button
                onClick={handleDownloadSampleCsv}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-300 shadow-sm flex items-center space-x-1.5 whitespace-nowrap"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Download Sample CSV</span>
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
                <div className="text-xs text-slate-400 mt-1">Supports Microsoft Excel (.xlsx), Shopify CSV Export</div>
              </div>
            </div>

            {/* Step 3: Parsed Products Preview Table */}
            {parsedExcelProducts.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase">Parsed Products ({parsedExcelProducts.length} Items Found)</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Ready to Upload to Master Catalog ✅</span>
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
                      <span>Adding Products to Master Catalog...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Upload & Commit {parsedExcelProducts.length} Products to Master Catalog</span>
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
