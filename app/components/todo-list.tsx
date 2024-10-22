import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "../models/todo";
import { format } from "date-fns";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center">
          <div className="flex flex-1 items-center justify-start gap-2 px-10 py-2">
            <Checkbox />
            <label>{todo.title}</label>
          </div>
          <div>
            <span className="hidden md:block px-10 py-2 text-sm text-gray-500">
              {format(todo.date, "PPP")}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
