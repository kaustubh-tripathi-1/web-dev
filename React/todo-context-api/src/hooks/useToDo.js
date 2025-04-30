import { useContext } from "react";
import { ToDoStateContext, ToDoActionsContext } from "../contexts/ToDoContext";

export function useToDoState() {
    const context = useContext(ToDoStateContext);
    if (!context) {
        throw new Error("useToDo must be used within a ToDoProvider");
    }
    return context;
}
export function useToDoActions() {
    const context = useContext(ToDoActionsContext);
    if (!context) {
        throw new Error("useToDo must be used within a ToDoProvider");
    }
    return context;
}
