import { createClient } from "@supabase/supabase-js";

//IT IS OKAY TO SHARE THIS DUE TO SUPABASE USING RLS
const supabaseUrl = "https://barpzdtourneyemztasq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcnB6ZHRvdXJuZXllbXp0YXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NDk5NzIsImV4cCI6MjAyMTAyNTk3Mn0.63-piEq843hyyUVNDwwzrnndERVw4Ric1zC3Yl5ET7E";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
