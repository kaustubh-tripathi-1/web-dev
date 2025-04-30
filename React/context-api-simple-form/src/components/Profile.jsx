import { useContext } from "react";
import UserContext from "../context/UserContext";
import "./Profile.css";

export default function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p className="login-error">Please Login again...</p>;
    }

    return (
        <div className="profile-container">
            Hi, {user.username.toUpperCase()} 👋
        </div>
    );
}
