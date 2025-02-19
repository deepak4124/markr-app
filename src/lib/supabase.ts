import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch Notes
export async function getNotes() {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) throw error;
  return data || []; // Ensure it always returns an array
}

// Add Note
export async function addNote(title: string, content: string) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content }])
    .select("*");
  if (error) throw error;
  return data || []; // Ensure it always returns an array
}

// Delete Note
export async function deleteNote(id: number) {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw error;
}
