import { createBrowserRouter, RouterProvider, useLocation } from "react-router";
import Layout from "./components/layout/Layout";
import {
    Home,
    Login,
    Signup,
    About,
    Contact,
    Spinner,
    ProtectedRoute,
    PostEditorForm,
} from "./components/exportCompos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, setInitialLoading } from "./slices/authSlice";

// Path persistor component
function PathPersistor() {
    const location = useLocation();
    useEffect(() => {
        sessionStorage.setItem("lastPath", location.pathname);
    }, [location.pathname]);
    return null;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <PathPersistor />
                <Layout />
            </>
        ),
        children: [
            { path: "", index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            {
                path: "create-post",
                element: (
                    <ProtectedRoute>
                        <PostEditorForm />
                    </ProtectedRoute>
                ),
            },
            // { path: "posts/:slug", element: <PostDetail /> },
            // {
            //     path: "edit-post/:slug",
            //     element: (
            //         <ProtectedRoute>
            //             <PostEditorForm />
            //         </ProtectedRoute>
            //     ),
            // },
            // {
            //     path: "profile",
            //     element: (
            //         <ProtectedRoute>
            //             <UserProfile />
            //         </ProtectedRoute>
            //     ),
            // },
            // { path: "*", element: <NotFound /> },
        ],
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
]);

export default function App() {
    const dispatch = useDispatch();
    const { authStatus, initialLoading } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.ui);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // Set initialLoading to true manually before checking auth
        dispatch(setInitialLoading(true));
        dispatch(checkAuthStatus()).then(() => {
            setAuthChecked(true);
        });
    }, [dispatch]);

    useEffect(() => {
        const html = document.documentElement;
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [theme]);

    if (!authChecked || initialLoading) {
        return (
            <section className="min-h-screen flex justify-center items-center bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                <Spinner size="4" />
            </section>
        );
    }

    return <RouterProvider router={router} />;
}

/* 
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
    useLocation,
} from "react-router";
import Layout from "./components/layout/Layout";
import {
    Home,
    Login,
    Signup,
    About,
    Contact,
    Spinner,
    ProtectedRoute,
    PostEditorForm,
} from "./components/exportCompos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./slices/authSlice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            // { path: "posts/:slug", element: <PostDetail /> },
            {
                path: "create-post",
                element: (
                    <ProtectedRoute>
                        <PostEditorForm />
                    </ProtectedRoute>
                ),
            },
            // {
            //     path: "edit-post/:slug",
            //     element: (
            //         <ProtectedRoute>
            //             <PostEditorForm />
            //         </ProtectedRoute>
            //     ),
            // },
            // {
            //     path: "profile",
            //     element: (
            //         <ProtectedRoute>
            //             <UserProfile />
            //         </ProtectedRoute>
            //     ),
            // },
            // { path: "*", element: <NotFound /> },
        ],
    },
]);

function AuthWrapper({ children }) {
    const dispatch = useDispatch();
    const { initialLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    if (initialLoading) {
        return (
            <section className="min-h-screen flex justify-center items-center bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                <Spinner size="4" />
            </section>
        );
    }

    return children;
}

export default function App() {
    return (
        <AuthWrapper>
            <RouterProvider router={router} />
        </AuthWrapper>
    );
}

 */
