import { PRIORITY, SORT_BY } from "@/constants/tasks";

export type SearchParams = {
  sortBy?: SORT_BY;
  priority?: PRIORITY;
  due_date?: string;
};
