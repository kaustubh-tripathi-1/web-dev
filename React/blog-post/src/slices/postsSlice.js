import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databaseService } from "../appwrite-services/database";
import { storageService } from "../appwrite-services/storage";

/**
 * Fetches all posts from the database.
 * @returns {Promise<Array>} Array of all posts.
 */
export const fetchAllPosts = createAsyncThunk(
    `posts/fetchAllPosts`,
    async (_, { rejectWithValue }) => {
        try {
            const posts = await databaseService.getAllPosts();
            return posts.documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Fetches active posts from the database.
 * @returns {Promise<Array>} Array of active posts.
 */
export const fetchActivePosts = createAsyncThunk(
    `posts/fetchActivePosts`,
    async (_, { rejectWithValue }) => {
        try {
            const activePosts = await databaseService.getActivePosts();
            return activePosts.documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Fetches a single post by its slug.
 * @param {string} slug - The slug of the post to fetch.
 * @returns {Promise<Object>} The post object.
 */
export const fetchPostBySlug = createAsyncThunk(
    `posts/fetchPostBySlug`,
    async (slug, { rejectWithValue }) => {
        try {
            const post = await databaseService.getPost(slug);
            return post;
        } catch (error) {
            if (error.code === 404) {
                return rejectWithValue(`Post not found`);
            }

            return rejectWithValue(error.message);
        }
    }
);

/**
 * Deletes a post from the database.
 * @param {string} slug - The slug of the post to delete.
 * @returns {Promise<string>} The deleted post's slug.
 */
export const deletePostFromDB = createAsyncThunk(
    "posts/deletePostFromDB",
    async (slug, { rejectWithValue, dispatch }) => {
        try {
            await databaseService.deletePost(slug);
            return slug;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Initial State for the posts slice
 */
const initialState = {
    posts: [], // Array of all posts
    activePosts: [], // Array of active posts
    currentPost: null, // Object for the currently viewed post
    loading: false,
    error: null,
};

/**
 * Redux slice for managing blog posts.
 */
const postsSlice = createSlice({
    name: `posts`,
    initialState,
    reducers: {
        /**
         * Sets the list of all posts.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {Array} action.payload - Array of all posts.
         */
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * Sets the list of active posts.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {Array} action.payload - Array of active posts.
         */
        setActivePosts: (state, action) => {
            state.activePosts = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * Sets the currently viewed post.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {Object|null} action.payload - The current post object or null.
         */
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * Sets the loading state.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - The loading state.
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
            state.error = null;
        },
        /**
         * Sets an error message.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string|null} action.payload - The error message or null.
         */
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        /**
         * Resets the posts state to its initial values.
         * @param {Object} state - The current state.
         */
        reset: (state) => {
            state.posts = [];
            state.activePosts = [];
            state.currentPost = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Posts
            .addCase(fetchAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Active Posts
            .addCase(fetchActivePosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActivePosts.fulfilled, (state, action) => {
                state.activePosts = action.payload;
                state.loading = false;
            })
            .addCase(fetchActivePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Post by Slug
            .addCase(fetchPostBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostBySlug.fulfilled, (state, action) => {
                state.currentPost = action.payload;
                state.loading = false;
            })
            .addCase(fetchPostBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete a post
            .addCase(deletePostFromDB.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(deletePostFromDB.fulfilled, (state, action) => {
                const slug = action.payload;
                state.posts = state.posts.filter((post) => post.slug !== slug);
                state.activePosts = state.activePosts.filter(
                    (post) => post.slug !== slug
                );
                if (state.currentPost?.slug === slug) {
                    state.currentPost = null;
                }
                state.loading = false;
            })
            .addCase(deletePostFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setPosts,
    setActivePosts,
    setCurrentPost,
    setLoading,
    setError,
    reset,
} = postsSlice.actions;
export default postsSlice.reducer;
