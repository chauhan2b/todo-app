import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "./_components/todo-list";

export default function Home() {
  return (
    <div className="flex flex-col max-w-md md:max-w-2xl w-full mx-auto">
      <div className="text-2xl font-bold flex items-center justify-center mt-20">
        Todo App
      </div>

      {/* Add new todo */}

      <div className="flex p-6 gap-2">
        <Input type="text" placeholder="I want to..." />
        <Button>Add Todo</Button>
      </div>

      {/* List of all todo's */}

      <TodoList />
    </div>
  );
}
