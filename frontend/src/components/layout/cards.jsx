"use client";

import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "./datepicker";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddEditModal from "./addEditModal";
import { DialogClose } from "@radix-ui/react-dialog";
export default function Cards({
  id,
  title,
  description,
  status,
  dueDate,
  onDelete,
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
      <div className="bg-gray-800 w-auto h-60 p-4 mt-2 rounded-3xl shadow-md">
        <div>
          <div className="flex justify-between items-center ">
            <h3 className="text-lg truncate max-w-80 w-auto font-semibold">
              {title}
            </h3>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={status} />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          </div>
          <p className=" mt-2 text-gray-400 text-ellipsis h-27 overflow-auto">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 self-end">
          <div className="text-sm text-gray-500">
            <DatePicker disabled={true} dueDate={formattedDate} />
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger className="bg-primary hover:bg-primary/90 text-black text-lg h-10 p-2 rounded-xl font-bold items-center">
                <span className="text-center">
                  <Edit />
                </span>
              </DialogTrigger>
              <DialogContent className="w-[70%] border-2 shadow-md shadow-slate-300">
                <DialogTitle className="text-center">EDIT NOTE</DialogTitle>
                <AddEditModal
                  taskData={{ id, title, description, status, dueDate }}
                  type="edit"
                  onClose={() => {
                    setIsOpen(true);
                  }}
                />
              </DialogContent>
              <DialogClose id="edit-task-close"></DialogClose>
            </Dialog>
            <Button
              className="bg-primary hover:bg-primary/90 text-black text-lg h-10 p-2 rounded-xl font-bold items-center"
              onClick={onDelete}
            >
              <Trash className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
