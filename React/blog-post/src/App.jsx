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
    PostDetail,
    NotFound,
    ErrorBoundaryInRouter,
    UserProfile,
    EditProfile,
    Notifications,
} from "./components/exportCompos";
import { useEffect, useState /* lazy, Suspense */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, setInitialLoading } from "./slices/authSlice";
import { setPreferences, setProfile } from "./slices/userSlice";

/**
 * Persists the current route path in sessionStorage for redirect handling.
 * @returns {null} Renders nothing.
 */
function PathPersistor() {
    const location = useLocation();
    useEffect(() => {
        sessionStorage.setItem("lastPath", location.pathname);
    }, [location.pathname]);
    return null;
}

// Tried Lazy loading of compo
// const About = lazy(() => import("./components/about/About"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ErrorBoundaryInRouter>
                    <PathPersistor />
                    <Layout />
                </ErrorBoundaryInRouter>
            </>
        ),
        errorElement: <ErrorBoundaryInRouter />, // Root fallback
        children: [
            { path: "", index: true, element: <Home /> },
            {
                path: "about",
                element: (
                    // <Suspense
                    //     fallback={
                    //         <div className="w-full min-h-dvh flex justify-center items-center">
                    //             {" "}
                    //             <Spinner size="4" />
                    //         </div>
                    //     }
                    // >
                    <About />
                    // </Suspense>
                ),
            },
            { path: "contact", element: <Contact /> },
            {
                path: "create-post",
                element: (
                    <ProtectedRoute>
                        <PostEditorForm />
                    </ProtectedRoute>
                ),
            },
            { path: "posts/:slug", element: <PostDetail /> },
            {
                path: "edit-post/:slug",
                element: (
                    <ProtectedRoute>
                        <PostEditorForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile/:userID",
                element: (
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile/edit/:userID",
                element: (
                    <ProtectedRoute>
                        <EditProfile />
                    </ProtectedRoute>
                ),
            },
            { path: "*", element: <NotFound /> },
        ],
    },
    {
        path: "login",
        element: <Login />,
        errorElement: <ErrorBoundaryInRouter />,
    },
    {
        path: "signup",
        element: <Signup />,
        errorElement: <ErrorBoundaryInRouter />,
    },
]);

/**
 * Root component that sets up routing, auth checks, and theme toggling.
 * @returns {JSX.Element} The router provider or a loading spinner.
 */
export default function App() {
    const dispatch = useDispatch();
    const { authStatus, initialLoading } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.ui);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // Set initialLoading to true manually before checking auth
        dispatch(setInitialLoading(true));
        dispatch(checkAuthStatus()).then((action) => {
            setAuthChecked(true);
            if (action.meta.requestStatus === "fulfilled") {
                const userData = action.payload;
                dispatch(setProfile(userData));
                dispatch(setPreferences(userData.prefs));
            }
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

    return (
        <>
            <Notifications />
            <RouterProvider router={router} />
        </>
    );
}
