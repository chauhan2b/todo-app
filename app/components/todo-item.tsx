import { Checkbox } from "@/components/ui/checkbox";
import { TodoState } from "../models/todo";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface TodoItemProps {
  todo: TodoState;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <div key={todo.id} className="flex items-center">
      <div className="flex flex-1 items-center justify-start gap-2 px-4 py-2">
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
          {format(new Date(todo.date), "PPP")}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
          className="mr-2 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
