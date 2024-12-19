import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  p-6">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">Task Manager</h1>
      <p className="text-lg text-gray-700 mb-10 text-center">
        A simple yet powerful tool to manage your daily tasks and boost your
        productivity.
      </p>
      <div className="flex gap-6">
        <Link href={ROUTES.tasks} className="inline-block w-44 px-5 py-3 btn">
          Go to Tasks
        </Link>
      </div>
    </div>
  );
}
