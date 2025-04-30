import { useState } from "react";
import Header from "./Components/Header";
import MainSection from "./Components/MainSection";
import Counter from "./Components/PracticeCompos/Counter/Counter.jsx";
import Practice from "./Components/PracticeCompos/Practice";
import PracticeObjects from "./Components/PracticeCompos/PracticeObjects";
import FormPractice from "./Components/PracticeCompos/FormPractice";
import jokes from "./Components/PracticeCompos/ConditionalRenderingWithJokeCompo/jokesData.js";
import Joke from "./Components/PracticeCompos/ConditionalRenderingWithJokeCompo/Joke.jsx";
import Pad from "./Components/PracticeCompos/SoundPadsChallenge/Pad.jsx";
import padsData from "./Components/PracticeCompos/SoundPadsChallenge/pads.js";

export default function App() {
    /* //$ Render Jokes
    const jokesList = jokes.map((joke) => (
        <Joke key={joke.id} setup={joke.setup} punchline={joke.punchline} />
    )); */

    //$ Conditional Rendering challenges
    /* const [msgs, setMsgs] = useState([]);

    function showNotification() {
        if (msgs.length === 0) {
            return `You're all caught up.`;
        } else if (msgs.length === 1) {
            return `You have ${msgs.length} unread msg.`;
        } else {
            return `You have ${msgs.length} unread msgs.`;
        }
    } */

    //$ Sound Pads code
    // const [pads, setPads] = useState(padsData);

    /* function toggle(id) {
        setPads((prevPads) => {
            const newPads = prevPads.map((obj) => {
                if (obj.id === id) {
                    const newObj = JSON.parse(JSON.stringify(obj));
                    newObj.on = !newObj.on;
                    return newObj;
                }
                return obj;
            });

            return newPads;
        });
    } */
    /* function toggle(id) {
        setPads((prevPads) =>
            prevPads.map((obj) => {
                return obj.id === id ? { ...obj, on: !obj.on } : obj;
            }),
        );
    } */

    /* function toggleButtons() {
        setPads((prevPads) =>
            prevPads.map((obj) => {
                return { ...obj, on: obj.on ? false : true };
            }),
        );
    } */

    /* const padsList = pads.map((pad) => {
        return (
            <Pad
                key={pad.id}
                id={pad.id}
                on={pad.on}
                color={pad.color}
                handleToggle={toggle}
            />
        );
    }); */

    return (
        <div className="flex min-h-screen flex-col items-center">
            <Header />
            <MainSection />
            {/* <Counter /> */}
            {/* <Practice /> */}
            {/* <PracticeObjects /> */}
            {/* <FormPractice /> */}
            {
                //$ Conditional Rendering challenges
                /* <main className="w-full bg-emerald-400 max-h-fit flex flex-col justify-center ">
                            {jokesList}
                            </main> */
                // <h1>{showNotification()}</h1>
            }
            {/* //$ Dynamic Styles challenges
            <main className="grid h-full w-full grid-cols-[100px_100px] grid-rows-[repeat(4,100px)] items-start justify-evenly justify-items-center gap-4 bg-[#222222] p-14">
                {padsList}
                <button
                    className="h-19 w-19 cursor-pointer bg-amber-500"
                    type="button"
                    onClick={toggleButtons}
                >
                    Turn off all buttons
                </button>
            </main> */}
        </div>
    );
}
