import { MasterCatalogProduct, Store, Profile, Order, WalletTransaction, MetaCampaignStats, Product } from './types';

export const mockProfile: Profile = {
  id: 'usr_merchant_101',
  email: 'merchant@shopdeck.in',
  fullName: 'Rahul Sharma',
  role: 'DROPSHIPPER',
  walletBalance: 0.00, // Starts at 0 until first recharge
  walletActivated: false, // Locked until first deposit (min ₹1,500 + 18% GST)
  onboardingStep: 3, // Currently at step 3 (Style Store Theme)
  phoneNumber: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  businessExperience: 'E-commerce beginner / Facebook Ads enthusiast',
  monthlyMarketingBudget: '₹10,000 - ₹25,000',
  createdAt: new Date().toISOString()
};

export const mockStore: Store = {
  id: 'str_101',
  merchantId: 'usr_merchant_101',
  name: 'Trendy Gadgets & Lifestyle',
  subdomain: 'trendygadgets',
  customDomain: 'trendygadgets.in',
  templateId: 1, // Store template choice (1 to 12)
  primaryColor: '#6366F1', // Sleek Indigo
  secondaryColor: '#EC4899', // Vibrant Pink Accent
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  metaPixelId: '109283749201928',
  razorpayKeyId: 'rzp_live_123456789',
  razorpayKeySecret: 'secret_key_abcdef',
  createdAt: new Date().toISOString()
};

// 50 Starter Products + Premium Master Catalog Products
export const mockMasterCatalog: MasterCatalogProduct[] = [
  {
    id: 'mc_101',
    title: 'Wireless Flame Diffuser & Humidifier LED',
    description: 'Create an ambient relaxing flame effect with ultrasonic mist technology. Premium noise-free operation with essential oil tray.',
    defaultPrice: 1499,
    costPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-FLAME-01',
    category: 'Home & Living',
    inventory: 450,
    isStarter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'mc_102',
    title: 'Pro ANC Wireless Earbuds with Touch Display',
    description: 'Active Noise Cancellation up to 35dB with smart LCD touch display on charging case. 40 hours battery life with fast charging.',
    defaultPrice: 1999,
    costPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-EARBUDS-ANC',
    category: 'Electronics',
    inventory: 800,
    isStarter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'mc_103',
    title: 'Portable Rechargeable Mini Blender Juicer',
    description: '6 Stainless Steel blades with 4000mAh battery. Make fresh smoothies and protein shakes on the go in 30 seconds.',
    defaultPrice: 1299,
    costPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1570288685369-f7305163d0e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-JUICER-MINI',
    category: 'Kitchenware',
    inventory: 300,
    isStarter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'mc_104',
    title: 'Magnetic Sunset Lamp Projector 360°',
    description: 'Transform your room with golden hour sunset vibes. USB powered with HD optical glass lens for aesthetic reel creators.',
    defaultPrice: 899,
    costPrice: 249,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-SUNSET-LAMP',
    category: 'Home & Living',
    inventory: 600,
    isStarter: true,
    createdAt: new Date().toISOString()
  },
  // Locked Premium Products (Unlocked when wallet_activated = true)
  {
    id: 'mc_105',
    title: 'Smart Fitness Tracker Watch with AMOLED Display',
    description: 'Continuous SpO2 & Heart Rate monitoring, 100+ Sports modes, IP68 Waterproof with 14-day battery backup.',
    defaultPrice: 2999,
    costPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-SMARTWATCH-PRO',
    category: 'Electronics',
    inventory: 1200,
    isStarter: false, // Locked until first wallet deposit!
    createdAt: new Date().toISOString()
  },
  {
    id: 'mc_106',
    title: 'Ergonomic Cervical Contour Neck Pillow',
    description: 'Memory foam neck pain relief pillow designed for back, side, and stomach sleepers. Breathable bamboo fabric cover.',
    defaultPrice: 1799,
    costPrice: 550,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-MEMORY-PILLOW',
    category: 'Healthcare',
    inventory: 500,
    isStarter: false,
    createdAt: new Date().toISOString()
  }
];

