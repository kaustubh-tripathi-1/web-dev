import { useParams } from "react-router";

export default function User() {
    const { userId } = useParams();
    return (
        <div className="bg-gray-600 text-white text-3xl p-4">
            User: {userId}
        </div>
    );
}
