import { useState } from "react";
import "./App.css";
import UserContext from "./context/UserContext.js";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";

function App() {
    const [user, setUser] = useState({ username: "", password: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <main className="container">
                <Login />
                {user.username && <Profile />}
            </main>
        </UserContext.Provider>
    );
}

export default App;
