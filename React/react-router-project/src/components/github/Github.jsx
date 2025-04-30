import { useLoaderData } from "react-router";

export default function Github() {
    const user = useLoaderData();

    return (
        <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl flex justify-evenly items-center">
            <img src={user.avatar_url} alt="Git picture" className="w-80" />
            <p>Github followers: {user.followers}</p>
        </div>
    );
}
