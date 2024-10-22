import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "../models/todo";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: TodoListProps) {
  return (
    <>
      {todos.length === 0 && (
        <div className="flex items-center justify-center mt-5">
          Start by adding a new todo.
        </div>
      )}
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center">
          <div className="flex flex-1 items-center justify-start gap-2 px-10 py-2">
            <Checkbox
              checked={todo.isCompleted}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <label className={todo.isCompleted ? "line-through" : ""}>
              {todo.title}
            </label>
          </div>
          <div className="flex">
            <span className="hidden md:block px-10 py-2 text-sm text-gray-500">
              {format(todo.date, "PPP")}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
              className="mr-10 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
