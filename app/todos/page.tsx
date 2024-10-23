import AddTodo from "./components/add-todo";
import TodoList from "./components/todo-list";

export default function TodoPage() {
  return (
    <div className="flex flex-col max-w-md md:max-w-2xl w-full mx-auto">
      <div className="text-2xl font-bold flex items-center justify-center mt-32">
        Todo App
      </div>
      <AddTodo />
      <TodoList />
    </div>
  );
}
