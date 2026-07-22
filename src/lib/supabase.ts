import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hahpnlrakaadwytdeelk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_3Jt6IWswpw_nFZKwSLmbJg_touNpOUw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
