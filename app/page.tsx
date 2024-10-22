"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "./components/todo-list";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "./components/date-picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  addTodo,
  hydrateTodos,
  removeTodo,
  toggleTodo,
} from "@/lib/features/todos/todo-slice";

export default function Home() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(hydrateTodos(JSON.parse(savedTodos)));
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  function handleToggleTodo(id: string) {
    dispatch(toggleTodo(id));
  }

  function handleDeleteTodo(id: string) {
    dispatch(removeTodo(id));

    // show toast message
    toast.success("Todo deleted successfully.");
  }

  return (
    <div className="flex flex-col max-w-md md:max-w-2xl w-full mx-auto">
      <div className="text-2xl font-bold flex items-center justify-center mt-32">
        Todo App
      </div>

      {/* Add new todo */}

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

      {/* List of all todo's */}

      {loading ? (
        <div className="flex justify-center items-center py-4">Loading...</div>
      ) : (
        <TodoList
          todos={todos}
          toggleTodo={handleToggleTodo}
          deleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
}
