import chefLogo from "../assets/chef-claude-icon.png";

export default function Header() {
    return (
        <header className="flex h-20 w-full items-center justify-center gap-3 bg-white p-4 shadow-lg transition-all duration-300 hover:bg-gray-100">
            <a href="/">
                <img
                    src={chefLogo}
                    alt="Chef logo"
                    className="w-14 animate-pulse"
                />
            </a>
            <h1 className="text-4xl font-bold text-gray-900">Chef Claude</h1>
        </header>
    );
}
