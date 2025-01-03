import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function getUserSession() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getSession();
  return data.session;
}
