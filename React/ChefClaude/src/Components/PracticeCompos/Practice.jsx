import { useState } from "react";

export default function Practice() {
    const [myFavouriteThings, setmyFavouriteThings] = useState([]);

    const allFavoriteThings = [
        "💦🌹",
        "😺",
        "💡🫖",
        "🔥🧤",
        "🟤🎁",
        "🐴",
        "🍎🥧",
        "🚪🔔",
        "🛷🔔",
        "🥩🍝",
    ];

    function addFavoriteThing() {
        setmyFavouriteThings((prevThings) => {
            if (prevThings.length < allFavoriteThings.length) {
                return [...prevThings, allFavoriteThings.at(prevThings.length)];
            } else {
                return prevThings;
            }
        });
    }

    const thingsElements = myFavouriteThings.map((thing, index) => (
        <p className="mt-2 mb-2" key={index}>
            {thing}
        </p>
    ));

    return (
        <main className="w-screen h-screen text-center">
            <button
                className="mt-6 bg-blue-400 border-2 border-amber-400 rounded-xl w-24 h-10 hover:bg-blue-700"
                onClick={addFavoriteThing}
            >
                Add item
            </button>
            <section
                className="w-screen flex flex-col items-center"
                aria-live="polite"
            >
                {thingsElements}
            </section>
        </main>
    );
}
