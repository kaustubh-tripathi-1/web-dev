import appwriteConfig from "../conf/appwriteConfig";
import { Client, Account, ID, AppwriteException, Storage } from "appwrite";

class StorageError extends Error {
    constructor(message) {
        super(message);
        this.name = "StorageError";
    }
}

class StorageService {
    #client;
    #storage;

    constructor() {
        this.#client = new Client();

        try {
            this.#client
                .setEndpoint(appwriteConfig.appwriteEndpoint)
                .setProject(appwriteConfig.appwriteProjectID);

            this.#storage = new Storage(this.#client);
        } catch (error) {
            throw new StorageError("Failed to initialize Appwrite client");
        }
    }
}
