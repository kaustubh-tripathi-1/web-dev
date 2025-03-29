import appwriteConfig from "../conf/appwriteConfig";
import {
    Client,
    Account,
    ID,
    AppwriteException,
    Databases,
    Query,
} from "appwrite";

/**
 * -`DatabaseError` class
 *
 * The class `DatabaseError` is a custom error class for database-related errors that extends the built-in `Error` class
 */
class DatabaseError extends Error {
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

    async createPost({ title, slug, content, featureImage, status, userID }) {
        try {
            return await this.#databases.createDocument(
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
        } catch (error) {
            throw new DatabaseError(
                `Error encountered while creating a document`
            );
        }
    }
}

export const databaseService = new DatabaseService();
