"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { TodoItem } from "./todo-item";
import { useEffect, useState } from "react";
import { hydrateTodos } from "@/lib/features/todos/todo-slice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
  const pendingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(hydrateTodos(JSON.parse(savedTodos)));
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {/* If todos are loading */}

      {loading ? (
        <div className="flex justify-center items-center py-4">Loading...</div>
      ) : (
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
                    <TodoItem todo={todo} key={todo.id} />
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
                    <TodoItem todo={todo} key={todo.id} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </>
      )}
    </>
  );
}
