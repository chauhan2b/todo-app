"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { TodoState } from "../models/todo";
import { Check, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import {
  editTodo,
  removeTodo,
  toggleTodo,
} from "@/lib/features/todos/todo-slice";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TodoItemProps {
  todo: TodoState;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const dispatch = useDispatch();

  function handleDeleteTodo(id: string) {
    dispatch(removeTodo(id));

    // show toast message
    toast.success("Todo deleted successfully.");
  }

  function handleToggleTodo(id: string) {
    dispatch(toggleTodo(id));
  }

  function handleEditTodo(id: string) {
    if (isEditing) {
      dispatch(editTodo({ id, title }));
    }
    setIsEditing(!isEditing);
  }

  return (
    <div key={todo.id} className="flex items-center">
      <div className="flex flex-1 items-center justify-start gap-2 px-4 py-2">
        <Checkbox
          checked={todo.isCompleted}
          onCheckedChange={() => handleToggleTodo(todo.id)}
        />
        {isEditing ? (
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <label
            className={todo.isCompleted ? "line-through" : ""}
            onDoubleClick={() => handleEditTodo(todo.id)}
          >
            {todo.title}
          </label>
        )}
      </div>
      <div className="flex">
        <span className="hidden md:block px-10 py-2 text-sm text-gray-500">
          {format(new Date(todo.date), "PPP")}
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled={title.trim() === ""}
          onClick={() => handleEditTodo(todo.id)}
          className="mr-2 text-gray-500 hover:text-gray-800"
        >
          {isEditing ? <Check /> : <Pencil />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteTodo(todo.id)}
          className="mr-2 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
