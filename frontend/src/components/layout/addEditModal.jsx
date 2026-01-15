"use client";

import { useState } from "react";
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
import { taskSchema } from "@/schemas/taskSchema";

export default function AddEditModal({ taskData, type }) {
  const [title, setTitle] = useState(taskData?.title || "");
  const [description, setDescription] = useState(taskData?.description || "");
  const [dueDate, setDueDate] = useState(taskData?.dueDate || "");
  const [currentstatus, setCurrentStatus] = useState(taskData?.status || "");
  const [errors, setErrors] = useState({});
  const taskId = taskData?.id;
  const taskType = type;

  const handleAddNewTask = useCreateTask();
  const handleEditTask = useUpdateTask();

  const addNewTask = async () => {
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
    setErrors({});

    const result = taskSchema.safeParse({
      title: title,
      description: description,
      status: currentstatus,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });

    if (!result.success) {
      const fieldErrors = result.error.issues.reduce((acc, err) => {
        const field = err.path[0];
        if (!acc[field]) {
          acc[field] = err.message;
        }
        return acc;
      }, {});
      setErrors(fieldErrors);
      return;
    }
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
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <Field>
            <Textarea
              id="description"
              className="h-35 text-6xs md:h-50 md:text-xl lg:text-xl resize-none overflow-auto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={description || "Task Description"}
            />
          </Field>
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-between gap-1 mt-2">
          <div>
            <DatePicker dueDate={dueDate} onChange={setDueDate} />
            {errors.dueDate && (
              <p className="text-sm text-red-600">{errors.dueDate}</p>
            )}
          </div>
          <div>
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
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status}</p>
            )}
          </div>
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
