import { Component } from "react";
import { Link } from "react-router";

// Classic Class based Error Boundary
export default class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to a service (e.g., Sentry) or console
        console.error("Caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold mb-6">
                            Something went wrong!
                        </h1>
                        <p className="mb-6 text-red-500">
                            {this.state.error?.message || "Unknown error"}
                        </p>
                        <Link to="/">
                            <button
                                onClick={() =>
                                    this.setState({
                                        hasError: false,
                                        error: null,
                                    })
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                                Go To Home
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Alternate React-Router functional Error Boundary

/* export default function ErrorBoundary() {
    const error = useRouteError(); // Get the error from React Router

    console.error("Caught by ErrorBoundary:", error); // Log it

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Something went wrong
                </h1>
                <p className="mb-4">{error?.message || "Unknown error"}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Reload Page
                </button>
            </div>
        </div>
    );
} */
