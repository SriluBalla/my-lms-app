import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmolfbwomxhhxxduufmo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb2xmYndvbXhoaHh4ZHV1Zm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTY2MzAsImV4cCI6MjA2MjczMjYzMH0.zPVfvMYdgtTj_8ZrrMqMfTCOaubmkvTLdn8HMmB89Jk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// NEXT_PUBLIC_SUPABASE_URL=https://nmolfbwomxhhxxduufmo.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb2xmYndvbXhoaHh4ZHV1Zm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTY2MzAsImV4cCI6MjA2MjczMjYzMH0.zPVfvMYdgtTj_8ZrrMqMfTCOaubmkvTLdn8HMmB89Jk
            