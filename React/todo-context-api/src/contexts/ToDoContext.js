import { createContext } from "react";

export const ToDoStateContext = createContext({
    todos: [],
});

export const ToDoActionsContext = createContext({
    addTask: () => {},
    updateTask: () => {},
    deleteTask: () => {},
    toggleTaskCompleted: () => {},
    clearAllTodos: () => {},
});
