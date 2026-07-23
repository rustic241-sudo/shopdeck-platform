'use client';

import React, { useState } from 'react';
import { mockMasterCatalog, mockProfile, mockStore, mockOrders } from '@/lib/mockData';
import { MasterCatalogProduct, Profile } from '@/lib/types';
import { ShieldCheck, Plus, Package, Users, DollarSign, Layers, CheckCircle2, TrendingUp, Sparkles, Clock, Check, X, Landmark, CreditCard } from 'lucide-react';

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

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newCostPrice, setNewCostPrice] = useState(499);
  const [newRetailPrice, setNewRetailPrice] = useState(1499);
  const [newCategory, setNewCategory] = useState('Electronics');
  const [showAddModal, setShowAddModal] = useState(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Super Admin Topbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg">
            360
          </div>
          <div>
            <h1 className="font-black text-lg text-white">360 Dropship Super Admin Control Panel</h1>
            <p className="text-xs text-slate-400">Master Catalog (5,000+ Products), Merchant Payouts & 5% Delivered Commission</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="text-xs text-indigo-400 hover:underline font-bold">Switch to Dropshipper Dashboard</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Active Approved Merchants</div>
            <div className="text-2xl font-black text-white mt-1">{approvedCount} Dropshippers</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Master Wholesale Catalog</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">5,000+ Products</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">5% Delivered Order Commission</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹1,84,500</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Pending Merchant Approvals</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{pendingMerchants.length} Applications</div>
          </div>
        </div>

        {/* SECTION 1: PENDING MERCHANT APPROVAL & PAYOUT BANK DETAILS */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Pending Dropshipper Applications & Payout Bank Details</span>
              </h3>
              <p className="text-xs text-slate-400">Review merchant onboarding details and registered bank accounts for profit payouts.</p>
            </div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-full">
              Manual Verification Required
            </span>
          </div>

          {pendingMerchants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-xl">Applicant & Business</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Registered Bank Account (For Payouts)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {pendingMerchants.map(m => (
                    <tr key={m.id} className="hover:bg-slate-800/40">
                      <td className="p-4">
                        <div className="font-bold text-white">{m.fullName}</div>
                        <div className="text-xs text-indigo-400 font-semibold">{m.businessName}</div>
                      </td>
                      <td className="p-4 text-xs text-slate-300">
                        <div>{m.email}</div>
                        <div className="text-slate-400">{m.phoneNumber} • {m.city}</div>
                      </td>
                      <td className="p-4 text-xs font-mono">
                        <div className="font-bold text-emerald-400">{m.bankName} ({m.bankAccountHolder})</div>
                        <div className="text-slate-300">A/C: {m.accountNumber} • IFSC: {m.ifscCode}</div>
                        <div className="text-indigo-400">UPI: {m.upiId}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Pending Approval
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleApproveMerchant(m.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
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
            <div className="p-8 text-center text-slate-400 text-sm font-semibold">
              🎉 All pending merchant onboarding applications have been approved!
            </div>
          )}
        </div>

        {/* SECTION 2: ACTIVE MERCHANT PROFIT PAYOUT SETTLEMENTS */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-400" />
                <span>Active Merchant Profit Payout Transfer Queue</span>
              </h3>
              <p className="text-xs text-slate-400">Transfer order profits directly to merchant bank accounts after 5% delivered commission deduction.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-white">{mockProfile.fullName} ({mockProfile.businessName})</div>
                <div className="text-xs text-slate-300 font-mono">Bank: {mockProfile.bankName} • A/C: {mockProfile.accountNumber} • IFSC: {mockProfile.ifscCode}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Net Profit Settlement Payout</div>
                <div className="text-xl font-black text-emerald-400">₹925.05</div>
              </div>
              <button
                onClick={() => alert('Payout of ₹925.05 transferred via IMPS/NEFT to HDFC Bank A/C 50100293849182!')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Send Bank Transfer Payout
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: MASTER CATALOG MANAGEMENT */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-white">Master Wholesale Catalog Management (5,000+ Products)</h3>
              <p className="text-xs text-slate-400">Add winning products to the platform catalog at factory wholesale prices.</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Master Product</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-xl">Product Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Wholesale Cost Price</th>
                  <th className="p-4">Recommended Retail</th>
                  <th className="p-4">Factory Inventory</th>
                  <th className="p-4 rounded-r-xl">SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {catalog.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white flex items-center space-x-3">
                      <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                      <span>{item.title}</span>
                    </td>
                    <td className="p-4 text-xs text-indigo-400 font-bold">{item.category}</td>
                    <td className="p-4 font-black text-emerald-400">₹{item.costPrice}</td>
                    <td className="p-4 font-bold text-white">₹{item.defaultPrice}</td>
                    <td className="p-4 text-xs font-bold text-slate-300">{item.inventory.toLocaleString()} units</td>
                    <td className="p-4 text-xs font-mono text-slate-400">{item.sku}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD MASTER PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white">Add Master Wholesale Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold uppercase">Product Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                placeholder="e.g. Smart LED Lamp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Wholesale Cost (Charged to Merchant)</label>
                <input
                  type="number"
                  value={newCostPrice}
                  onChange={e => setNewCostPrice(Number(e.target.value))}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Recommended Retail Price</label>
                <input
                  type="number"
                  value={newRetailPrice}
                  onChange={e => setNewRetailPrice(Number(e.target.value))}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleAddProduct}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30"
            >
              Add Product to Master Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
