export default function Pad({ id, on, handleToggle, color }) {
    return (
        <button
            className={`h-full w-full cursor-pointer rounded-2xl border-2 border-rose-400 ${on ? `opacity-[1]` : `opacity-[0.1]`}`}
            style={{ backgroundColor: color }}
            type="button"
            title="Button"
            onClick={() => handleToggle(id)}
        ></button>
    );
}
