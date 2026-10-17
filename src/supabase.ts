import { createClient } from '@supabase/supabase-js'

// Sustituye estos valores por los de tu proyecto de Supabase
// (Los encuentras en el panel de Supabase -> Project Settings -> API)
const SUPABASE_URL = 'https://duwquxulzqowyuknvbqu.supabase.co/rest/v1/'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1d3F1eHVsenFvd3l1a252YnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDkyODcsImV4cCI6MjEwNzgyNTI4N30.HyQu4RDPBIx_F45JCFxMT-VL4XSi1kS5wzFb1VM49L0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)