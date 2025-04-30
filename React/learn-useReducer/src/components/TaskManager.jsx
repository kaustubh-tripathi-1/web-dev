import { useReducer, useState } from "react";
import "./TaskManager.css";

function taskReducer(state, action) {
    switch (action.type) {
        case "addTask": {
            return {
                tasks: [
                    ...state.tasks,
                    {
                        id: crypto.randomUUID(),
                        task: action.payload.task,
                        completed: false,
                    },
                ],
            };
        }
        case "deleteTask": {
            return {
                tasks: state.tasks.filter(
                    (task) => task.id !== action.payload.id
                ),
            };
        }
        default: {
            return state;
        }
    }
}

const initialState = {
    tasks: [],
};

export default function TaskManager() {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const [todo, setTodo] = useState(``);

    function handleInput(e) {
        setTodo(e.target.value);
    }

    /**
     * @param {Event} e
     */
    function handleAddTask(e) {
        e.preventDefault();
        if (!todo.trim()) {
            return;
        }
        dispatch({ type: "addTask", payload: { task: todo } });
        setTodo(``);
    }

    return (
        <main className="main-container">
            <h1>Task Manager</h1>
            <form name="task-form" className="input-container">
                <input
                    type="text"
                    value={todo}
                    name="task-input"
                    placeholder="Enter a task..."
                    onChange={handleInput}
                />
                <button type="submit" onClick={handleAddTask}>
                    Add Task
                </button>
            </form>
            <ul>
                {state.tasks.map((task) => {
                    return (
                        <li className="list-item" key={task.id}>
                            <div className="task-item">
                                <input readOnly value={task.task} />
                                <button
                                    onClick={() => {
                                        dispatch({
                                            type: "deleteTask",
                                            payload: { id: task.id },
                                        });
                                    }}
                                    aria-label={`Delete task: ${task.task}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
