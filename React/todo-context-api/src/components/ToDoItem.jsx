import { useState, useEffect, memo } from "react";
import { useToDoActions } from "../hooks/useToDo";
import editImg from "../assets/edit.png";
import correctImg from "../assets/correct.png";
import deleteImg from "../assets/trash.png";

function ToDoItem({ id, task, completed }) {
    const { updateTask, deleteTask, toggleTaskCompleted } = useToDoActions();

    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [toDoMsg, setTodoMsg] = useState(task);

    useEffect(() => {
        setTodoMsg(task);
    }, [task]);

    console.log(`TodoItem with id ${id} rendered`);

    return (
        <div
            className={`w-full h-fit flex items-center justify-between border border-gray-600 rounded-xl px-4 py-2 gap-x-4 shadow-md bg-gray-800 text-white transition-all duration-300 ${
                completed
                    ? "bg-green-700 hover:bg-green-800 scale-100 hover:scale-102"
                    : "bg-indigo-700 hover:bg-indigo-800 scale-100 hover:scale-102"
            } animate-fade-in`}
        >
            <label
                htmlFor={`mark-as-completed-${id}`}
                className="cursor-pointer text-sm whitespace-nowrap"
            >
                Mark as done
            </label>
            <input
                type="checkbox"
                className="cursor-pointer w-5 h-5 accent-teal-500 transition-transform duration-200 hover:scale-110 hover:accent-teal-600 focus:scale-110 focus:accent-teal-600 outline-none"
                checked={completed}
                onChange={() => toggleTaskCompleted(id)}
                id={`mark-as-completed-${id}`}
            />
            {/* <input
                type="text"
                name="task"
                className={`h-fit text-wrap border outline-none w-2/3  rounded-lg ${
                    isTodoEditable
                        ? "border-gray-500 px-3 bg-teal-600"
                        : "border-transparent"
                } ${
                    completed ? "line-through text-gray-400" : "text-white"
                } transition-all duration-300`}
                value={toDoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            /> */}
            <textarea
                name="task"
                className={`min-h-fit text-wrap border outline-none w-2/3 rounded-lg resize-none overflow-hidden ${
                    isTodoEditable
                        ? "border-gray-500 px-3 bg-teal-600/30 text-white"
                        : "border-transparent bg-transparent"
                } ${
                    completed ? "line-through text-gray-400" : "text-white"
                } transition-all duration-300`}
                value={toDoMsg}
                onChange={(e) => {
                    setTodoMsg(e.target.value);
                }}
                readOnly={!isTodoEditable}
                rows={1}
                onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />
            <button
                className={`inline-flex w-10 h-10 rounded-lg justify-center items-center outline-1 bg-gray-200   transition-all duration-300 transform  ${
                    completed
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-[#FFFC99] focus:bg-[#FFFC99] hover:scale-110 focus:scale-120 active:scale-95"
                }`}
                onClick={() => {
                    if (completed) return;

                    if (isTodoEditable) {
                        if (!toDoMsg.trim()) {
                            setTodoMsg(task);
                        } else {
                            updateTask(id, toDoMsg.trim());
                        }
                    } else {
                        setTodoMsg(task);
                    }
                    setIsTodoEditable((prev) => !prev);
                }}
                disabled={completed}
                aria-label={isTodoEditable ? "Save task" : "Edit task"}
            >
                {completed ? (
                    "✔️"
                ) : isTodoEditable ? (
                    <img src={correctImg} alt="save-icon" className="w-6 h-6" />
                ) : (
                    <img src={editImg} alt="edit-icon" className="w-6 h-6" />
                )}
            </button>
            <button
                className="inline-flex w-10 h-10 rounded-lg justify-center items-center bg-gray-200 hover:bg-red-600 focus:bg-red-600 transition-all duration-300 transform hover:scale-120 focus:scale-120 active:scale-95 cursor-pointer outline-1"
                onClick={() => deleteTask(id)}
                aria-label="Delete task"
            >
                <img src={deleteImg} alt="delete-icon" className="w-6 h-6" />
            </button>
        </div>
    );
}

export default memo(ToDoItem);
