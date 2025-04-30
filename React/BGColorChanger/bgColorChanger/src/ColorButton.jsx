export default function ColorButton(props) {
    const colorName = props.color[0].toUpperCase() + props.color.slice(1);
    const textColor = props.theme === `dark` ? `text-white` : `text-black`;

    return (
        <button
            style={{ backgroundColor: props.color }}
            className={`p-2 w-20 ${textColor} rounded-4xl m-3 cursor-pointer  shadow-2xl shadow-fuchsia-950`}
            onClick={() => props.setBGColor(props.color)}
        >
            {colorName}
        </button>
    );
}
