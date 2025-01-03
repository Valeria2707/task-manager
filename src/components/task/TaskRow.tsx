"use client";

import { Task } from "@/types/task";
import { getPriorityClass } from "@/utils/style";
import { AccordionTrigger } from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import updateTask from "@/app/tasks/_actions/update";
import { useState } from "react";

type Props = {
  task: Task;
};

export default function TaskRow({ task }: Props) {
  const [isCompleted, setIsCompleted] = useState(task.completed ?? false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked);

    const formData = new FormData();
    formData.append("id", task.id);
    formData.append("completed", checked.toString());

    updateTask(formData).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="flex items-center gap-7 px-4 py-2">
      <form className="flex items-center">
        <Checkbox
          id={`checkbox-${task.id}`}
          checked={isCompleted}
          onCheckedChange={handleCheckboxChange}
          className="rounded border-gray-300 focus:ring-gray-400"
        />
      </form>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
        <p
          className={`text-lg font-semibold text-gray-800 ${
            isCompleted ? "line-through text-gray-800" : ""
          }`}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">{task.due_date}</div>
          <div
            className={`text-sm font-medium px-2 py-1 rounded-lg ${getPriorityClass(
              task.priority
            )}`}
          >
            {task.priority}
          </div>
        </div>
      </div>
      <AccordionTrigger className="ml-auto" />
    </div>
  );
}
