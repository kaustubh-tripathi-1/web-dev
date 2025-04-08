import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
    createPost,
    updatePost,
    uploadFeatureImage,
    setTitle,
    setContent,
    setStatus,
    setFeatureImage,
    setIsEditing,
    resetEditor,
    setError,
    setLoading,
} from "../../slices/postEditorSlice";
import { uploadFile, addUploadedFile } from "../../slices/storageSlice";
import {
    fetchPostBySlug,
    setActivePosts,
    setPosts,
} from "../../slices/postsSlice";
import { Spinner, BlogEditor } from "../exportCompos";

export default function PostEditorForm({ post }) {
    const { authStatus, userData } = useSelector((state) => state.auth);
    const {
        slug: initialSlug,
        title,
        content,
        featureImage,
        status,
        isEditing,
        loading,
        error,
    } = useSelector((state) => state.postEditor);
    const { profile: userProfile } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams(); // For editing mode
    const {
        register,
        handleSubmit,
        setValue,
        control,
        trigger,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            slug: post?.slug || initialSlug || "",
            title: post?.title || title || "",
            content: post?.content || content || "",
            featureImage: post?.featureImage || featureImage || "",
            status: post?.status || status || "active",
        },
    });

    useEffect(() => {
        if (!authStatus) {
            navigate(`/login`);
        }
        if (slug) {
            // Editing mode
            dispatch(setIsEditing(true));
            dispatch(fetchPostBySlug(slug)).then((action) => {
                if (action.meta.requestStatus === "fulfilled") {
                    const fetchedPost = action.payload;
                    dispatch(setTitle(fetchedPost.title));
                    dispatch(setContent(fetchedPost.content));
                    dispatch(setFeatureImage(fetchedPost.featureImage || ""));
                    dispatch(setStatus(fetchedPost.status));
                    setValue("title", fetchedPost.title);
                    setValue("slug", fetchedPost.slug);
                    setValue("status", fetchedPost.status);
                }
            });
        } else {
            // Create mode
            dispatch(setIsEditing(false));
            dispatch(resetEditor());
        }
    }, [authStatus, slug, dispatch, navigate, setValue]);

    /**
     * Creates a new post document in the database when form is submitted.
     * @param {Object} data - The post data to create.
     * @param {string} data.title - The title of the post.
     * @param {string} data.slug - The unique slug for the post (used as document ID).
     * @param {string} data.content - The content of the post.
     * @param {string} data.featureImage - The ID of the featured image.
     * @param {string} data.status - The status of the post (e.g., "active", "inactive").
     * @param {string} data.userID - The ID of the user who created the post.
     * @returns {Promise<void>} Returns a void promise
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async function createPostOnSubmit(data) {
        try {
            const postData = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                featureImage: featureImage || "",
                status: data.status,
                userID: userData.$id,
            };

            dispatch(setTitle(data.title));
            dispatch(setContent(data.content));
            dispatch(setFeatureImage(data.featureImage || ""));
            dispatch(setStatus(data.status));

            if (isEditing) {
                await dispatch(updatePost(postData)).unwrap();
            } else {
                const createdPost = await dispatch(
                    createPost(postData)
                ).unwrap();
                dispatch(setPosts(createdPost));
                if (postData.status === `active`) {
                    dispatch(setActivePosts(createdPost));
                }
            }
            navigate(`/`);
            // navigate(`/posts/:slug`); // Or redirect to post detail page later
        } catch (error) {
            console.error(error);
        }
    }

    async function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            try {
                const fileId = await dispatch(uploadFile(file)).unwrap();
                dispatch(setFeatureImage(fileId.name));
                dispatch(addUploadedFile(fileId.id));
                setValue("featureImage", fileId.id);
            } catch (error) {
                console.error("File upload error:", error);
                dispatch(setError(error.message || "Failed to upload image"));
            }
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    {isEditing ? "Edit Post" : "Create a New Post"}
                </h1>
                <form
                    onSubmit={handleSubmit(createPostOnSubmit)}
                    className="space-y-6"
                >
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                            Title{" "}
                            <sup
                                className="text-red-600"
                                title="required field"
                            >
                                *
                            </sup>
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title", {
                                required: "Title is required",
                                maxLength: {
                                    value: 36,
                                    message:
                                        "Title must be less than 37 characters",
                                },
                                onChange: (event) => {
                                    dispatch(setTitle(event.target.value));
                                    const slugValue = event.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9-]/g, "-")
                                        .replace(/-+/g, "-")
                                        .trim("-");
                                    setValue("slug", slugValue);
                                    trigger("slug");
                                },
                            })}
                            className={`w-full px-3 py-2 border ${
                                errors.title
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                            disabled={loading}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Slug */}
                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                            Slug{" "}
                            <sup
                                className="text-red-600"
                                title="required field"
                            >
                                *
                            </sup>
                        </label>
                        <input
                            id="slug"
                            type="text"
                            value={initialSlug}
                            {...register("slug", {
                                required: "Slug is required",
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message:
                                        "Slug must be lowercase letters, numbers, or hyphens",
                                },
                                maxLength: {
                                    value: 36,
                                    message:
                                        "Title must be less than 37 characters",
                                },
                                onChange: (event) => {
                                    const value = event.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9-]/g, "-")
                                        .replace(/-+/g, "-")
                                        .trim("-");
                                    setValue("slug", value);
                                    trigger("slug"); // Revalidate to clear errors
                                },
                            })}
                            className={`w-full px-3 py-2 border ${
                                errors.slug
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            disabled={loading}
                        />
                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label
                            htmlFor="featureImage"
                            className="block w-2/6 text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                            Featured Image
                        </label>
                        <input
                            id="featureImage"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="w-fit px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 cursor-pointer file:mr-[20%] file:rounded-lg file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-800 hover:file:bg-gray-300 dark:file:bg-gray-800 dark:file:text-violet-100 dark:hover:file:bg-gray-500"
                            disabled={loading}
                        />
                        {featureImage && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Uploaded: {featureImage}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Content{" "}
                            <sup
                                className="text-red-600"
                                title="required field"
                            >
                                *
                            </sup>
                        </label>
                        <BlogEditor
                            {...register("content", {
                                required: "Content is required",
                            })}
                            initialValue={content}
                            control={control}
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                            Status{" "}
                            <sup
                                className="text-red-600"
                                title="required field"
                            >
                                *
                            </sup>
                        </label>
                        <select
                            id="status"
                            {...register("status", {
                                required: "Status is required",
                            })}
                            onChange={(e) =>
                                dispatch(setStatus(e.target.value))
                            }
                            className={`w-full px-3 py-2 border ${
                                errors.status
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            disabled={loading}
                        >
                            <option value="active">Published</option>
                            <option value="inactive">Draft</option>
                        </select>
                        {errors.status && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    {/* Redux Error Display */}
                    {error && (
                        <p
                            className="text-center text-red-500 dark:text-red-400"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                {isEditing ? "Updating..." : "Creating..."}
                                <Spinner size="1" className="ml-2" />{" "}
                            </>
                        ) : isEditing ? (
                            "Update Post"
                        ) : (
                            "Create Post"
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
