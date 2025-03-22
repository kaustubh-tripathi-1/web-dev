import { createSlice, nanoid } from "@reduxjs/toolkit";

function loadStateFromLocalStorage() {
    try {
        const strigifiedState = localStorage.getItem(`todosState`);
        if (!strigifiedState) {
            return undefined;
        }

        return JSON.parse(strigifiedState);
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
