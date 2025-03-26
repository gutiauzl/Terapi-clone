import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

// Create a singleton instance of the Supabase client
let supabaseInstance: SupabaseClient | null = null;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  supabaseInstance = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  return supabaseInstance;
};
