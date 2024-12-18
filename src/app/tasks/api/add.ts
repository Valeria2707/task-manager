"use server";

import { ROUTES } from "@/constants/routes";
import { PRIORITY } from "@/constants/tasks";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function addTask(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const taskData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    due_date: formData.get("due_date")
      ? new Date(formData.get("due_date")!.toString()).toISOString()
      : null,
    priority: formData.get("priority")?.toString() || PRIORITY.P4,
    completed: Boolean(formData.get("completed")),
  };

  const { error } = await supabase.from("tasks").insert([taskData]).select();

  if (error) throw new Error(error.message);

  revalidatePath(ROUTES.tasks);

  redirect(ROUTES.tasks);
}
