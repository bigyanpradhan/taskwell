"use client";

import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "./datepicker";

export default function Cards({
  title,
  description,
  status,
  dueDate,
  onDelete,
  onEdit,
}) {
  const formattedDate = dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(dueDate))
    : "No date";

  return (
    <>
      <div className="bg-gray-800 p-4 mt-2 rounded-3xl shadow-md">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue
                placeholder={status ? status : "Select Status"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Task Status</SelectLabel>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Canceled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className=" mt-2 text-gray-600 h-30 overflow-hidden">
          {description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            <DatePicker dueDate={formattedDate} />
          </div>
          <div className="flex space-x-2">
            <Button onClick={onEdit}>
              <Edit />
            </Button>
            <Button onClick={onDelete}>
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
