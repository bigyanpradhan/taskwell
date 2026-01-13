"use client";

import { use, useState } from "react";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "./datepicker";
import { Button } from "../ui/button";
import { useCreateTask, useUpdateTask } from "@/handlers/mutations";

export default function AddEditModal({ taskData, type }) {
  const [title, setTitle] = useState(taskData?.title || "");
  const [description, setDescription] = useState(taskData?.description || "");
  const [dueDate, setDueDate] = useState(taskData?.dueDate || "");
  const [currentstatus, setCurrentStatus] = useState(taskData?.status || "");
  const taskId = taskData?.id;
  const taskType = type;
  const handleAddNewTask = useCreateTask();
  const handleEditTask = useUpdateTask();

  const addNewTask = async () => {
    console.log(title, description, currentstatus, dueDate);
    handleAddNewTask.mutate({
      title: title,
      description: description,
      status: currentstatus || "Pending",
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
    setTitle("");
    setDescription("");
    setCurrentStatus("");
    setDueDate("");
    document.getElementById("task-close").click();
  };

  const editNewTask = async () => {
    console.log(title, description, currentstatus, dueDate);
    console.log("edit");
    handleEditTask.mutate({
      id: taskId,
      title: title,
      description: description,
      status: currentstatus,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
    document.getElementById("edit-task-close").click();

    setTitle("");
    setDescription("");
    setCurrentStatus("");
    setDueDate("");
  };

  const handleAddEditTask = (e) => {
    e.preventDefault();
    if (type === "add") {
      addNewTask();
    } else {
      editNewTask();
    }
  };

  return (
    <>
      <form onSubmit={handleAddEditTask}>
        <div className="md:flex md:justify-around gap-4 mb-2">
          <Field>
            <Input
              id="title"
              className="h-12 font-bold text-xl md:h-16 md:text-2xl lg:text-2xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={title || "Task Title"}
            />
          </Field>
        </div>

        <Field>
          <Textarea
            id="description"
            className="h-35 text-6xs md:h-50 md:text-xl lg:text-xl resize-none overflow-auto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={description || "Task Description"}
          />
        </Field>

        <div className="flex justify-between gap-1 mt-2">
          <DatePicker dueDate={dueDate} onChange={setDueDate} />
          <Select onValueChange={setCurrentStatus}>
            <SelectTrigger>
              <SelectValue
                placeholder={currentstatus ? currentstatus : "Select Status"}
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
        <div className="mt-4 items-center text-center">
          <Button className="w-full text-[18px]" type="submit">
            {taskType === "add" ? "Add Task" : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  );
}
