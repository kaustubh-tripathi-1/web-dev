import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../slices/uiSlice";

/**
 * Notifications component to display toast-like alerts.
 * @returns {React.ReactElement} Notifications container
 */
const Notifications = () => {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.ui);

    // Auto-dismiss notifications
    useEffect(() => {
        notifications.forEach((notification) => {
            const timer = setTimeout(() => {
                dispatch(removeNotification(notification.id));
            }, notification.timeout);
            return () => clearTimeout(timer);
        });
    }, [notifications, dispatch]);

    if (!notifications.length) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-xs sm:max-w-sm">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`rounded-lg p-4 shadow-md transition-all duration-300 animate-slide-in ${
                        notification.type === "success"
                            ? "bg-green-500 text-white"
                            : notification.type === "error"
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                            {notification.message}
                        </p>
                        <button
                            type="button"
                            className="ml-2 text-white hover:text-gray-200"
                            onClick={() =>
                                dispatch(removeNotification(notification.id))
                            }
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Tailwind custom animation for slide-in
const customStyles = `
  @keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
`;

export default Notifications;
