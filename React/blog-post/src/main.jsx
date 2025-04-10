import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { ErrorBoundary } from "./components/exportCompos.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    </StrictMode>
);
