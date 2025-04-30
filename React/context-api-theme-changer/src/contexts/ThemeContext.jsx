import { useState } from "react";
import { createContext, useContext } from "react";

//$ Simple creation of context for a theme changer
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(`light`);

    /* function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === `light` ? `dark` : `light`));
    } */

    //& Fn. here can have access to event object too
    function toggleTheme(event) {
        const themeStatus = event.currentTarget.checked;
        setTheme(themeStatus ? `dark` : `light`);
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
