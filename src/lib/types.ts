export type UserRole = 'ADMIN' | 'DROPSHIPPER' | 'SUPPLIER';

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  walletBalance: number;
  walletActivated: boolean; // True after min ₹1,500+GST deposit
  onboardingStep: number;   // 1 to 5
  phoneNumber?: string;
  whatsappNumber?: string;
  businessExperience?: string;
  monthlyMarketingBudget?: string;
  createdAt: string;
}

export interface Store {
  id: string;
  merchantId: string;
  name: string;
  subdomain: string;
  customDomain?: string;
  templateId: number;        // 1 to 12
  primaryColor: string;      // e.g. #4F46E5
  secondaryColor: string;    // e.g. #06B6D4
  logoUrl?: string;
  bannerUrl?: string;
  metaPixelId?: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  createdAt: string;
}

export interface MasterCatalogProduct {
  id: string;
  title: string;
  description: string;
  defaultPrice: number;   // Recommended retail price
  costPrice: number;      // Wholesale price paid to supplier/platform
  images: string[];       // Readymade supplier images
  sku: string;
  category: string;
  inventory: number;
  isStarter: boolean;     // Included in the free 50 starter list
  createdAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  masterProductId?: string;
  title: string;
  description: string;   // Rich HTML landing page description
  price: number;         // Custom retail markup price
  costPrice: number;     // Locked wholesale cost price
  images: string[];      // Custom or readymade image URLs
  categoryName: string;
  sku: string;
  inventory: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  storeId: string;
  storeName: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  pincode: string;
  city: string;
  state: string;
  productTitle: string;
  productPrice: number;
  wholesaleCost: number;
  totalPrice: number;
  paymentMethod: 'COD' | 'PREPAID';
  status: 'PENDING' | 'VERIFIED' | 'SHIPPED' | 'DELIVERED' | 'RTO' | 'CANCELLED';
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  merchantId: string;
  amount: number;         // Base amount credited to wallet balance
  gstAmount: number;      // 18% GST paid
  totalPaid: number;      // Total amount paid via payment gateway
  type: 'RECHARGE' | 'AD_DEDUCTION' | 'ORDER_DEDUCTION' | 'AI_IMAGE_GENERATION';
  description: string;
  paymentId?: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
}

export interface MetaCampaignStats {
  id: string;
  storeId: string;
  campaignName: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  rawMetaSpend: number;      // Actual spend from Meta
  platformFee: number;       // 20% service fee charge
  totalDeductedSpend: number;// rawMetaSpend + platformFee
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  purchases: number;
  roas: number;
  lastUpdated: string;
}
