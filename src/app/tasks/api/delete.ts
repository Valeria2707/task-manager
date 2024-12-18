"use server";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteTask(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const taskId = formData.get("id")?.toString();

  if (!taskId) console.warn("you don't have id");

  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(ROUTES.tasks);

  redirect(ROUTES.tasks);
}
