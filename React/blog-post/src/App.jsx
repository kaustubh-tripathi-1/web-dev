import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import { Home, Login, Signup } from "./components/exportCompos";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "posts/:slug", element: <PostDetail /> },
            {
                path: "create-post",
                element: (
                    <ProtectedRoute>
                        <PostEditorForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: "edit-post/:slug",
                element: (
                    <ProtectedRoute>
                        <PostEditorForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                ),
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
