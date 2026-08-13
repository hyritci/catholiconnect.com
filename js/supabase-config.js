/* ==========================================================
   supabase-config.js — Connexion à Supabase
   ⚠️ À COMPLÉTER : remplace les valeurs ci-dessous par celles
   de TON projet Supabase (Dashboard > Project Settings > API).

   Ce fichier doit être chargé APRÈS le script Supabase
   (https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2)
   et AVANT le script de la page qui l'utilise
   (ex: intension-payment.js).
   ========================================================== */

const SUPABASE_URL = "https://ixgtbvryjeuitpzinnhb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4Z3RidnJ5amV1aXRwemlubmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NjI2NDgsImV4cCI6MjEwMjEzODY0OH0.Auo04RuFAaPeckxwLy60vl8qviC2w053TZDvg6zf2Io";

// Client Supabase réutilisable dans les autres fichiers JS.
// (on l'appelle "supabaseClient" pour ne pas entrer en conflit
// avec la variable globale "supabase" fournie par le SDK)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);