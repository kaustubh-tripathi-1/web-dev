import { createSlice, nanoid } from "@reduxjs/toolkit";

/**
 * The function `loadStateFromLocalStorage` retrieves and parses a serialized state from localStorage,
 * handling errors gracefully.
 * @returns The function `loadStateFromLocalStorage` is attempting to load and parse a serialized state
 * from the localStorage with the key `todosState`. If successful, it returns the parsed state object.
 * If there is no serialized state or an error occurs during the process, it returns `undefined`.
 */
function loadStateFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem(`todosState`);
        if (!serializedState) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Error loading state from localStorage:", err);
        return undefined;
    }
}

const defaultInitialState = {
    todos: {},
    order: [],
};

const initialState = loadStateFromLocalStorage() || defaultInitialState;

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const uniqueId = nanoid();
            state.todos[uniqueId] = {
                id: uniqueId,
                task: action.payload.task,
                completed: false,
            };
            state.order.push(uniqueId);
        },
        updateTask: (state, action) => {
            const { id, task } = action.payload;
            if (state.todos[id]) {
                state.todos[id].task = task;
            }
        },
        deleteTask: (state, action) => {
            const { id } = action.payload;
            if (state.todos[id]) {
                delete state.todos[id];
                state.order = state.order.filter((orderId) => orderId !== id);
            }
        },
        toggleTaskCompleted: (state, action) => {
            const { id } = action.payload;
            if (state.todos[id]) {
                state.todos[id].completed = !state.todos[id].completed;
            }
        },
        clearAllTodos: (state, action) => {
            state.todos = {};
            state.order = [];
        },
    },
});

export const {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompleted,
    clearAllTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
