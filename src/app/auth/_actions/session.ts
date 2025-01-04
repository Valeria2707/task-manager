import { createClient } from "@/utils/supabase/server";

export default async function getUserSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
