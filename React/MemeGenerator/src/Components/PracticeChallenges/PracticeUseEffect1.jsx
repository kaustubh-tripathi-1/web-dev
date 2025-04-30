import { useEffect, useState } from "react";

export default function PracticeUseEffect1() {
    const [starWarsData, setStarWarsData] = useState("");
    const [count, setCount] = useState(1);

    async function fetchData() {
        try {
            const resp = await fetch(`https://swapi.dev/api/people/${count}`);
            if (!resp.ok) throw new Error(`${resp.statusText}`);
            const data = await resp.json();
            console.log(data);

            setStarWarsData(data);
        } catch (error) {
            console.error(error);
        }
    }

    function getNext() {
        setCount((prevCount) => prevCount + 1);
    }

    useEffect(() => {
        fetchData(count);
    }, [count]);

    return (
        <>
            <button onClick={getNext}>Get Next</button>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </>
    );
}
