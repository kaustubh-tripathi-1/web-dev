import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: false,
    userData: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: `auth`,
    initialState,
    reducers: {
        login: (state, action) => {
            state.authStatus = true;
            state.userData = action.payload;
            state.loading = false;
            state.error = null;
        },
        logout: (state, action) => {
            state.authStatus = false;
            state.userData = null;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
