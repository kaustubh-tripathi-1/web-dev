import { useState } from "react";

//$ Conditional Rendering with Jokes
export default function Joke(props) {
    const [isShown, setIsShown] = useState(false);

    function togglePunchline() {
        setIsShown((prevIsShown) => !prevIsShown);
    }

    return (
        <section className="h-1/6 max-w-full overflow-x-hidden">
            {
                /* props.setup ? (
                <h3 className="text-2xl font-bold h-10 ml-4 mt-4 mb-4">
                    Setup : {props.setup}
                </h3>
            ) : (
                <h3 className="text-2xl font-bold h-10 ml-4 mt-4 mb-4">
                    Setup : No Setup
                </h3>
            ) */
                <h3 className="text-2xl font-bold h-10 ml-4 mt-4 mb-4">
                    Setup : {props.setup || "No Setup"}
                </h3>
            }
            {isShown && (
                <p className="text-lg max-h-fit ml-4 mt-4 mb-4 pl-0.5">
                    {props.punchline}
                </p>
            )}
            <button
                onClick={togglePunchline}
                className="w-40 h-8 bg-blue-500 ml-4 mt-4 mb-4 rounded-xl cursor-pointer hover:bg-indigo-600 hover:border-2 hover:border-emerald-900"
            >
                {isShown ? "Hide punchline" : "Show punchline"}
            </button>
            <hr />
        </section>
    );
}

/* const jokesList = jokes.map((joke) => {
        <ul>
            <li>
                <h3>
                    joke.setup
                </h3>
                <p>

                </p>
                <hr />
            </li>
        </ul>
    }); */
