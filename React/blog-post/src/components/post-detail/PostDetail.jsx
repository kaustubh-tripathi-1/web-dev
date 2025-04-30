import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostBySlug, setCurrentPost } from "../../slices/postsSlice";
import parse, { domToReact } from "html-react-parser";
import { storageService } from "../../appwrite-services/storage";
import { PostDetailSkeleton, Spinner } from "../exportCompos";
import { CodeBlock } from "../exportCompos";
import DOMPurify from "dompurify";
import { openModal } from "../../slices/uiSlice";

/**
 * Displays a single blog post with edit/delete options for authors.
 * @returns {JSX.Element} The post detail component.
 */
export default function PostDetail() {
    const { slug } = useParams(); // Get slug from URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentPost, loading, error } = useSelector((state) => state.posts);
    const { authStatus, userData } = useSelector((state) => state.auth);
    const [isLoading, setisLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    // Parse content with syntax highlighting
    const parsedContent = useMemo(() => {
        if (!currentPost?.content) return null;
        return parse(DOMPurify.sanitize(currentPost.content), {
            replace: (domNode) => {
                // Handle <pre><code>...</code></pre>
                if (domNode.name === "pre" && domNode.children?.length) {
                    const codeNode = domNode.children.find(
                        (child) =>
                            child.name === "code" && child.children[0]?.data
                    );
                    if (codeNode) {
                        const code = codeNode.children[0].data;
                        const language = codeNode.attribs.class?.includes(
                            "language-"
                        )
                            ? codeNode.attribs.class.replace("language-", "")
                            : "javascript";
                        return <CodeBlock code={code} language={language} />;
                    }
                    return domToReact([domNode]); // Fallback for <pre> without <code>
                }
                // Handle standalone <code>...</code>
                if (domNode.name === "code" && domNode.children[0]?.data) {
                    const code = domNode.children[0].data;
                    const language = domNode.attribs.class?.includes(
                        "language-"
                    )
                        ? domNode.attribs.class.replace("language-", "")
                        : "javascript";
                    return <CodeBlock code={code} language={language} />;
                }
                // Remove <p> wrapping <pre>
                if (
                    domNode.name === "p" &&
                    domNode.children.some((child) => child.name === "pre")
                ) {
                    return domToReact(domNode.children);
                }
            },
        });
    }, [currentPost?.content]);

    // Fetch post on mount or slug change
    useEffect(() => {
        setisLoading(true);
        if (slug) {
            dispatch(fetchPostBySlug(slug)).finally(() => {
                setisLoading(false);
            });
        }

        // Cleanup on unmount
        return () => {
            dispatch(setCurrentPost(null));
        };
    }, [dispatch, slug]);

    /**
     * Navigates to the post editor.
     */
    function navigateToPostEditor() {
        navigate(`/edit-post/${currentPost.$id}`);
    }

    /**
     * Deletes the current post and its featured image.
     */
    function openPostDeleteModal() {
        try {
            setIsDeleting(true);
            dispatch(
                openModal({
                    type: "delete-post",
                    data: {
                        postID: currentPost?.$id,
                        featureImage: currentPost?.featureImage,
                    },
                })
            );
        } finally {
            setIsDeleting(false);
        }
    }

    const normalizedDate = new Date(currentPost?.$createdAt).toDateString();

    // Check if current user is the post author
    const isAuthor = authStatus && userData?.$id === currentPost?.userID;

    if (loading || isLoading) {
        return <PostDetailSkeleton />;
    }

    if (error || !currentPost) {
        return (
            <div className="min-h-screen py-10 flex flex-col items-center justify-center gap-20 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400">
                <p className="text-3xl">
                    {error === "Post not found" || !currentPost
                        ? "Post not found"
                        : "Error loading post"}
                </p>
                <Link
                    to="/"
                    className="text-2xl text-blue-500 dark:text-blue-500 hover:text-blue-700 hover:underline focus:text-blue-700 focus:outline-none"
                >
                    Return to Home Page
                </Link>
            </div>
        );
    }

    const imageData = currentPost.featureImage
        ? storageService.getFileView(currentPost.featureImage)
        : null;

    return (
        <section className="min-h-screen py-8 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 animate-fade-in">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {/* Feature Image */}
                {imageData && (
                    <img
                        src={imageData?.href}
                        alt={
                            currentPost.title ||
                            currentPost.featureImage ||
                            "Error in fetching image"
                        }
                        className="w-full h-fit object-contain rounded-md mb-6"
                    />
                )}

                <div className="flex flex-col">
                    <p className="text-sm">
                        By - <strong>{currentPost?.authorName}</strong>
                    </p>
                    <p className="text-sm">Posted on - {normalizedDate}</p>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>

                {/* Edit & Delete Button (Author Only) */}
                {isAuthor && (
                    <div className="mb-4 w-full h-full flex items-center gap-4">
                        <button
                            onClick={navigateToPostEditor}
                            className="w-1/2 md:w-5/24 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 focus:bg-blue-800 transition-colors duration-200 outline-none cursor-pointer"
                            aria-label="Edit Post"
                        >
                            Edit Post
                        </button>
                        <button
                            onClick={openPostDeleteModal}
                            className="w-1/2 md:w-5/24 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:bg-red-700 transition-colors duration-200 cursor-pointer outline-none"
                            aria-label="Delete Post"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <div className="w-fit flex justify-between items-center">
                                    <p className="w-fit"> Deleting Post...</p>
                                    <Spinner size="1" className="ml-2" />
                                </div>
                            ) : (
                                "Delete Post"
                            )}
                        </button>
                    </div>
                )}

                {/* Content*/}
                {/* Make sure to install @tailwindcss/typography and use prose classes to enable default styles of html tags */}
                <article className="prose dark:prose-invert max-w-none">
                    {parsedContent}
                </article>
            </div>
        </section>
    );
}
