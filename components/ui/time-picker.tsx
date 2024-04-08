"use client";

import { useState, type ChangeEventHandler } from "react";

import { Input } from "./input";

export const TimePicker = ({ name }: { name: string }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <Input
      id={name}
      name={name}
      className="inline-block"
      type="time"
      value={inputValue}
      onChange={handleInputChange}
      onClick={(e) => e.currentTarget.select()}
    />
  );
};
