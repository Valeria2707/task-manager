import { SearchParams } from "@/types/params";
import TaskList from "@/components/task/TaskList";
import TaskFilter from "@/components/task/TaskFilter";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import getUserSession from "../auth/_actions/session";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const session = await getUserSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  return (
    <div className="flex flex-col items-center min-h-screen space-y-10">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Task Manager
      </h1>
      <div className="w-full max-w-[800px] bg-white rounded-lg p-[20px] md:p-[30px] shadow-md space-y-10">
        <TaskFilter searchParams={searchParams} />
        <TaskList searchParams={searchParams} />
      </div>
      <Link href={ROUTES.createTask} className="btn w-[200px] px-4 py-2">
        Create a new todo
      </Link>
    </div>
  );
}
