import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databaseService } from "../appwrite-services/database";
import { storageService } from "../appwrite-services/storage";

/**
 * Creates a new post in the database.
 * @param {Object} postData - The post data to create.
 * @param {string} postData.title - The post title.
 * @param {string} postData.slug - The post slug.
 * @param {string} postData.content - The post content.
 * @param {string} postData.featureImage - The featured image ID.
 * @param {string} postData.status - The post status.
 * @param {string} postData.userID - The user ID of the post author.
 * @returns {Promise<Object>} The created post object.
 */
export const createPost = createAsyncThunk(
    `postEditor/createPost`,
    async (postData, { dispatch, rejectWithValue }) => {
        try {
            const post = await databaseService.createPost(postData);
            dispatch(resetEditor());
            return post;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Updates an existing post in the database.
 * @param {Object} postData - The post data to update.
 * @param {string} postData.slug - The slug of the post to update.
 * @param {string} postData.title - The post title.
 * @param {string} postData.content - The post content.
 * @param {string} postData.featureImage - The featured image ID.
 * @param {string} postData.status - The post status.
 * @returns {Promise<Object>} The updated post object.
 */
export const updatePost = createAsyncThunk(
    `postEditor/updatePost`,
    async (postData, { dispatch, rejectWithValue }) => {
        try {
            const updatedPost = await databaseService.updatePost(
                postData.slug,
                postData
            );
            dispatch(resetEditor());
            return updatedPost;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Uploads a featured image for the post.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The ID of the uploaded file.
 */
const uploadFeatureImage = createAsyncThunk(
    `postEditor/uploadFeatureImage`,
    async (file, { rejectWithValue }) => {
        try {
            const uploadedFile = await storageService.uploadFile(file);
            return uploadedFile.$id; // Return the file ID
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Initial State for the post editor slice
 */
const initialState = {
    slug: ``,
    title: ``,
    content: ``,
    featureImage: ``,
    status: `active`,
    isEditing: false,
    loading: false,
    error: null,
};

/**
 * Redux slice for managing the post editor state.
 */
const postEditorSlice = createSlice({
    name: `postEditor`,
    initialState,
    reducers: {
        /**
         * Sets the post title and auto-generates the slug.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string} action.payload - The post title.
         */
        setTitle: (state, action) => {
            state.title = action.payload.trim();
            // Auto-generate slug from title
            state.slug = state.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
                .trim()
                .replace(/\s+/g, "-"); // Replace spaces with hyphens
        },
        /**
         * Sets the post content.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string} action.payload - The post content (HTML string from TinyMCE).
         */
        setContent: (state, action) => {
            state.content = action.payload;
        },
        /**
         * Sets the featured image ID.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string} action.payload - The featured image ID.
         */
        setFeatureImage: (state, action) => {
            state.featureImage = action.payload;
        },
        /**
         * Sets the post status.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string} action.payload - The post status ("active" or "inactive").
         */
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        /**
         * Sets the editing mode.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - Whether the editor is in editing mode.
         */
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        /**
         * Sets the loading state.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - The loading state.
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        /**
         * Sets an error message.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string|null} action.payload - The error message or null.
         */
        setError: (state, action) => {
            state.error = action.payload;
        },
        /**
         * Resets the editor state to its initial values.
         * @param {Object} state - The current state.
         */
        resetEditor: (state) => {
            state.title = ``;
            state.content = ``;
            state.featureImage = ``;
            state.status = `active`;
            state.isEditing = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Post
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Upload Feature Image
            .addCase(uploadFeatureImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadFeatureImage.fulfilled, (state, action) => {
                state.featureImage = action.payload;
                state.loading = false;
            })
            .addCase(uploadFeatureImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setTitle,
    setContent,
    setFeatureImage,
    setStatus,
    setIsEditing,
    setLoading,
    setError,
    resetEditor,
} = postEditorSlice.actions;

export default postEditorSlice.reducer;
