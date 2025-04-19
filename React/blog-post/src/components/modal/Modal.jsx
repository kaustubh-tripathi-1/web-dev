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
            if (event.key === "Escape" && isModalOpen) {
                handleClose();
            }
        }
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isModalOpen, handleClose]);

    if (!isModalOpen) return null;

    // Handle logout
    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            dispatch(logout());
            dispatch(
                addNotification({
                    message: "Logged out successfully",
                    type: "success",
                })
            );
            dispatch(clearNotifications()); // Clear notifications before navigation
            navigate("/login");
            handleClose();
        } catch (error) {
            console.error("Logout failed:", error);
            dispatch(
                addNotification({
                    message: error || "Logout failed",
                    type: "error",
                })
            );
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
            dispatch(
                addNotification({
                    message: "Post deleted successfully",
                    type: "success",
                })
            );
            navigate("/");
            handleClose();
        } catch (error) {
            console.error("Delete Post failed:", error);
            dispatch(
                addNotification({
                    message: error || "Delete failed",
                    type: "error",
                })
            );
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
        },
        logout: {
            title: "Confirm Logout",
            message: "Are you sure you want to log out?",
            confirmText: "Yes, I'm sure!!🙄 Log Out",
            cancelText: "Cancel",
            confirmAction: handleLogout,
        },
    };

    const config = modalConfigs[modalType] || {
        title: "Modal",
        message: children || "No content provided.",
        confirmText: "Confirm",
        cancelText: "Cancel",
        confirmAction: handleClose,
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                isClosing ? "opacity-0" : "opacity-100"
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
                        className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={handleClose}
                    >
                        {config.cancelText}
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-700 transition-colors cursor-pointer"
                        onClick={config.confirmAction}
                    >
                        {config.confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default memo(Modal);
