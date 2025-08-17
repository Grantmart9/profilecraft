import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and key from the existing supabase.js file
import { SUPABASE_URL, SUPABASE_API_KEY } from '../supabase';

// Create a single supabase client for client-side operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);