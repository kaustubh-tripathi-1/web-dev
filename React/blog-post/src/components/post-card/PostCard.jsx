import { memo } from "react";
import { NavLink } from "react-router";

function PostCard({ to, title }) {
    return (
        <NavLink to={to} className="outline-none">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 hover:text-blue-300 dark:hover:text-blue-300">
                    {title}
                </h2>
                <span className="text-blue-500 dark:text-blue-400 hover:underline focus:underline focus:outline-none">
                    Read More
                </span>
            </div>
        </NavLink>
    );
}
export default memo(PostCard);
