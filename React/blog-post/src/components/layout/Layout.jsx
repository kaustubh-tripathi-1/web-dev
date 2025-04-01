import { Outlet } from "react-router";
import { Footer, Header } from "../exportCompos";

export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
