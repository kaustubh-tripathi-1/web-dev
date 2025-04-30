import { useState } from "react";
import { useToDoActions } from "../hooks/useToDo.js";

export default function TodoForm() {
    const { addTask } = useToDoActions();
    const [error, setError] = useState(false);

    function handleAddTask(formData) {
        const task = formData.get(`task-input`);
        if (!task.trim()) {
            setError(true);
            setTimeout(() => setError(false), 2000);
            return;
        }
        setError(false);
        addTask(task.trim());
    }

    return (
        <form
            className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-2 shadow-md transition-all duration-300 hover:shadow-lg"
            onSubmit={(event) => {
                event.preventDefault();
                handleAddTask(new FormData(event.currentTarget));
                event.currentTarget.reset();
            }}
        >
            <div className="relative w-full">
                <label htmlFor="task-input" className="sr-only">
                    Add a new task
                </label>
                <input
                    type="text"
                    id="task-input"
                    name="task-input"
                    placeholder="Write Todo..."
                    className={`w-full border border-gray-600 rounded-lg px-4 py-2 outline-none bg-gray-700/50 text-white placeholder-gray-400 transition-all duration-300 focus:border-teal-400 ${
                        error ? "border-red-500" : ""
                    }`}
                />
                {error && (
                    <p className="absolute top-2 right-2 text-yellow-400 text-md animate-bounce">
                        Task cannot be empty!
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="rounded-lg px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all duration-300 transform hover:scale-115 focus:scale-115 active:scale-95 cursor-pointer outline-1"
            >
                Add
            </button>
        </form>
    );
}
