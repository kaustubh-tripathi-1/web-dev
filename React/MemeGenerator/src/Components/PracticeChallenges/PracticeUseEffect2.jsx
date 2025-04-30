import { useState, useEffect } from "react";
import WindowTracker from "./WindowTracker.jsx";

export default function PracticeUseEffect2() {
    const [show, setShow] = useState(true);

    function toggleWindowTracker() {
        setShow((prevShow) => !prevShow);
    }

    return (
        <main className="h-full w-full bg-blue-950 flex flex-col justify-center items-center gap-20">
            <button
                className="w-2/6 h-10 bg-white cursor-pointer hover:bg-amber-300 "
                onClick={toggleWindowTracker}
            >
                Toggle Window Tracker
            </button>
            {show && <WindowTracker />}
        </main>
    );
}
