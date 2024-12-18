"use client";
import { Task } from "@/types/task";
import { AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import deleteTask from "@/app/tasks/api/delete";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskForm from "./TaskForm";
import { useState } from "react";

type Props = {
  task: Task;
};

export default function TaskDetails({ task }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AccordionContent className="px-6 py-4 text-gray-600 text-md">
      <div className="space-y-6">
        <p className="text-md leading-relaxed bg-gray-50 p-4 rounded-md shadow-inner border border-gray-200">
          {task.description}
        </p>
        <div className="flex justify-end items-center gap-4">
          <form action={deleteTask} className="flex items-center">
            <input type="hidden" name="id" value={task.id} />
            <Button
              variant="destructive"
              type="submit"
              className=" btn w-[80px] bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </form>
          <Button className="btn w-[80px]" onClick={() => setIsOpen(true)}>
            Edit
          </Button>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="mt-5 p-6 bg-white rounded-2xl shadow-2xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 text-center border-b pb-4">
              Edit Task
            </DialogTitle>
          </DialogHeader>
          <TaskForm editMode task={task} />
        </DialogContent>
      </Dialog>
    </AccordionContent>
  );
}
