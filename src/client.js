import { createClient } from '@supabase/supabase-js'

// Supabase needs the base project URL only. Do NOT add /creators here.
// The table is selected later with supabase.from('creators').
const URL = import.meta.env.VITE_SUPABASE_URL || 'https://lssykrrtlmrfrbvwbqpn.supabase.co'
const API_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_KEY ||
  'sb_publishable_EWfhR2FfR6uX08HrJ-usPQ_vBEjPSOP'

export const supabase = createClient(URL, API_KEY)
