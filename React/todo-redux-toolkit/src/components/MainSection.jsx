import TodoForm from "./ToDoForm.jsx";
import TodoItem from "./ToDoItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { clearAllTodos } from "../features/todo/todoSlice.js";

export default function MainSection() {
    const { todos, order } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-gray-900 min-h-screen py-8 text-white">
            <div className="w-full max-w-2xl mx-auto shadow-lg rounded-xl px-6 py-4 bg-white/5 backdrop-blur-md flex flex-col justify-center gap-6 transition-all duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-extrabold text-center text-teal-300 mb-6 mt-4 animate-fade-in">
                    Manage Your To-Dos
                </h1>
                <div className="mb-6">
                    <TodoForm />
                </div>
                <div className="flex flex-col gap-y-4">
                    {order.length === 0 ? (
                        <p className="text-center text-gray-400 italic animate-fade-in">
                            No tasks yet. Add a task to get started!
                        </p>
                    ) : (
                        <div className="flex flex-col gap-4 bg-indigo-400  p-2 rounded-xl">
                            {order.map((id) => {
                                const todo = todos[id];
                                return (
                                    <TodoItem
                                        key={todo.id}
                                        id={todo.id}
                                        task={todo.task}
                                        completed={todo.completed}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
                {order.length > 0 && (
                    <button
                        type="button"
                        className="cursor-pointer h-12 w-1/2 self-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:scale-105 active:scale-95 animate-fade-in outline-1 outline-indigo-700"
                        onClick={() => dispatch(clearAllTodos())}
                    >
                        Clear All To-Dos
                    </button>
                )}
            </div>
        </div>
    );
}
