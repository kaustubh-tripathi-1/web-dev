import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function ProtectedRoute({ children }) {
    const { authStatus } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    if (!authStatus) {
        navigate(`/`);
    }
    return children;
}
