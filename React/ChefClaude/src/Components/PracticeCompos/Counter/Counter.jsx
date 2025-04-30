import { useState } from "react";
import Count from "./Count.jsx";

export default function App() {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1));
  }
  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <main className="h-screen bg-[#242424]">
      <h1 className="flex h-1/6 items-center justify-center text-4xl font-bold text-white">
        How many times will you say "state" in this section?
      </h1>
      <div className="counter flex items-center justify-center gap-2">
        <button
          onClick={decrement}
          className="minus z-10 -mr-7 h-16 w-16 cursor-pointer self-end rounded-[50%] bg-gray-600 pt-0 font-serif text-4xl text-white hover:border-2 hover:border-blue-800 hover:bg-gray-800"
          aria-label="Decrease count"
        >
          -
        </button>
        <Count count={count} />
        <button
          onClick={increment}
          className="plus z-10 -ml-7 h-16 w-16 cursor-pointer self-end rounded-[50%] bg-gray-600 pt-0 font-serif text-4xl text-white hover:border-2 hover:border-blue-800 hover:bg-gray-800"
          aria-label="Increase count"
        >
          +
        </button>
      </div>
    </main>
  );
}
