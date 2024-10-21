"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "./components/todo-list";
import { initialTodos } from "./data/todos";
import { useState } from "react";
import { Todo } from "./models/todo";
import { toast } from "sonner";

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState("");

  function handleAddTodo() {
    if (title.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: (todos.length + 1).toString(),
      title: title,
      date: new Date(),
      isCompleted: false,
    };

    // Add new todo to the list
    setTodos([...todos, newTodo]);

    // Clear the input field
    setTitle("");

    // Show toast message
    toast.success("Todo added successfully.");
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
        <Button onClick={handleAddTodo}>Add Todo</Button>
      </div>

      {/* List of all todo's */}

      <TodoList todos={todos} />
    </div>
  );
}
