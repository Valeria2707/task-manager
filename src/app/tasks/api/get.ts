"use server";

import { PRIORITY, SORT_BY } from "@/constants/tasks";
import { SearchParams } from "@/types/params";
import { Task } from "@/types/task";
import { formatDate, isValidDate } from "@/utils/date";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function getTask(searchParams: SearchParams) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from("tasks")
    .select()
    .order("completed", { ascending: true })
    .order(searchParams.sortBy || SORT_BY.PRIORITY, { ascending: true });

  if (searchParams.priority && searchParams.priority !== PRIORITY.ANY) {
    query = query.eq("priority", searchParams.priority);
  }

  if (isValidDate(searchParams.due_date)) {
    const formattedDate = formatDate(new Date(searchParams.due_date!));
    query = query.eq("due_date", formattedDate);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { data: data as Task[] };
}
