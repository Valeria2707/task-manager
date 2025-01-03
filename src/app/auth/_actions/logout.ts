"use server";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect(ROUTES.home);
}
