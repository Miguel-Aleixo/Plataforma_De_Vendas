import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveOrder(orderId: string, email: string, nome: string) {
  const { error } = await supabase
    .from("orders")
    .insert([{ order_id: orderId, email, nome }]);
  if (error) throw error;
}

export async function getEmailFromOrderId(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("email")
    .eq("order_id", orderId)
    .single();
  if (error || !data) return null;
  return data.email;
}
