import { PRIORITY } from "@/constants/tasks";

export const getPriorityClass = (priority: string) => {
  switch (priority) {
    case PRIORITY.P1:
      return "bg-red-100 text-red-800";
    case PRIORITY.P2:
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-green-100 text-green-800";
  }
};
