import ColorButton from "./ColorButton.jsx";
import colorData from "./colorData.js";
import { useState } from "react";

export default function App() {
    const [bgColor, setBGColor] = useState("#151515");

    const colorButtons = colorData.map((color) => (
        <ColorButton
            key={color.id}
            color={color.colour}
            theme={color.theme}
            setBGColor={setBGColor}
        />
    ));

    return (
        <main
            className="h-screen w-screen"
            style={{ backgroundColor: bgColor }}
        >
            <div
                className="color-picker bg-emerald-500 rounded-2xl
                flex justify-evenly absolute bottom-8 left-[8%]"
            >
                {colorButtons}
            </div>
        </main>
    );
}
