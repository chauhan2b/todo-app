"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "./components/todo-list";
import { useEffect, useState } from "react";
import { Todo } from "./models/todo";
import { toast } from "sonner";
import { DatePicker } from "./components/date-picker.";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get todos from local storage on first run
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function generateRandomId() {
    return Math.random().toString(36).substring(7);
  }

  function handleAddTodo() {
    if (title.trim() === "") {
      toast.error("Please enter a title.");
      return;
    }

    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    const newTodo: Todo = {
      id: generateRandomId(),
      title: title,
      date: date,
      isCompleted: false,
    };

    console.log(newTodo);

    // Add new todo to the list
    setTodos([...todos, newTodo]);

    // Clear the input field and date picker
    setTitle("");
    setDate(undefined);

    // Show toast message
    toast.success("Todo added successfully.");
  }

  function handleToggleTodo(id: string) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleDeleteTodo(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

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
