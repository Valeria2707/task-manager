"use client";

import { Label } from "../ui/label";
import { PRIORITY } from "@/constants/tasks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchParams } from "@/types/params";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PrioritySelect from "./PrioritySelect";
import { ROUTES } from "@/constants/routes";

type Props = {
  searchParams: SearchParams;
};

export default function TaskFilter({ searchParams }: Props) {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchParams>(searchParams);

  const handleChange = (value: string, key: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleReset = () => {
    setFilters({});
    router.push(ROUTES.tasks);
  };

  const handleApply = () => {
    const query = new URLSearchParams(filters as Record<string, string>);
    router.push(`${ROUTES.tasks}?${String(query)}`);
  };

  return (
    <form>
      <div className="flex flex-wrap items-end justify-between">
        <div className="w-full md:w-1/3">
          <Label
            htmlFor="due_date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by due date:
          </Label>
          <Input
            id="due_date"
            name="due_date"
            value={filters.due_date ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event.target.value, "due_date")
            }
            type="date"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by priority:
          </Label>
          <PrioritySelect
            includeAny
            value={filters.priority ?? PRIORITY.ANY}
            onChange={(value: string) => handleChange(value, "priority")}
          />
        </div>
        <div className="w-full md:w-auto flex gap-5 mt-2 md:mt-0">
          <Button
            type="button"
            onClick={handleApply}
            className="btn w-[80px] md:w-auto px-4 py-2"
          >
            Search
          </Button>
          <Button
            type="reset"
            onClick={handleReset}
            className="w-[80px] md:w-auto px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
