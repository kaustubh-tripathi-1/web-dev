import conf from "../conf/config";
import { Client, Account, ID, AppwriteException } from "appwrite";

/**
 * -`AuthError` class
 *
 * The class `AuthError` is a custom error class for authentication-related errors that extends the built-in `Error` class
 */
class AuthError extends Error {
    constructor(message, code = null, originalError = null) {
        super(message);
        this.name = "AuthError";
    }
}

/**
 * -`AuthService` class
 *
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
     * -`validateCredentials` - Private method
     *
     * Validates email, password, and optionally name.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @param {string|null} [name=null] - User's name (optional, for signup).
     * @throws {AuthError} If validation fails.
     */
    #validateCredentials(email, password = null, name = null) {
        if (
            !email ||
            (password !== null && !password) ||
            (name !== null && !name)
        ) {
            throw new AuthError(
                name !== null
                    ? "Email, password, and name are required"
                    : password !== null
                    ? "Email and password are required"
                    : "Email is required"
            );
        }
        if (
            typeof email !== "string" ||
            (password !== null && typeof password !== "string") ||
            (name !== null && typeof name !== "string")
        ) {
            throw new AuthError(
                name !== null
                    ? "Email, password, and name must be strings"
                    : password !== null
                    ? "Email and password must be strings"
                    : "Email must be a string"
            );
        }
    }

    /**
     * -`signup`
     *
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
        if (password.length < 8 || password.length > 256) {
            throw new AuthError(`Password must be between 8 to 256 characters`);
        }
        if (name.length > 127) {
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
     * -`login`
     *
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
     * -`logout`
     *
     * Logs out the current user.
     * @returns {Promise<void>}
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async logout() {
        return this.account.deleteSession("current");
    }

    /**
     * -`getCurrentUser`
     *
     * Gets the current logged-in user.
     * @returns {Promise<object>} The user object.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async getCurrentUser() {
        return this.account.get();
    }

    /**
     * -`requestPasswordReset`
     *
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
        this.#validateCredentials(email); // Reuse validation for email
        return this.account.createRecovery(email.toLowerCase(), resetURL);
    }

    /**
     * -`completePasswordReset`
     * Completes the process of password reset after user enters a new one
     * @param {string} userID - The current logged in user's userID which will be added to url query string
     * @param {string} secretKey - The secret key received by the user in their email, also added to url query string
     * @param {string} newPassword - The new password to be updated
     */
    async completePasswordReset(userID, secretKey, newPassword) {
        if (!userID || !secretKey || !newPassword) {
            throw new AuthError(
                `User ID, secret key and new password are required to complete the password reset process`
            );
        }

        if (newPassword.length < 8 || newPassword.length > 256) {
            throw new AuthError("Password must be between 8 to 256 characters");
        }

        return this.account.updateRecovery(userID, secretKey, newPassword);
    }

    /**
     * -`requestEmailVerification`
     *
     * Requests an email verification link for the current user using the provided URL.
     * @param {string} verifyURL - The `verifyURL` parameter is the URL where the verification email will be
     * sent for the user to verify their email address.
     * @returns {Promise<void>} Returns a **promise** that resolves to the
     * result of calling the `createVerification` method on the `account` object with the `verifyURL`
     * parameter.
     */
    async requestEmailVerification(
        verifyURL = `${window.location.origin}/verify-email`
    ) {
        return this.account.createVerification(verifyURL);
    }

    /**
     * -`updateEmail`
     *
     * Updates the email of the current user.
     * @param {string} email - The new email address for the user.
     * @param {string} currentPassword - The user's current password (required for security).
     * @returns {Promise<object>} - The updated user object
     * @throws {AuthError} If validation fails or current password is missing.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async updateEmail(email, currentPassword) {
        email = email.trim();
        this.#validateCredentials(email);
        if (!currentPassword || typeof currentPassword !== "string") {
            throw new AuthError(
                `Current password is required to update the email`
            );
        }
        return this.account.updateEmail(email.toLowerCase(), currentPassword);
    }

    /**
     * -`updateName`
     *
     * Updates the name of the current user
     * @param {string} nameToUpdate - The name to be updated for the user
     * @returns {Promise<object>} - The updated user object
     * @throws {AuthError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async updateName(nameToUpdate) {
        if (!nameToUpdate) {
            throw new AuthError(`Name is required to update name`);
        }

        if (nameToUpdate.length > 127) {
            throw new AuthError("Name must be less than 128 characters");
        }

        return this.account.updateName(nameToUpdate);
    }

    /**
     * -`updatePasswrod`
     *
     * Updates the password of the current user
     * @param {string} newPassword - The password to be updated for the user
     * @param {string} oldPassword - The current password of the user
     * @returns {Promise<object>} - The updated user object
     * @throws {AuthError} If validation fails.
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async updatePassword(newPassword, oldPassword) {
        if (!newPassword) {
            throw new AuthError(
                `New Password is required to update password. Duhhh!`
            );
        }
        if (!oldPassword) {
            throw new AuthError(
                `Old Password is required to update password. Duhhh!`
            );
        }

        if (newPassword.length < 8 || newPassword.length > 256) {
            throw new AuthError("Password must be between 8 to 256 characters");
        }

        return this.account.updatePassword(newPassword, oldPassword);
    }
}

export const authService = new AuthService();
