import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { setTheme, openModal } from "../../slices/uiSlice";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authStatus, userData } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.ui);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "About", slug: "/about", active: true },
        { name: "Contact", slug: "/contact", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "Create Post", slug: "/create-post", active: authStatus },
        {
            name: userData?.name || userData?.email || "Profile",
            slug: `/profile/${userData?.$id}`,
            active: authStatus,
        },
    ];

    // Open logout modal
    function openLogoutModal() {
        setIsMobileMenuOpen(false); // Close mobile menu on logout
        dispatch(openModal({ type: "logout", data: null }));
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    return (
        <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
            <div className="mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo/Title */}
                <NavLink to="/" className="text-2xl font-bold">
                    MyBlog
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:space-x-4 lg:space-x-6 items-center">
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <NavLink
                                    key={item.name}
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `md:py-2 md:px-3 md:text-sm lg:py-2.5 lg:px-4 lg:text-base hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                            isActive
                                                ? "text-blue-500 dark:text-blue-400 font-semibold"
                                                : ""
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            )
                    )}
                    {authStatus && (
                        <button
                            onClick={openLogoutModal}
                            className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 px-3 py-1 rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                    {/* Theme Toggle Button */}
                    <button
                        onClick={handleThemeToggle}
                        className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none focus:ring-2 focus:ring-gray-500 rounded cursor-pointer"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isMobileMenuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16m-7 6h7"
                            }
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-white dark:bg-gray-900 px-4 py-2">
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <NavLink
                                    key={item.name}
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `block p-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm ${
                                            isActive
                                                ? "text-blue-500 dark:text-blue-400 font-semibold"
                                                : ""
                                        }`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            )
                    )}
                    {authStatus && (
                        <button
                            onClick={openLogoutModal}
                            className="block w-full text-left p-2  text-red-400 hover:text-red-500 focus:text-red-500 focus:outline-none focus:underline"
                        >
                            Logout
                        </button>
                    )}
                    {/* Theme Toggle Button (Mobile) */}
                    <button
                        onClick={handleThemeToggle}
                        className="block w-full text-left py-2 hover:underline focus:underline focus:outline-none px-2 cursor-pointer"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
                    </button>
                </nav>
            )}
        </header>
    );
}
