import { useEffect } from "react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext.jsx";
import ThemeBtn from "./ThemeBtn";
import Card from "./Card";

export default function MainContent() {
    const { theme } = useTheme();

    useEffect(() => {
        const html = document.querySelector(`html`);
        html.classList.remove(`light`, `dark`);
        html.classList.add(theme);
    }, [theme]);

    return (
        <main className="flex flex-wrap min-h-screen items-center">
            <div className="w-full">
                <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                    <ThemeBtn />
                </div>
                <div className="w-full max-w-sm mx-auto">
                    <Card />
                </div>
            </div>
        </main>
    );
}
