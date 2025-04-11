import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storageService } from "../appwrite-services/storage";

/**
 * Uploads a file to Appwrite storage.
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} The ID of the uploaded file.
 */
export const uploadFeaturedImage = createAsyncThunk(
    "storage/uploadFeaturedImage",
    async (file, { rejectWithValue }) => {
        try {
            if (!file || !(file instanceof File)) {
                throw new Error("A valid file is required for upload");
            }
            const uploadedFile = await storageService.uploadFile(file);
            return uploadedFile; // Return the file data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Downloads a file from Appwrite storage.
 * @param {string} fileID - The ID of the file to download.
 * @returns {Promise<string>} The URL of the downloaded file.
 */
export const downloadFile = createAsyncThunk(
    "storage/downloadFile",
    async (fileID, { rejectWithValue }) => {
        try {
            if (!fileID || typeof fileID !== "string") {
                throw new Error("A valid file ID is required for download");
            }
            const fileUrl = await storageService.getFileData(fileID);
            return fileUrl; // Return the file URL
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Delete a file from Appwrite storage.
 * @param {string} fileID - The ID of the file to download.
 * @returns {void} nothing
 */
export const deleteFile = createAsyncThunk(
    "storage/deleteFile",
    async (fileID, { rejectWithValue }) => {
        try {
            if (!fileID || typeof fileID !== "string") {
                throw new Error("A valid file ID is required for download");
            }
            const imageData = await storageService.deleteFile(fileID);
            return imageData; // Return the file URL
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Initial State for the storage slice
 */
const initialState = {
    uploading: false,
    downloading: false,
    deleting: false,
    uploadedFiles: [], // Array of file data
    error: null,
};

/**
 * Redux slice for managing file uploads and downloads.
 */
const storageSlice = createSlice({
    name: "storage",
    initialState,
    reducers: {
        /**
         * Sets the uploading state.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - The uploading state.
         */
        setUploading: (state, action) => {
            state.uploading = action.payload;
        },
        /**
         * Sets the downloading state.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - The downloading state.
         */
        setDownloading: (state, action) => {
            state.downloading = action.payload;
        },
        /**
         * Sets the deleting state.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {boolean} action.payload - The deleting state.
         */
        setDeleting: (state, action) => {
            state.deleting = action.payload;
        },
        /**
         * Adds a file ID to the uploadedFiles array.
         * @param {Object} state - The current state.
         * @param {Object} action - The action with payload.
         * @param {string} action.payload - The file ID to add.
         */
        addUploadedFile: (state, action) => {
            state.uploadedFiles.push(action.payload);
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
         * Clears the uploadedFiles array.
         * @param {Object} state - The current state.
         */
        clearUploadedFiles: (state) => {
            state.uploadedFiles = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Upload File
            .addCase(uploadFeaturedImage.pending, (state) => {
                state.uploading = true;
                state.error = null;
            })
            .addCase(uploadFeaturedImage.fulfilled, (state, action) => {
                state.uploading = false;
                state.uploadedFiles.push(action.payload); // Add the file ID to uploadedFiles
            })
            .addCase(uploadFeaturedImage.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload;
            })
            // Download File
            .addCase(downloadFile.pending, (state) => {
                state.downloading = true;
                state.error = null;
            })
            .addCase(downloadFile.fulfilled, (state) => {
                state.downloading = false;
            })
            .addCase(downloadFile.rejected, (state, action) => {
                state.downloading = false;
                state.error = action.payload;
            })
            // Delete File
            .addCase(deleteFile.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteFile.fulfilled, (state) => {
                state.deleting = false;
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
            });
    },
});

export const {
    setUploading,
    setDownloading,
    setDeleting,
    addUploadedFile,
    setError,
    clearUploadedFiles,
} = storageSlice.actions;

export default storageSlice.reducer;
