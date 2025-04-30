import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import "./Login.css";

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /**
     * @param {Event} event
     * */
    function handleSubmit(event) {
        event.preventDefault();

        setUser({ username, password });
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                // required
            />{" "}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                // required
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
