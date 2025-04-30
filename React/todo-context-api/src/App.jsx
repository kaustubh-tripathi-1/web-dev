import ToDoProvider from "./components/ToDoProvider";
import MainSection from "./components/MainSection";

export default function App() {
    return (
        <ToDoProvider>
            <MainSection />
        </ToDoProvider>
    );
}
