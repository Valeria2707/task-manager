import getUserSession from "@/app/auth/_actions/session";
import TaskForm from "@/components/task/TaskForm";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getUserSession();

  if (!session) {
    redirect(ROUTES.login);
  }
  return (
    <div>
      <Link
        href={ROUTES.tasks}
        className="absolute left-4 top-5 bg-gray-800 text-white flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700 transition-colors"
      >
        ←
      </Link>
      <div className="mt-5 p-6 bg-white rounded-2xl shadow-2xl max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          Add Task
        </h2>
        <TaskForm />
      </div>
    </div>
  );
}
