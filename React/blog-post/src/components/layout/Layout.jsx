import { Outlet, useLocation } from "react-router";
import { Footer, Header } from "../exportCompos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Layout() {
    const { theme, isModalOpen } = useSelector((state) => state.ui);

    const location = useLocation();
    const hideHeaderFooter =
        location.pathname === "/login" || location.pathname === "/signup";

    // Toggle the 'dark' class on the html element based on the theme
    useEffect(() => {
        const html = document.documentElement;
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex flex-col min-h-screen">
            {!hideHeaderFooter && <Header />}
            <main className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
                <Outlet />
            </main>
            {/* {isModalOpen && <Modal />} */}
            {!hideHeaderFooter && <Footer />}
        </div>
    );
}
