import { PRIORITY } from "@/constants/tasks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  includeAny?: boolean;
};

export default function PrioritySelect({
  value,
  onChange,
  required = false,
  includeAny,
}: Props) {
  return (
    <Select
      name="priority"
      {...(includeAny
        ? { value: value ?? PRIORITY.ANY }
        : { defaultValue: value ?? PRIORITY.P4, onValueChange: onChange })}
      onValueChange={onChange}
      required={required}
    >
      <SelectTrigger className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        {includeAny && <SelectItem value={PRIORITY.ANY}>ANY</SelectItem>}
        <SelectItem value={PRIORITY.P1}>P1</SelectItem>
        <SelectItem value={PRIORITY.P2}>P2</SelectItem>
        <SelectItem value={PRIORITY.P3}>P3</SelectItem>
        <SelectItem value={PRIORITY.P4}>P4</SelectItem>
      </SelectContent>
    </Select>
  );
}
