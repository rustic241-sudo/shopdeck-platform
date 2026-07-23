export type UserRole = 'ADMIN' | 'DROPSHIPPER' | 'SUPPLIER';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  approvalStatus: ApprovalStatus; // Manual Admin Approval
  commissionRate: number;        // 5% commission on delivered orders
  securityDepositPaid: boolean;  // ₹1,500 advance deposit
  onboardingStep: number;        // 1 to 4
  phoneNumber?: string;
  whatsappNumber?: string;
  businessName?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  panNumber?: string;
  // Merchant Bank Payout Details
  bankAccountHolder?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
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
  googleAnalyticsId?: string;// Google Analytics integration
  razorpayKeyId?: string;
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
  isStarter: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  masterProductId?: string;
  title: string;
  description: string;   // Rich HTML landing page description
  price: number;         // Custom retail markup price
  costPrice: number;     // Wholesale cost price
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
  platformCommission: number; // 5% of totalPrice on DELIVERED orders
  merchantNetProfit: number;   // (totalPrice - wholesaleCost - platformCommission)
  paymentMethod: 'COD' | 'PREPAID';
  status: 'PENDING' | 'VERIFIED' | 'SHIPPED' | 'DELIVERED' | 'RTO' | 'CANCELLED';
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
}

export interface CommissionLedger {
  id: string;
  merchantId: string;
  orderId: string;
  orderNumber: string;
  totalOrderAmount: number;
  commissionPercentage: number; // 5%
  commissionCharged: number;     // 5% of order amount
  merchantProfitPayout: number;  // Profit paid to merchant bank
  status: 'SETTLED' | 'PENDING';
  createdAt: string;
}

export interface MetaCampaignStats {
  id: string;
  storeId: string;
  campaignName: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  rawMetaSpend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  purchases: number;
  roas: number;
  lastUpdated: string;
}
