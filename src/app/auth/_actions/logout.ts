"use server";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect(ROUTES.home);
}
