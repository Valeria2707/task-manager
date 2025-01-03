"use server";

import { ROUTES } from "@/constants/routes";
import { Task } from "@/types/task";
import { parseValueToBoolean } from "@/utils/parser";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateTask(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const taskId = formData.get("id")?.toString();

  if (!taskId) {
    console.warn("You don't have an ID");
    return;
  }

  const fieldsToUpdate: Partial<Task> = {};

  for (const [key, value] of formData.entries()) {
    if (key === "completed") {
      fieldsToUpdate.completed = parseValueToBoolean(String(value)) as boolean;
    } else if (key === "due_date") {
      fieldsToUpdate.due_date = new Date(String(value)).toISOString();
    } else if (key !== "id") {
      (fieldsToUpdate as Record<string, string>)[key] = String(value);
    }
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    console.warn("No fields to update");
    return;
  }

  const { error } = await supabase
    .from("tasks")
    .update(fieldsToUpdate)
    .eq("id", taskId);

  if (error) {
    console.error("Failed to update the task:", error.message);
    throw new Error(error.message);
  }

  revalidatePath(ROUTES.tasks);
  redirect(ROUTES.tasks);
}
