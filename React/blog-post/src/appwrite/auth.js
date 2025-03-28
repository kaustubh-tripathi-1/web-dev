import conf from "../conf/config";
import { Client, Account, ID, AppwriteException } from "appwrite";

/**
 * The class `AuthError` is a custom error class for authentication-related errors that extends the built-in `Error` class
 */
class AuthError extends Error {
    constructor(message, code = null, originalError = null) {
        super(message);
        this.name = "AuthError";
    }
}

/**
 * Service for handling user authentication with Appwrite.
 */
export default class AuthService {
    constructor() {
        this.client = new Client();
        this.account = null;

        try {
            this.client
                .setEndpoint(conf.appwriteEndpoint)
                .setProject(conf.appwriteProjectID);

            this.account = new Account(this.client);
        } catch (error) {
            throw new AuthError("Failed to initialize Appwrite client");
        }
    }

    /**
     * Validates email, password, and optionally name.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @param {string|null} [name=null] - User's name (optional, for signup).
     * @throws {AuthError} If validation fails.
     */
    #validateCredentials(email, password, name = null) {
        if (!email || !password || (name !== null && !name)) {
            throw new AuthError(`Email, password and name are required`);
        }
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            (name !== null && typeof name !== "string")
        ) {
            throw new AuthError(
                name !== null
                    ? "Email, password, and name must be strings"
                    : "Email and password must be strings"
            );
        }
    }

    /**
     * Signs up a new user and automatically logs them in.
     * @param {string} email - User's email address.
     * @param {string} password - User's password (minimum 8 characters).
     * @param {string} name - User's name.
     * @returns {Promise<object>} The created user object.
     * @throws {AuthError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async signUp(email, password, name) {
        email = email.trim();
        name = name.trim();
        this.#validateCredentials(email, password, name);
        if (password.length < 8) {
            throw new AuthError(`Password must be at least 8 characters long`);
        }
        if (name.length > 128) {
            throw new AuthError("Name must be less than 128 characters");
        }

        const user = await this.account.create(
            ID.unique(),
            email.toLowerCase(),
            password,
            name
        );

        // Let erros propogate to the caller as the Appwrite errors are more detailed
        await this.login(email, password);

        return user;
    }

    /**
     * Logs in a user with email and password.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @returns {Promise<object>} The session object.
     * @throws {AuthError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async login(email, password) {
        email = email.trim();
        this.#validateCredentials(email, password);

        return this.account.createEmailPasswordSession(
            email.toLowerCase(),
            password
        );
    }

    /**
     * Logs out the current user.
     * @returns {Promise<void>}
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async logout() {
        return this.account.deleteSession("current");
    }

    /**
     * Gets the current logged-in user.
     * @returns {Promise<object>} The user object.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async getCurrentUser() {
        return this.account.get();
    }

    /**
     * Asynchronously requests a password reset by creating a
     * recovery for the provided email address.
     * @param {string} email - The user's email address.
     * @param {string} [resetUrl] - The URL to redirect the user to for resetting their password. By default, if no `resetUrl` is
     * provided, it will use the current window's origin followed by `/reset-password`.
     * @returns {Promise<void>}
     * @throws {AuthError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async requestPasswordReset(
        email,
        resetURL = `${window.location.origin}/reset-password`
    ) {
        email = email.trim();
        this.#validateCredentials(email, "dummy-password"); // Reuse validation for email
        return this.account.createRecovery(email.toLowerCase(), resetURL);
    }

    /**
     * Requests an email verification link for the current user using the provided URL.
     * @param {String} verifyURL - The `verifyURL` parameter is the URL where the verification email will be
     * sent for the user to verify their email address.
     * @returns {Promise<void>} The `requestEmailVerification` function is returning a promise that resolves to the
     * result of calling the `createVerification` method on the `account` object with the `verifyURL`
     * parameter.
     */
    async requestEmailVerification(
        verifyURL = `${window.location.origin}/verify-email`
    ) {
        return this.account.createVerification(verifyURL);
    }
}

export const authService = new AuthService();
