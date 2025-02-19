import { createClient } from "@supabase/supabase-js";

// Detect if running inside Electron
const isElectron =
  typeof window !== "undefined" &&
  !!window.navigator.userAgent.includes("Electron");
console.log("Running in Electron:", isElectron);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables!");
}

// Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch Notes
export async function getNotes() {
  try {
    const { data, error } = await supabase.from("notes").select("*");
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching notes:", err);
    return [];
  }
}

// Add Note
export async function addNote(title: string, content: string) {
  try {
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content }]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error adding note:", err);
    return null;
  }
}
