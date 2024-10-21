import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "../models/todo";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-start gap-2 px-10 py-2"
        >
          <Checkbox />
          <label>{todo.title}</label>
        </div>
      ))}
    </>
  );
}
