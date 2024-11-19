import { createClient } from '@supabase/supabase-js';

// Informações do Supabase
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criando o cliente
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
