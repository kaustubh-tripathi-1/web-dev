import appwriteConfig from "../conf/appwriteConfig";
import { Client, AppwriteException, Databases, Query } from "appwrite";

/**
 * -`DatabaseError` class
 *
 * The class `DatabaseError` is a custom error class for database-related errors that extends the built-in `Error` class
 */
class DatabaseError extends Error {
    /**
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
}

/**
 * -`DatabaseService` class
 *
 * Service for handling databases with Appwrite.
 */
export class DatabaseService {
    #client;
    #databases;

    /**
     * Initializes the Appwrite client and Databases service.
     * @throws {DatabaseError} If the Appwrite client fails to initialize.
     */
    constructor() {
        this.#client = new Client();

        try {
            this.#client
                .setEndpoint(appwriteConfig.appwriteEndpoint)
                .setProject(appwriteConfig.appwriteProjectID);

            this.#databases = new Databases(this.#client);
        } catch (error) {
            throw new DatabaseError("Failed to initialize Appwrite client");
        }
    }

    /**
     * Creates a new post document in the database.
     * @param {Object} postData - The post data to create.
     * @param {string} postData.title - The title of the post.
     * @param {string} postData.slug - The unique slug for the post (used as document ID).
     * @param {string} postData.content - The content of the post.
     * @param {string} postData.featureImage - The ID of the featured image.
     * @param {string} postData.status - The status of the post (e.g., "active", "inactive").
     * @param {string} postData.userID - The ID of the user who created the post.
     * @returns {Promise<object>} Returns a promise that resolves to the created document object.
     * @throws {DatabaseError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async createPost({ title, slug, content, featureImage, status, userID }) {
        //$ Validations
        if (!slug || typeof slug !== "string") {
            throw new DatabaseError("Slug must be a non-empty string");
        }
        if (!title || typeof title !== "string") {
            throw new DatabaseError("Title must be a non-empty string");
        }
        if (!content || typeof content !== "string") {
            throw new DatabaseError("Content must be a non-empty string");
        }
        if (!status || typeof status !== "string") {
            throw new DatabaseError("Status must be a non-empty string");
        }
        if (!userID || typeof userID !== "string") {
            throw new DatabaseError("User ID must be a non-empty string");
        }
        if (featureImage && typeof featureImage !== "string") {
            throw new DatabaseError(
                "Feature image must be a string if provided"
            );
        }

        return this.#databases.createDocument(
            appwriteConfig.appwriteDatabaseID,
            appwriteConfig.appwriteCollectionID,
            slug, // slug instead of ID.unique()
            {
                title,
                content,
                featureImage,
                status,
                userID,
            }
        );
    }

    /**
     * Updates an existing post document in the database.
     * @param {string} slug - The slug (document ID) of the post to update.
     * @param {Object} postData - The post data to update.
     * @param {string} postData.title - The updated title of the post.
     * @param {string} postData.content - The updated content of the post.
     * @param {string} postData.featureImage - The updated ID of the featured image.
     * @param {string} postData.status - The updated status of the post.
     * @param {string} postData.userID - The ID of the user who created the post (not updated).
     * @returns {Promise<object>} Returns a promise that resolves to the updated document object.
     * @throws {DatabaseError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async updatePost(slug, { title, content, featureImage, status, userID }) {
        //$ Validations
        if (!slug || typeof slug !== "string") {
            throw new DatabaseError(
                "Document ID/slug must be a non-empty string"
            );
        }
        if (title && typeof title !== "string") {
            throw new DatabaseError("Title must be a string if provided");
        }
        if (content && typeof content !== "string") {
            throw new DatabaseError("Content must be a string if provided");
        }
        if (featureImage && typeof featureImage !== "string") {
            throw new DatabaseError(
                "Feature image must be a string if provided"
            );
        }
        if (status && typeof status !== "string") {
            throw new DatabaseError("Status must be a string if provided");
        }

        return this.#databases.updateDocument(
            appwriteConfig.appwriteDatabaseID,
            appwriteConfig.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featureImage,
                status,
            }
        );
    }

    /**
     * Retrieves a list of all posts from the database.
     * @returns {Promise<object>} Returns a promise that resolves to an object containing a list of documents (e.g., { documents: [...] }).
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async getAllPosts() {
        return this.#databases.listDocuments(
            appwriteConfig.appwriteDatabaseID,
            appwriteConfig.appwriteCollectionID
        );
    }

    /**
     * Retrieves a single post by its slug.
     * @param {string} slug - The slug (document ID) of the post to retrieve.
     * @returns {Promise<object>} Returns a promise that resolves to the document object.
     * @throws {DatabaseError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async getPost(slug) {
        if (!slug || typeof slug !== `string`) {
            throw new DatabaseError(
                `Document ID/slug provided must be a non-empty string`
            );
        }

        return this.#databases.getDocument(
            appwriteConfig.appwriteDatabaseID,
            appwriteConfig.appwriteCollectionID,
            slug
        );
    }

    /**
     * Deletes a post by its slug.
     * @param {string} slug - The slug (document ID) of the post to delete.
     * @returns {Promise<void>} Returns a promise that resolves when the document is deleted.
     * @throws {DatabaseError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async deletePost(slug) {
        if (!slug || typeof slug !== "string") {
            throw new DatabaseError(
                "Document ID/slug must be a non-empty string"
            );
        }

        return this.#databases.deleteDocument(
            appwriteConfig.appwriteDatabaseID,
            appwriteConfig.appwriteCollectionID,
            slug
        );
    }

    /**
     * Retrieves a list of active posts from the database.
     * @returns {Promise<object>} Returns a promise that resolves to an object containing a list of active documents (e.g., { documents: [...] }).
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async getActivePosts() {
        return this.#databases.listDocuments(
            appwriteConfig.appwriteDatabaseID,
            appwriteConfig.appwriteCollectionID,
            [Query.equal("status", "active")]
        );
    }
}

export const databaseService = new DatabaseService();
