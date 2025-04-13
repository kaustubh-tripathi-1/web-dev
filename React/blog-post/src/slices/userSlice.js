import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../appwrite-services/auth";
import { setTheme } from "./uiSlice"; // Import setTheme to sync theme with uiSlice

/**
 * Fetches the user's profile from Appwrite.
 * @returns {Promise<Object>} The user's profile data (e.g., { name, email }).
 */
export const fetchProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const profile = await authService.getProfile();
            return profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Updates the user's profile in Appwrite.
 * @param {Object} profileData - The updated profile data (e.g., { name, email }).
 * @returns {Promise<Object>} The updated profile data.
 */
export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            // Validation
            if (!profileData.name || !profileData.email) {
                throw new Error("Name and email are required");
            }
            const updatedProfile = await authService.updateProfile(profileData);
            return updatedProfile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Fetches the user's preferences from Appwrite.
 * @returns {Promise<Object>} The user's preferences (e.g., { theme, notifications }).
 */
export const fetchPreferences = createAsyncThunk(
    "user/fetchPreferences",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const preferences = await authService.getPreferences();
            // Sync theme with uiSlice if preferences include a theme
            if (preferences.theme) {
                dispatch(setTheme(preferences.theme));
            }
            return preferences;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Updates the user's preferences in Appwrite.
 * @param {Object} preferencesData - The updated preferences (e.g., { theme, notifications }).
 * @returns {Promise<Object>} The updated preferences.
 */
export const updatePreferences = createAsyncThunk(
    "user/updatePreferences",
    async (preferencesData, { rejectWithValue, dispatch }) => {
        try {
            // Validation
            if (
                !preferencesData.theme ||
                typeof preferencesData.notifications !== "boolean"
            ) {
                throw new Error(
                    "Theme and notifications preference are required"
                );
            }
            const updatedPreferences = await authService.updatePreferences(
                preferencesData
            );
            // Sync theme with uiSlice if updated preferences include a theme
            if (updatedPreferences.theme) {
                dispatch(setTheme(updatedPreferences.theme));
            }
            return updatedPreferences;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Fetches the user's posts from Appwrite.
 * @param {string} userID - The ID of the user.
 * @returns {Promise<Array>} Array of the user's posts.
 */
export const getUserPosts = createAsyncThunk(
    "user/getUserPosts",
    async (userID, { rejectWithValue }) => {
        try {
            const posts = await databaseService.getUserPosts(userID);
            return posts.documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Initial State for the user slice
 */
const initialState = {
    profile: null, // e.g., { name: "John Doe", email: "john@example.com" }
    preferences: null, // e.g., { theme: "dark", notifications: true }
    userPosts: [],
    loading: false,
    error: null,
};

/**
 * Redux slice for managing user profile and preferences.
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * Sets the user's profile.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {Object} action.payload - The user's profile data.
         */
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        /**
         * Sets the user's preferences.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {Object} action.payload - The user's preferences.
         */
        setPreferences: (state, action) => {
            state.preferences = action.payload;
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
         * Clears all posts from userPosts state.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         */
        clearUserPosts: (state, action) => {
            state.userPosts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Preferences
            .addCase(fetchPreferences.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPreferences.fulfilled, (state, action) => {
                state.loading = false;
                state.preferences = action.payload;
            })
            .addCase(fetchPreferences.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Preferences (with optimistic update)
            .addCase(updatePreferences.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.preferences = action.meta.arg; // Optimistic update
            })
            .addCase(updatePreferences.fulfilled, (state, action) => {
                state.loading = false;
                state.preferences = action.payload;
            })
            .addCase(updatePreferences.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.preferences = initialState.preferences; // Roll back on failure
            })
            // Get User Posts
            .addCase(getUserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.userPosts = action.payload;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Reset state on logout (from authSlice)
            .addCase("auth/logoutUser", (state) => {
                state.profile = null;
                state.preferences = null;
                state.userPosts = [];
                state.loading = false;
                state.error = null;
            });
    },
});

export const {
    setProfile,
    setPreferences,
    setLoading,
    setError,
    clearUserPosts,
} = userSlice.actions;

export default userSlice.reducer;
