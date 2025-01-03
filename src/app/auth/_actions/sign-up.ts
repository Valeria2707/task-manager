"use server";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function signUp(formData: FormData) {
  const supabase = await createClient();

  const taskData = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const { error } = await supabase.auth.signUp(taskData);

  if (error) {
    return { error: error.message };
  }

  redirect(ROUTES.tasks);
}
