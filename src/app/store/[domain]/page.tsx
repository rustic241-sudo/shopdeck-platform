'use client';

import React, { useState } from 'react';
import { mockStore, mockMerchantProducts } from '@/lib/mockData';
import { Product } from '@/lib/types';
import { ShoppingBag, ShieldCheck, Truck, Clock, CheckCircle2, Sparkles, Star, ChevronRight } from 'lucide-react';

export default function StorefrontPage() {
  const store = mockStore;
  const products = mockMerchantProducts;

  // Selected product for 1-Click Fast COD Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [orderSuccess, setOrderSuccess] = useState(false);

  // Auto-fill city & state based on pincode
  const handlePincodeChange = (pin: string) => {
    setCustomerPincode(pin);
    if (pin.length === 6) {
      if (pin.startsWith('4')) { setCity('Mumbai'); setState('Maharashtra'); }
      else if (pin.startsWith('1')) { setCity('New Delhi'); setState('Delhi'); }
      else if (pin.startsWith('2')) { setCity('Noida'); setState('Uttar Pradesh'); }
      else if (pin.startsWith('5')) { setCity('Hyderabad'); setState('Telangana'); }
      else { setCity('Bangalore'); setState('Karnataka'); }
    }
  };

  const handlePlaceCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerPincode) return;
    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Banner Bar */}
      <div 
        className="py-2.5 text-center text-xs font-bold text-white px-4 flex items-center justify-center space-x-2"
        style={{ backgroundColor: store.primaryColor }}
      >
        <Truck className="w-4 h-4" />
        <span>FREE SHIPPING ON ALL ORDERS TODAY • CASH ON DELIVERY AVAILABLE</span>
      </div>

      {/* Store Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {store.logoUrl ? (
              <img src={store.logoUrl} alt={store.name} className="w-10 h-10 rounded-xl object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xl flex items-center justify-center">
                {store.name.charAt(0)}
              </div>
            )}
            <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">{store.name}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Verified Store
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-16 px-6">
        <div className="absolute inset-0 opacity-40">
          <img src={store.bannerUrl} alt="Hero Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-amber-300 border border-white/20">
            Exclusive Deals Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Upgrade Your Lifestyle Today</h2>
          <p className="text-slate-200 text-base max-w-xl mx-auto">Discover trending innovative products with premium quality guarantee & 1-click Cash on Delivery checkout.</p>
        </div>
      </div>

      {/* Product Catalog Showcase */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Featured Products</h3>
            <p className="text-sm text-slate-500">Best-selling items in stock & ready for dispatch.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
              <div className="h-64 relative bg-slate-100 overflow-hidden group">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  BESTSELLER
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 text-xs mb-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                    <span className="text-slate-400 font-semibold ml-1 text-[11px]">(128 Reviews)</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg line-clamp-1">{product.title}</h4>
                  <div className="mt-2 text-2xl font-black text-slate-900 flex items-baseline gap-2">
                    <span>₹{product.price}</span>
                    <span className="text-sm font-normal text-slate-400 line-through">₹{product.price * 2}</span>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">50% OFF</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(product)}
                  style={{ backgroundColor: store.primaryColor }}
                  className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now - 1-Click COD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-CLICK COD CHECKOUT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {!orderSuccess ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                      <img src={selectedProduct.images[0]} alt={selectedProduct.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{selectedProduct.title}</h4>
                      <div className="text-base font-black text-indigo-600">Total Amount: ₹{selectedProduct.price}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="text-slate-400 font-bold hover:text-slate-900">✕</button>
                </div>

                <form onSubmit={handlePlaceCodOrder} className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pay Cash on Delivery when item arrives at your doorstep!</span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 font-extrabold uppercase">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                      placeholder="e.g. Rahul Varma"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 font-extrabold uppercase">Mobile Phone Number (For Order Tracking) *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 font-extrabold uppercase">Complete Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={e => setCustomerAddress(e.target.value)}
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                      placeholder="House/Flat No., Building Name, Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-700 font-extrabold uppercase">Pincode *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={customerPincode}
                        onChange={e => handlePincodeChange(e.target.value)}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                        placeholder="6 Digits"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-700 font-extrabold uppercase">City / State</label>
                      <input
                        type="text"
                        disabled
                        value={city ? `${city}, ${state}` : 'Auto-filled'}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 font-semibold text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: store.primaryColor }}
                    className="w-full py-4 rounded-2xl text-white font-black text-base shadow-xl hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>PLACE COD ORDER - ₹{selectedProduct.price}</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Order Placed Successfully! 🎉</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">Thank you, <strong>{customerName}</strong>. You will receive a WhatsApp confirmation link shortly on <strong>{customerPhone}</strong>.</p>

                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
