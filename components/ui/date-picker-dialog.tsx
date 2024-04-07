"use client";

import { useState, type ChangeEventHandler } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isValid, parse } from "date-fns";
import { type SelectSingleEventHandler } from "react-day-picker";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const DatePickerDialog = ({ name }: { name: string }) => {
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      setIsPopperOpen(false);
    } else {
      setInputValue("");
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        id={name}
        name={name}
        placeholder={format(new Date(), "y-MM-dd")}
        className="placeholder:opacity-50"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Popover open={isPopperOpen} onOpenChange={setIsPopperOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            defaultMonth={selected}
            initialFocus={isPopperOpen}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
