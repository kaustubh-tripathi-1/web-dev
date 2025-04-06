import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import {
    Home,
    Login,
    Signup,
    About,
    Contact,
    Spinner,
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
            // {
            //     path: "create-post",
            //     element: (
            //         <ProtectedRoute>
            //             <PostEditorForm />
            //         </ProtectedRoute>
            //     ),
            // },
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
