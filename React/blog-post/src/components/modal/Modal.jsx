/** @jsxImportSource react */
import { memo, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    closeModal,
    addNotification,
    clearNotifications,
} from "../../slices/uiSlice";
import { logoutUser, logout } from "../../slices/authSlice";
import { deletePostFromDB } from "../../slices/postsSlice";
import { deleteFile } from "../../slices/storageSlice";
import { Spinner } from "../exportCompos";
import { setPreferences, setProfile } from "../../slices/userSlice";

/**
 * Reusable Modal component for displaying confirmations or custom content.
 * @param {Object} props - Component props
 * @param {string} props.modalType - Type of modal (e.g., 'delete-post', 'logout')
 * @param {Object} [props.modalData] - Optional data for the modal (e.g., { slug })
 * @param {React.ReactNode} props.children - Custom content or form
 * @returns {React.ReactElement | null} Modal portal or null if not open
 */
function Modal({ modalType, modalData, children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isModalOpen } = useSelector((state) => state.ui);
    const { preferences } = useSelector((state) => state.user);
    const { loading: postsLoading } = useSelector((state) => state.posts);
    const { deleting: storageDeleting } = useSelector((state) => state.storage);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const [isClosing, setIsClosing] = useState(false);

    // Handle close with animation
    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            dispatch(closeModal());
        }, 300); // Match Tailwind animation duration
    }, [dispatch]);

    // Prevent click propagation on modal content
    const handleContentClick = useCallback((event) => {
        event.stopPropagation();
    }, []);

    // Close modal on Escape key
    useEffect(() => {
        function handleEscape(event) {
            if (
                event.key === "Escape" &&
                isModalOpen &&
                !postsLoading &&
                !storageDeleting &&
                !authLoading
            ) {
                handleClose();
            }
        }
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isModalOpen, handleClose, postsLoading, storageDeleting, authLoading]);

    if (!isModalOpen) return null;

    // Handle logout
    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            dispatch(logout());
            if (preferences?.notifications) {
                dispatch(
                    addNotification({
                        message: "Logged out successfully",
                        type: "success",
                    })
                );
            }
            // dispatch(clearNotifications()); // Clear notifications before navigation
            dispatch(setProfile(null));
            dispatch(setPreferences(null));
            navigate("/login");
            handleClose();
        } catch (error) {
            console.error("Logout failed:", error);
            if (preferences?.notifications) {
                dispatch(
                    addNotification({
                        message: error || "Logout failed",
                        type: "error",
                    })
                );
            }
            handleClose();
        }
    }, [dispatch, navigate, handleClose]);

    // Handle post deletion
    const handleDeletePost = useCallback(async () => {
        try {
            await dispatch(deletePostFromDB(modalData.postID)).unwrap();
            if (modalData.featureImage) {
                await dispatch(deleteFile(modalData.featureImage)).unwrap();
            }
            if (preferences?.notifications) {
                dispatch(
                    addNotification({
                        message: "Post deleted successfully",
                        type: "success",
                    })
                );
            }
            navigate("/");
            handleClose();
        } catch (error) {
            console.error("Delete Post failed:", error);
            if (preferences?.notifications) {
                dispatch(
                    addNotification({
                        message: error || "Delete failed",
                        type: "error",
                    })
                );
            }
            handleClose();
        }
    }, [dispatch, modalData, navigate, handleClose]);

    // Modal configurations based on type
    const modalConfigs = {
        "delete-post": {
            title: "Delete Post",
            message:
                "Are you sure you want to delete this post? This action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Cancel",
            confirmAction: handleDeletePost,
            isLoading: postsLoading || storageDeleting,
        },
        logout: {
            title: "Confirm Logout",
            message: "Are you sure you want to log out?",
            confirmText: "Yes, I'm sure!!🙄 Log Out",
            cancelText: "Cancel",
            confirmAction: handleLogout,
            isLoading: authLoading,
        },
    };

    const config = modalConfigs[modalType] || {
        title: "Modal",
        message: children || "No content provided.",
        confirmText: "Confirm",
        cancelText: "Cancel",
        confirmAction: handleClose,
        isLoading: false,
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                isClosing
                    ? "opacity-0 animate-fade-out"
                    : "opacity-100 animate-fade-in"
            }`}
            onClick={handleClose}
            role="dialog"
            aria-labelledby="modal-title"
        >
            <div
                className={`mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl transition-transform duration-300 dark:bg-gray-800 sm:max-w-lg ${
                    isClosing ? "scale-95" : "scale-100"
                }`}
                onClick={handleContentClick}
            >
                <h2
                    id="modal-title"
                    className="mb-4 text-xl font-semibold text-gray-900 dark:text-white"
                >
                    {config.title}
                </h2>
                <div className="mb-6 text-gray-700 dark:text-gray-200 prose dark:prose-invert">
                    {children || config.message}
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-gray-600"
                        onClick={handleClose}
                        disabled={config.isLoading}
                    >
                        {config.cancelText}
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-700 transition-colors cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-red-600"
                        onClick={config.confirmAction}
                        disabled={config.isLoading}
                    >
                        {config.isLoading ? (
                            <div className="flex justify-center items-center">
                                {modalType === "delete-post"
                                    ? "Deleting..."
                                    : "Logging out..."}
                                <Spinner size="1" className="ml-2" />
                            </div>
                        ) : (
                            config.confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default memo(Modal);
