import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostBySlug, setCurrentPost } from "../../slices/postsSlice";
import parse from "html-react-parser";
import { storageService } from "../../appwrite-services/storage";
import { PostDetailSkeleton } from "../exportCompos";

export default function PostDetail() {
    const { slug } = useParams(); // Get slug from URL
    const dispatch = useDispatch();
    const { currentPost, loading, error } = useSelector((state) => state.posts);
    const { authStatus, userData } = useSelector((state) => state.auth);

    // Fetch post on mount or slug change
    useEffect(() => {
        if (slug) {
            dispatch(fetchPostBySlug(slug));
        }

        // Cleanup on unmount
        return () => {
            dispatch(setCurrentPost(null));
        };
    }, [dispatch, slug]);

    // Check if current user is the post author
    const isAuthor = authStatus && userData?.$id === currentPost?.userID;
    console.log(error, loading, currentPost);

    if (loading || currentPost) {
        return <PostDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen py-10 align-middle flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400">
                <p className="text-xl">
                    {error === "Post not found"
                        ? "Post not found"
                        : "Error loading post"}
                </p>
            </div>
        );
    }

    return (
        <section className="min-h-fit py-8 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {/* Feature Image */}
                {currentPost.featureImage && (
                    <img
                        src={storageService.getFilePreview(
                            currentPost.featureImage
                        )}
                        alt={currentPost.title}
                        className="w-full h-64 object-cover rounded-md mb-6"
                    />
                )}

                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>

                {/* Edit Button (Author Only) */}
                {isAuthor && (
                    <Link
                        to={`/edit-post/${currentPost.slug}`}
                        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        Edit Post
                    </Link>
                )}

                {/* Content */}
                <div className="prose dark:prose-invert max-w-none">
                    {parse(currentPost.content)}
                </div>
            </div>
        </section>
    );
}
