import { TodoState } from "@/app/todos/models/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
const initialState: TodoState[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    hydrateTodos: (_, action: PayloadAction<TodoState[]>) => {
      return action.payload;
    },
    addTodo: (
      state,
      action: PayloadAction<{ title: string; date: string }>
    ) => {
      state.push({
        id: crypto.randomUUID(),
        title: action.payload.title,
        date: action.payload.date,
        isCompleted: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        state.splice(state.indexOf(todo), 1);
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
  },
});

export const { hydrateTodos, addTodo, removeTodo, toggleTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
