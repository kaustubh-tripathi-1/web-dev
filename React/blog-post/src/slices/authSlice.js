import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../appwrite-services/auth";
import { addNotification } from "./uiSlice"; // Import to dispatch notifications

/**
 * Logs in a user using Appwrite AuthService.
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The logged-in user's data.
 */
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            // Validation
            if (!credentials.email || !credentials.password) {
                throw new Error("Email and password are required");
            }
            await authService.login(credentials.email, credentials.password);

            const userData = await authService.getCurrentUser();
            dispatch(
                addNotification({
                    message: "Logged in successfully",
                    type: "success",
                })
            );
            return userData;
        } catch (error) {
            console.log(error, error.message, error.type, error.code);

            if (error.code === 429) {
                return rejectWithValue(
                    `Too many login attempts. Please try again after some time`
                );
            }
            if (error.code === 400 || error.code === 401) {
                return rejectWithValue("Invalid email or password");
            }
            dispatch(
                addNotification({
                    message: error.message || "Login failed",
                    type: "error",
                })
            );
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Logs out the current user using Appwrite AuthService.
 * @returns {Promise<void>}
 */
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await authService.logout();
            dispatch(
                addNotification({
                    message: "Logged out successfully",
                    type: "success",
                })
            );
            return;
        } catch (error) {
            if (error.code === 401) {
                // Session already gone, treat as success
                dispatch(
                    addNotification({
                        message: "Logged out successfully",
                        type: "success",
                    })
                );
                return;
            }
            dispatch(
                addNotification({
                    message: error.message || "Logout failed, please try again",
                    type: "error",
                })
            );
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Checks the current authentication status and fetches the current user.
 * @returns {Promise<Object|null>} The current user's data, or null if not logged in.
 */
export const checkAuthStatus = createAsyncThunk(
    "auth/checkAuthStatus",
    async (_, { rejectWithValue }) => {
        try {
            const userData = await authService.getCurrentUser();
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Initial State for the auth slice
 * @typedef {Object} AuthState
 * @property {boolean} authStatus - Indicates if the user is authenticated.
 * @property {Object|null} userData - The authenticated user's data (e.g., { $id, email, name }).
 * @property {boolean} loading - Indicates if an auth operation is in progress.
 * @property {string|null} error - Stores error messages from auth operations.
 */
const initialState = {
    authStatus: false,
    userData: null,
    loading: false,
    initialLoading: false, // For initial auth check
    error: null,
};

/**
 * Redux slice for managing authentication state.
 */
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /**
         * Sets the user as logged in and stores their data.
         * @param {AuthState} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {Object} action.payload - The user's data.
         */
        login: (state, action) => {
            state.authStatus = true;
            state.userData = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * Logs out the user and clears their data.
         * @param {AuthState} state - The current state.
         */
        logout: (state) => {
            state.authStatus = false;
            state.userData = null;
            state.loading = false;
            state.error = null;
        },
        /**
         * Sets the loading state.
         * @param {AuthState} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - The loading state.
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
            state.error = null;
        },
        setInitialLoading: (state, action) => {
            state.initialLoading = action.payload;
            state.error = null;
        },
        /**
         * Sets an error message.
         * @param {AuthState} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string|null} action.payload - The error message or null.
         */
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authStatus = true;
                state.userData = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.authStatus = false;
                state.userData = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Check Auth Status
            .addCase(checkAuthStatus.pending, (state) => {
                state.initialLoading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.initialLoading = false;
                if (action.payload) {
                    state.authStatus = true;
                    state.userData = action.payload;
                } else {
                    state.authStatus = false;
                    state.userData = null;
                }
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.initialLoading = false;
                state.authStatus = false;
                state.userData = null;
                state.error = action.payload;
            });
    },
});

export const { login, logout, setLoading, setInitialLoading, setError } =
    authSlice.actions;
export default authSlice.reducer;
