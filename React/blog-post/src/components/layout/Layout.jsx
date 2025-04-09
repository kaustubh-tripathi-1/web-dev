import { Outlet } from "react-router";
import { Footer, Header } from "../exportCompos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Layout() {
    const { isModalOpen } = useSelector((state) => state.ui);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
                <Outlet />
            </main>
            {/* {isModalOpen && <Modal />} */}
            <Footer />
        </div>
    );
}
