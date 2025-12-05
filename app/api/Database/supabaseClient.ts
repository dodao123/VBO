// app/api/Database/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Lấy thông tin từ environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Kiểm tra xem các biến môi trường có tồn tại không
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Export kiểu dữ liệu nếu bạn sử dụng TypeScript với Supabase
export type SupabaseClient = typeof supabase;

