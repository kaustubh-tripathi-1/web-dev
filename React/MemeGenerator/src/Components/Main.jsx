import { useState, useEffect } from "react";

export default function Main() {
    const [meme, setMeme] = useState({
        topText: ``,
        bottomText: ``,
        imgUrl: `http://i.imgflip.com/1bij.jpg`,
    });

    const [allMemes, setAllMemes] = useState([]);

    function getRandomMeme() {
        // if (allMemes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * allMemes.length);
        setMeme(allMemes[randomIndex]);
    }

    async function fetchMemeData() {
        try {
            const response = await fetch(`https://api.imgflip.com/get_memes`);

            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }
            const memesDataObj = await response.json();
            const newMemesData = memesDataObj.data.memes.map((data) => {
                return { ...data, topText: ``, bottomText: `` };
            });

            setAllMemes(newMemesData);
            // console.log(newMemesData);
            // console.log(allMemes);
        } catch (error) {
            console.error(error);
        }
    }

    //$ Using async/await
    useEffect(() => {
        const promise = fetchMemeData();
        // console.log(promise);
    }, []);

    useEffect(() => {
        if (allMemes.length > 0) {
            getRandomMeme();
        }
    }, [allMemes]);

    //$ Promise chaining method
    /* useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => {
                const newMemesData = data.data.memes.map((data) => {
                    return { ...data, topText: ``, bottomText: `` };
                });
                setAllMemes(newMemesData);
            })
            .then(getRandomMeme())
            .catch((error) => {
                console.error(error);
            });
    }, []); */

    /** Handles the `onChange` event on input of Top text
     * @param {Event} event object
     */
    function handleChange(event) {
        setMeme((prevMeme) => {
            const newObj = JSON.parse(JSON.stringify(prevMeme));

            //$ Verbose check of top or bottom text input
            /* if (event.target?.name === `top-text`) {
                const newTopText = `${event.target?.value}`;

                return { ...newObj, topText: newTopText };
            }
            const newBottomText = `${event.target?.value}`;

            return { ...newObj, bottomText: newBottomText }; */

            const { name, value } = event.target;

            return { ...newObj, [name]: value };
        });
    }

    return (
        <main className="h-5/6 w-full px-10 pt-5 pb-3 flex flex-col justify-between">
            <div className="w-full h-2/12 flex gap-10">
                <section className="w-1/2 h-full flex flex-col justify-between">
                    <label
                        htmlFor="top-text"
                        className="text-2xl font-semibold"
                    >
                        Top Text
                    </label>
                    <input
                        className="h-1/2 border-2 border-gray-400 rounded-md focus:bg-amber-200 text-2xl pl-3"
                        id="top-text"
                        type="text"
                        name="topText"
                        value={meme.topText}
                        placeholder="Enter top text for the meme . . ."
                        onChange={handleChange}
                    />
                </section>
                <section className="w-1/2 h-full flex flex-col justify-between">
                    <label
                        htmlFor="bottom-text"
                        className="text-2xl font-semibold"
                    >
                        Bottom Text
                    </label>
                    <input
                        className="h-1/2 border-2 border-gray-400 rounded-md focus:bg-amber-200 text-2xl pl-3"
                        id="bottom-text"
                        type="text"
                        name="bottomText"
                        value={meme.bottomText}
                        placeholder="Enter bottom text for the meme . . ."
                        onChange={handleChange}
                    />
                </section>
            </div>
            <button
                type="button"
                className="w-80 h-1/12 self-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-500 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-indigo-900 hover:via-blue-800 hover:to-blue-500"
                onClick={getRandomMeme}
            >
                Get a new meme image
            </button>
            <div className="w-full h-4/6 flex place-content-center relative">
                <img
                    src={meme.url /* || meme.imgUrl */}
                    alt={meme.name}
                    className="max-w-[100%] h-auto"
                />
                <span className="absolute top-4 uppercase text-white text-3xl font-extrabold font-[impact] [text-shadow:_2px_2px_0_#000_,_-2px_-2px_0_#000_,_2px_-2px_0_#000_,_-2px_2px_0_#000_,_0_2px_0_#000_,_2px_0_0_#000_,_0_-2px_0_#000_,_-2px_0_0_#000_,_2px_2px_5px_#000] tracking-wide cursor-default select-none">
                    {meme.topText}
                </span>
                <span
                    className="absolute bottom-4 uppercase text-white text-3xl font-extrabold font-[impact] 
                [text-shadow:_2px_2px_0_#000_,_-2px_-2px_0_#000_,_2px_-2px_0_#000_,_-2px_2px_0_#000_,_0_2px_0_#000_,_2px_0_0_#000_,_0_-2px_0_#000_,_-2px_0_0_#000_,_2px_2px_5px_#000]
                    tracking-wide cursor-default select-none"
                >
                    {meme.bottomText}
                </span>
            </div>
        </main>
    );
}
