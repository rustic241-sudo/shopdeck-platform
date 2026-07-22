-- ========================================================
-- SHOPDECK CLONE: FULL SUPABASE POSTGRESQL DATABASE SCHEMA
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Extending default Supabase auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'DROPSHIPPER', -- ADMIN, DROPSHIPPER, SUPPLIER
    wallet_balance NUMERIC(10, 2) DEFAULT 0.00,
    wallet_activated BOOLEAN DEFAULT FALSE, -- Set to TRUE once merchant deposits min ₹1,500 + GST
    
    -- Onboarding Checklist & Details
    onboarding_step INT DEFAULT 1,         -- Track current active onboarding step (1 to 5)
    phone_number VARCHAR(50),
    whatsapp_number VARCHAR(50),
    business_experience VARCHAR(255),
    monthly_marketing_budget VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. STORES TABLE (Shopify-like multi-tenant configuration)
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(255) UNIQUE NOT NULL,
    custom_domain VARCHAR(255) UNIQUE,
    
    -- Design & Theme settings
    template_id INT DEFAULT 1,          -- 1 to 12 store template selections
    primary_color VARCHAR(50) DEFAULT '#6366F1',
    secondary_color VARCHAR(50) DEFAULT '#EC4899',
    logo_url TEXT,
    banner_url TEXT,
    
    -- Storefront Settings
    meta_pixel_id VARCHAR(100),
    razorpay_key_id VARCHAR(255),
    razorpay_key_secret VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. MASTER CATALOG TABLE (2000-3000 Admin products, gated access system)
CREATE TABLE IF NOT EXISTS public.master_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    default_price NUMERIC(10, 2) NOT NULL,    -- Recommended retail price
    cost_price NUMERIC(10, 2) NOT NULL,       -- Wholesale price paid to supplier/platform
    images TEXT[],                            -- High quality supplier images
    sku VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,           -- Master category (Electronics, Fashion, etc.)
    inventory INT DEFAULT 500,
    is_starter BOOLEAN DEFAULT FALSE,          -- If TRUE, product is included in the free 50 starter list
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. STORE CATEGORIES (Merchant's dynamic collections)
CREATE TABLE IF NOT EXISTS public.store_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    UNIQUE(store_id, slug)
);

-- 5. PRODUCTS TABLE (Merchant's imported and customized products)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    master_product_id UUID REFERENCES public.master_catalog(id) ON DELETE SET NULL,
    
    -- Customizations by merchant
    title VARCHAR(255) NOT NULL,
    description TEXT,                        -- Rich HTML landing page description
    price NUMERIC(10, 2) NOT NULL,            -- Custom retail markup price
    cost_price NUMERIC(10, 2) NOT NULL,       -- Locked wholesale cost price
    images TEXT[],                            -- Custom unique images uploaded by merchant
    category_id UUID REFERENCES public.store_categories(id) ON DELETE SET NULL,
    sku VARCHAR(100) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(store_id, sku)
);

-- 6. META ADS CREDENTIALS & CAMPAIGNS
CREATE TABLE IF NOT EXISTS public.meta_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    fb_access_token TEXT NOT NULL,
    fb_ad_account_id VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. WALLET TRANSACTIONS TABLE (GST & Recharge Ledger)
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,          -- Net base amount credited to wallet
    gst_amount NUMERIC(10, 2) NOT NULL,      -- 18% GST amount charged
    total_paid NUMERIC(10, 2) NOT NULL,      -- Total payment processed via PG (Base + GST)
    type VARCHAR(50) DEFAULT 'RECHARGE',     -- RECHARGE, AD_DEDUCTION, ORDER_DEDUCTION, AI_IMAGE_GENERATION
    description TEXT,
    payment_id VARCHAR(255),                 -- Razorpay Payment ID
    status VARCHAR(50) DEFAULT 'SUCCESS',    -- PENDING, SUCCESS, FAILED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    shipping_address TEXT NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'COD', -- COD or PREPAID
    status VARCHAR(50) DEFAULT 'PENDING',       -- PENDING, VERIFIED, SHIPPED, DELIVERED, RTO, CANCELLED
    tracking_number VARCHAR(100),
    courier_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
