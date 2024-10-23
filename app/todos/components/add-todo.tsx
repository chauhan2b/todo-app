"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/lib/features/todos/todo-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();

  const dispatch = useDispatch();

  function handleAddTodo() {
    if (title.trim() === "") {
      toast.error("Please enter a title.");
      return;
    }

    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    const dateString = date.toISOString();

    // Add new todo to the list
    dispatch(addTodo({ title, date: dateString }));

    // Clear the input field and date picker
    setTitle("");
    setDate(undefined);

    // Show toast message
    toast.success("Todo added successfully.");
  }

  return (
    <div className="flex p-6 gap-2">
      <Input
        type="text"
        placeholder="I want to..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <DatePicker date={date} setDate={setDate} />
      <Button onClick={handleAddTodo}>Add Todo</Button>
    </div>
  );
}
