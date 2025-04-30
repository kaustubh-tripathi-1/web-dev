import "./ThemeSwitcher.css";
import { useEffect, useReducer } from "react";

function themeReducer(state, action) {
    switch (action.type) {
        case "switchTheme": {
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        }
        default:
            return state;
    }
}

export default function ThemeSwitcher() {
    const [state, dispatch] = useReducer(themeReducer, {
        theme: localStorage.getItem("theme") ?? "dark",
    });

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove(`light`, `dark`);
        html.classList.add(state.theme);
    }, [state]);

    return (
        <main className="main-container">
            <h1>Theme Switcher</h1>
            <button
                onClick={() => {
                    dispatch({ type: "switchTheme" });
                }}
            >
                Toggle Theme
            </button>
        </main>
    );
}
