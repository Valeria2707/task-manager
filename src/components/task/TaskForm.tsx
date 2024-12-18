"use client";

import addTask from "@/app/tasks/api/add";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import PrioritySelect from "./PrioritySelect";
import updateTask from "@/app/tasks/api/update";
import { Task } from "@/types/task";
import { PRIORITY } from "@/constants/tasks";

type Props = {
  editMode?: boolean;
  task?: Task;
};
export default function TaskForm({ task, editMode }: Props) {
  return (
    <form action={editMode ? updateTask : addTask}>
      <input type="hidden" name="id" value={task?.id} />
      <div className="mb-4">
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={task?.title}
          placeholder="Title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4">
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={task?.description}
          placeholder="Description"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4">
        <Label
          htmlFor="due_date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Due Date
        </Label>
        <Input
          id="due_date"
          name="due_date"
          defaultValue={task?.due_date}
          required
          type="date"
          placeholder="Select a due date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4">
        <Label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Priority
        </Label>
        <PrioritySelect required value={task?.priority ?? PRIORITY.P4} />
      </div>
      <Checkbox name="completed" checked={false} className="hidden" />
      <Button
        type="submit"
        className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {editMode ? "Edit" : "Add"} Task
      </Button>
    </form>
  );
}
