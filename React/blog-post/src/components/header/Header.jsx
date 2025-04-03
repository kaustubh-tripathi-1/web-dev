import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { setTheme } from "../../slices/uiSlice";
import { logoutUser } from "../../slices/authSlice";
// import Notifications from "../Notifications/Notifications";

export default function Header() {
    const dispatch = useDispatch();
    const { authStatus, userData } = useSelector((state) => state.auth);
    const { theme, notifications } = useSelector((state) => state.ui);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleLogout() {
        dispatch(logoutUser());
        setIsMobileMenuOpen(false); // Close mobile menu on logout
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
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo/Title */}
                <NavLink to="/" className="text-2xl font-bold">
                    MyBlog
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                isActive
                                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                                    : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                isActive
                                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                                    : ""
                            }`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                isActive
                                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                                    : ""
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                    {authStatus ? (
                        <>
                            <NavLink
                                to="/create-post"
                                className={({ isActive }) =>
                                    `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                            >
                                Create Post
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                            >
                                {userData?.name || userData?.email || "Profile"}
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `py-1.5 px-3 hover:underline focus:underline hover:decoration-white focus:decoration-white hover:text-white hover:bg-blue-800  rounded-md  focus:text-white focus:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 active:bg-blue-800  ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                            >
                                Signup
                            </NavLink>
                        </>
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
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block py-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm px-2 ${
                                isActive
                                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                                    : ""
                            }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `block py-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm px-2 ${
                                isActive
                                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                                    : ""
                            }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `block py-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm px-2 ${
                                isActive
                                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                                    : ""
                            }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </NavLink>
                    {authStatus ? (
                        <>
                            <NavLink
                                to="/create-post"
                                className={({ isActive }) =>
                                    `block py-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm px-2 ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Create Post
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `block py-2 hover:underline focus:underline focus:outline-none ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {userData?.name || userData?.email || "Profile"}
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left py-2 text-red-400 hover:text-red-500 focus:text-red-500 focus:outline-none focus:underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `block py-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm px-2 ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `block py-2 hover:underline focus:underline focus:outline-none active:bg-blue-600 active:text-white rounded-sm px-2 ${
                                        isActive
                                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                                            : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Signup
                            </NavLink>
                        </>
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

            {/* Notifications (conditionally rendered) */}
            {notifications.length > 0 && (
                <div className="container mx-auto px-4 py-2">
                    <Notifications />
                </div>
            )}
        </header>
    );
}
