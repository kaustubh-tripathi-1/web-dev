import globePng from '../assets/globe.png'

export default function Header() {
    return (
        <header className="flex h-16 w-full bg-red-500 justify-center items-center">
            <img src={globePng} alt="globe" className='size-6'/>
            <h1 className="font-extrabold text-xl text-white p-2">My Travel Journal</h1>
        </header>
    );
}