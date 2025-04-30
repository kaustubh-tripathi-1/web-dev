import { useState } from "react";
import './Counter.css'

export default function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(prevCount => {
            const newCount = prevCount >= 20 ? 20 : prevCount+1;
            console.log(`Incremented correctly - ${newCount}`);
            return newCount;
        });
        
    }
    
    const decrement = () => {
        setCount(prevCount => {
            const newCount = prevCount <= 0 ? 0 : prevCount - 1;
            console.log(`Decremented correctly - ${newCount}`);
            return newCount;
        });
    }
    
    return (
        <>
            <div className="count-container">
                <h1 className="heading">Counter</h1>
                <button type="button" className="count-btn buttons" onClick = {increment}>
                    <h3>Count is : {count}</h3>
                </button>
                <button type="button" className="increment-btn buttons" onClick = {increment}>
                    <h3>Increase Count : {count}</h3>
                </button>
                <button type="button" className="decrement-btn buttons" onClick = {decrement}>
                    <h3>Decrease Count : {count}</h3>
                </button>
            </div>
        </>
    )
}