import { Todo } from "../models/todo";

export const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Learn React",
    date: new Date(),
    isCompleted: false,
  },
  {
    id: "2",
    title: "Learn Next.js",
    date: new Date(),
    isCompleted: false,
  },
  {
    id: "3",
    title: "Learn Tailwind CSS",
    date: new Date(),
    isCompleted: false,
  },
];
