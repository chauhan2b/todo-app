import { TodoState } from "../todos/models/todo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: TodoState[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: TodoListProps) {
  const pendingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <>
      {/* If todos are empty */}

      {todos.length === 0 && (
        <div className="flex items-center justify-center mt-5 text-gray-500">
          Start by adding a new todo.
        </div>
      )}

      {/* Pending Todos */}

      {pendingTodos.length === 0 || (
        <Accordion type="single" collapsible className="px-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm text-gray-500">
              <div className="flex items-center">
                <Badge variant="outline" className="text-gray-500 mr-2">
                  {pendingTodos.length}
                </Badge>
                Pending
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {pendingTodos.map((todo) => (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Completed Todos */}

      {completedTodos.length === 0 || (
        <Accordion type="single" collapsible className="px-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm text-gray-500">
              <div className="flex items-center">
                <Badge variant="outline" className="text-gray-500 mr-2">
                  {completedTodos.length}
                </Badge>
                Finished
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {completedTodos.map((todo) => (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
