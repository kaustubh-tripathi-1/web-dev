import { memo } from "react";
import { NavLink } from "react-router";

function PostCard({ to, title, onClick }) {
    function handleClick(e) {
        if (onClick) {
            onClick(e);
        }
    }

    return (
        <NavLink
            to={to}
            tabIndex={0}
            className="block focus:outline-1 focus:outline-blue-500 focus:outline-offset-2 no-underline"
            onClick={handleClick}
        >
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 hover:text-blue-300 dark:hover:text-blue-300 mt-0">
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
