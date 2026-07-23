import { MasterCatalogProduct, Store, Profile, Order, CommissionLedger, MetaCampaignStats, Product } from './types';

export const mockProfile: Profile = {
  id: 'usr_merchant_101',
  email: 'merchant@360dropship.in',
  fullName: 'Rahul Sharma',
  role: 'DROPSHIPPER',
  approvalStatus: 'APPROVED', // Manual Admin Approval
  commissionRate: 5,         // 5% commission on delivered orders
  securityDepositPaid: true,  // ₹1,500 advance deposit paid
  onboardingStep: 4,          // Account Approved & Store Active
  phoneNumber: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  businessName: 'Trendy Gadgets India',
  city: 'Mumbai',
  state: 'Maharashtra',
  gstNumber: '27AAAAA0000A1Z5',
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
  googleAnalyticsId: 'G-360DROPSHIP1',
  razorpayKeyId: 'rzp_live_123456789',
  createdAt: new Date().toISOString()
};

// 5,000+ Master Wholesale Catalog Products
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
    sku: 'SKU-360-FLAME-01',
    category: 'Home & Living',
    inventory: 4500,
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
    sku: 'SKU-360-EARBUDS',
    category: 'Electronics',
    inventory: 8000,
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
    sku: 'SKU-360-JUICER',
    category: 'Kitchenware',
    inventory: 3000,
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
    sku: 'SKU-360-SUNSET',
    category: 'Home & Living',
    inventory: 6000,
    isStarter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'mc_105',
    title: 'Smart Fitness Tracker Watch with AMOLED Display',
    description: 'Continuous SpO2 & Heart Rate monitoring, 100+ Sports modes, IP68 Waterproof with 14-day battery backup.',
    defaultPrice: 2999,
    costPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SKU-360-SMARTWATCH',
    category: 'Electronics',
    inventory: 12000,
    isStarter: false,
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
    sku: 'SKU-360-PILLOW',
    category: 'Healthcare',
    inventory: 5000,
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
    sku: 'SKU-360-FLAME-01',
    inventory: 4500,
    createdAt: new Date().toISOString()
  }
];

// Meta Campaigns Tracker
export const mockMetaCampaigns: MetaCampaignStats[] = [
  {
    id: 'meta_camp_101',
    storeId: 'str_101',
    campaignName: '360DS_ID_101_FlameDiffuser_Purchase_CPO',
    status: 'ACTIVE',
    rawMetaSpend: 4200.00,
    impressions: 48200,
    clicks: 1420,
    ctr: 2.94,
    cpc: 2.95,
    purchases: 32,
    roas: 3.45,
    lastUpdated: new Date().toISOString()
  }
];

// Orders List with 5% Commission Calculation on Delivered Orders
export const mockOrders: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: '#360DS-8901',
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
    platformCommission: 74.95, // 5% of 1499
    merchantNetProfit: 925.05,  // 1499 - 499 - 74.95
    paymentMethod: 'COD',
    status: 'DELIVERED',
    trackingNumber: 'DELHIVERY_892187391',
    courierName: 'Delhivery Surface',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'ord_1002',
    orderNumber: '#360DS-8902',
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
    platformCommission: 99.95, // 5% of 1999
    merchantNetProfit: 1200.05,
    paymentMethod: 'COD',
    status: 'VERIFIED',
    trackingNumber: 'SHIPROCKET_901283',
    courierName: 'BlueDart Express',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

// Commission Ledger History (5% Commission Charged Only On Delivered Orders)
export const mockCommissionLedger: CommissionLedger[] = [
  {
    id: 'comm_101',
    merchantId: 'usr_merchant_101',
    orderId: 'ord_1001',
    orderNumber: '#360DS-8901',
    totalOrderAmount: 1499.00,
    commissionPercentage: 5,
    commissionCharged: 74.95,
    merchantProfitPayout: 925.05,
    status: 'SETTLED',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];
