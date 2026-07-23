'use client';

import React, { useState } from 'react';
import { mockMasterCatalog, mockProfile, mockStore, mockOrders } from '@/lib/mockData';
import { MasterCatalogProduct } from '@/lib/types';
import { ShieldCheck, Plus, Package, Users, DollarSign, Layers, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [catalog, setCatalog] = useState<MasterCatalogProduct[]>(mockMasterCatalog);
  const [newTitle, setNewTitle] = useState('');
  const [newCostPrice, setNewCostPrice] = useState(499);
  const [newRetailPrice, setNewRetailPrice] = useState(1499);
  const [newCategory, setNewCategory] = useState('Electronics');
  const [isStarter, setIsStarter] = useState(true);
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
      sku: `SKU-ADMIN-${Math.floor(Math.random() * 1000)}`,
      category: newCategory,
      inventory: 500,
      isStarter: isStarter,
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
            SA
          </div>
          <div>
            <h1 className="font-black text-lg text-white">360 Dropship Super Admin Control Panel</h1>
            <p className="text-xs text-slate-400">Master Catalog (2000+ Products), Platform Wallet Balances & Profit Accounting</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="text-xs text-indigo-400 hover:underline font-bold">Switch to Dropshipper Dashboard</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Total Active Merchants</div>
            <div className="text-2xl font-black text-white mt-1">1,240 Dropshippers</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Master Products Count</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">2,450 Products</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Platform Ad Fee Revenue (20%)</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹1,14,000</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase">Total GST Collected (18%)</div>
            <div className="text-2xl font-black text-purple-400 mt-1">₹54,200</div>
          </div>
        </div>

        {/* Catalog Table */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-white">Master Wholesale Catalog Management</h3>
              <p className="text-xs text-slate-400">Add winning products to the platform catalog. Mark them as 50 Free Starter or 2000+ Premium Locked.</p>
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
                  <th className="p-4">Access Tier</th>
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
                    <td className="p-4">
                      {item.isStarter ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                          Free 50 Starter
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Locked Premium (Recharge Required)
                        </span>
                      )}
                    </td>
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

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="starterCheck"
                checked={isStarter}
                onChange={e => setIsStarter(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-indigo-600"
              />
              <label htmlFor="starterCheck" className="text-xs text-slate-300 font-bold">Include in Free 50 Starter List (Unlocked for all new signups)</label>
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
