"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ dueDate, onChange, disabled }) {
  return (
    <Popover className="">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dueDate}
          disabled={disabled}
          className="text-white w-[180px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          <span>
            {" "}
            {dueDate
              ? new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(dueDate))
              : "Select a Date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dueDate ? new Date(dueDate) : undefined}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
