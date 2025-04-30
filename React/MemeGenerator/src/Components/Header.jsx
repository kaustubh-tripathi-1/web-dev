import trollFace from "../assets/troll-face.png";

export default function Header() {
    return (
        <header className="h-1/6 w-full bg-gradient-to-r from-purple-800 via-purple-700 to-purple-500 text-white flex gap-4 justify-start items-center ">
            <img className="w-13 ml-5" src={trollFace} alt="Troll face" />
            <h1 className="text-3xl font-bold">Meme Generator</h1>
        </header>
    );
}