// Imported Products in Merchant's Store
export const mockMerchantProducts: Product[] = [
  {
    id: 'prod_101',
    storeId: 'str_101',
    masterProductId: 'mc_101',
    title: 'Flame Aura Ultrasonic Mist Diffuser',
    description: `
      <div class="space-y-6 text-slate-800">
        <h2 class="text-2xl font-bold text-slate-900">Transform Your Living Space With Ambient Warmth</h2>
        <p class="text-lg leading-relaxed text-slate-600">The Flame Aura Ultrasonic Diffuser combines gentle mist technology with LED flame lighting to give you a real fireside feel without any heat or smoke hazard.</p>
        
        <div class="my-6 overflow-hidden rounded-2xl shadow-xl">
          <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80" alt="Flame Diffuser Demo" class="w-full h-auto object-cover" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 class="font-semibold text-indigo-900 text-lg">🔥 Real Flame Visual Effect</h4>
            <p class="text-sm text-indigo-700 mt-1">Smart LED lights combined with mist stream create a breathtaking flame visual.</p>
          </div>
          <div class="p-4 bg-pink-50 rounded-xl border border-pink-100">
            <h4 class="font-semibold text-pink-900 text-lg">🌿 Essential Oil Aromatherapy</h4>
            <p class="text-sm text-pink-700 mt-1">Add 2-3 drops of your favorite lavender or eucalyptus oil for instant stress relief.</p>
          </div>
        </div>
      </div>
    `,
    price: 1499,
    costPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80'
    ],
    categoryName: 'Home & Living',
    sku: 'SKU-FLAME-01',
    inventory: 450,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_102',
    storeId: 'str_101',
    masterProductId: 'mc_102',
    title: 'SoundX Pro Touch ANC Wireless Earbuds',
    description: `
      <div class="space-y-4">
        <h3 class="text-xl font-bold">Silence The Noise. Feel The Bass.</h3>
        <p class="text-slate-600">Equipped with 35dB Active Noise Cancellation and a futuristic smart LCD touch screen right on the battery case.</p>
        <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80" class="rounded-xl w-full" />
      </div>
    `,
    price: 1999,
    costPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    categoryName: 'Electronics',
    sku: 'SKU-EARBUDS-ANC',
    inventory: 800,
    createdAt: new Date().toISOString()
  }
];

// Meta Campaigns with 20% Service Fee Calculation
export const mockMetaCampaigns: MetaCampaignStats[] = [
  {
    id: 'meta_camp_101',
    storeId: 'str_101',
    campaignName: 'Shopdeck_ID_101_FlameDiffuser_Purchase_CPO',
    status: 'ACTIVE',
    rawMetaSpend: 4200.00,       // Meta spend
    platformFee: 840.00,         // 20% platform charge
    totalDeductedSpend: 5040.00, // Total deducted from merchant wallet
    impressions: 48200,
    clicks: 1420,
    ctr: 2.94,
    cpc: 2.95,
    purchases: 32,
    roas: 3.45,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'meta_camp_102',
    storeId: 'str_101',
    campaignName: 'Shopdeck_ID_101_ANC_Earbuds_Retargeting',
    status: 'PAUSED',
    rawMetaSpend: 1500.00,
    platformFee: 300.00,
    totalDeductedSpend: 1800.00,
    impressions: 18400,
    clicks: 560,
    ctr: 3.04,
    cpc: 2.67,
    purchases: 11,
    roas: 2.80,
    lastUpdated: new Date().toISOString()
  }
];

// Orders List
export const mockOrders: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: '#SD-8901',
    storeId: 'str_101',
    storeName: 'Trendy Gadgets',
    customerName: 'Amit Varma',
    customerPhone: '+91 98111 22334',
    shippingAddress: 'Flat 402, Sunshine Heights, MG Road',
    pincode: '400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    productTitle: 'Flame Aura Ultrasonic Mist Diffuser',
    productPrice: 1499,
    wholesaleCost: 499,
    totalPrice: 1499,
    paymentMethod: 'COD',
    status: 'SHIPPED',
    trackingNumber: 'DELHIVERY_892187391',
    courierName: 'Delhivery Surface',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'ord_1002',
    orderNumber: '#SD-8902',
    storeId: 'str_101',
    storeName: 'Trendy Gadgets',
    customerName: 'Priya Singh',
    customerPhone: '+91 97222 33445',
    shippingAddress: 'H-12, Sector 62, Near Metro Station',
    pincode: '201301',
    city: 'Noida',
    state: 'Uttar Pradesh',
    productTitle: 'SoundX Pro Touch ANC Wireless Earbuds',
    productPrice: 1999,
    wholesaleCost: 699,
    totalPrice: 1999,
    paymentMethod: 'COD',
    status: 'VERIFIED',
    trackingNumber: 'SHIPROCKET_901283',
    courierName: 'BlueDart Express',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

// Wallet Ledger History
export const mockWalletTransactions: WalletTransaction[] = [
  {
    id: 'tx_101',
    merchantId: 'usr_merchant_101',
    amount: 1500.00,
    gstAmount: 270.00,      // 18% GST
    totalPaid: 1770.00,      // 1st recharge ₹1,500 + GST
    type: 'RECHARGE',
    description: 'First Time Wallet Activation Recharge (₹1500 Base + ₹270 GST)',
    paymentId: 'pay_Lzk918237',
    status: 'SUCCESS',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'tx_102',
    merchantId: 'usr_merchant_101',
    amount: 120.00,
    gstAmount: 0.00,
    totalPaid: 120.00,
    type: 'AD_DEDUCTION',
    description: 'Daily Meta Ad Spend (Spend: ₹100 + 20% Service Fee: ₹20)',
    status: 'SUCCESS',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];
