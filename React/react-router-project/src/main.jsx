import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    BrowserRouter,
    Routes,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router";
import App from "./App.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Layout from "./components/layout/Layout.jsx";
import Contact from "./components/contact/Contact.jsx";
import Github from "./components/github/Github.jsx";
import { fetchGithubData } from "./components/github/fetchGithubData.js";
import User from "./components/user/User.jsx";

//$ 1st way to define routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "github", element: <Github />, loader: fetchGithubData },
            { path: "user/:userId", element: <User /> },
        ],
    },
]);

//$ 2nd way to define routes
/* const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/github" element={<Github />} />
            <Route path="/user/:userId" element={<User />} />
        </Route>
    )
); */

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
