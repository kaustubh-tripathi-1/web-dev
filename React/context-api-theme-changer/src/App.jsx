import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import MainContent from "./components/MainContent";

export default function App() {
    return (
        <ThemeProvider>
            <MainContent />
        </ThemeProvider>
    );
}
