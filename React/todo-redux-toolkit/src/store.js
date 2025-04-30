import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice.js";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

/**
 * The function `saveStateToLocalStorage` saves the `state.todos` object to the browser's localStorage
 * after serializing it to JSON format.
 * @param state - The `state` parameter in the `saveStateToLocalStorage` function likely represents the
 * current state of an application or a specific part of it. In this case, it seems to be related to a todo
 * list application since it is saving the `state.todos` to the local storage. The `state
 */
function saveStateToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state.todos);
        localStorage.setItem(`todosState`, serializedState);
    } catch (error) {
        console.error(`Error saving state to localStorage:`, error);
    }
}

store.subscribe(() => {
    const storeState = store.getState();
    saveStateToLocalStorage(storeState);
});
