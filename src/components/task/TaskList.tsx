import getTask from "@/app/tasks/_actions/get";
import { SearchParams } from "@/types/params";
import { Accordion, AccordionItem } from "../ui/accordion";
import TaskDetails from "./TaskDetails";
import TaskRow from "./TaskRow";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  searchParams: SearchParams;
};

export default async function TaskList({ searchParams }: Props) {
  const { data: tasks } = await getTask(searchParams);

  return (
    <ScrollArea className="w-full h-[400px]">
      {tasks.map((task) => (
        <Accordion type="single" collapsible key={task.id}>
          <AccordionItem value={`item-${task.id}`}>
            <TaskRow task={task} />
            <TaskDetails task={task} />
          </AccordionItem>
        </Accordion>
      ))}
    </ScrollArea>
  );
}
