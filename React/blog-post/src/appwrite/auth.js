import conf from "../conf/config";
import { Client, Account, ID, AppwriteException } from "appwrite";

/**
 * The class `AuthError` is a custom error class in JavaScript that extends the built-in `Error` class
and allows for additional properties like `code` and `originalError`. */
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
     * The function `validateCredentials` checks if email, password, and name are provided and are of
     * type string, throwing an error if any condition is not met.
     * @param {String} email - The `email` parameter is used to represent the email address provided by the user
     * for authentication.
     * @param {String} password - The `password` parameter is a required parameter for the `validateCredentials`
     * function. It should be a string value.
     * @param {String} [name=null] - The `name` parameter in the `validateCredentials` function is optional. If
     * provided, it should be a string. If not provided, the function will still validate the `email`
     * and `password` parameters.
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
     * The function `signUp` takes in email, password, and name as parameters, validates them, creates
     * a new user account, and automatically creates a session for the user with email and password.
     * @param {String} email - The `email` parameter is the email address that the user wants to sign up with.
     * @param {String} password - The `password` parameter in the `signUp` function is a string that represents
     * the user's chosen password for their account.
     * @param {String} name - The `name` parameter in the `signUp` function refers to the name of the user who
     * is signing up for an account. It is a required field along with the email and password when
     * creating a new account.
     * @returns The `signUp` function returns the user object after creating a new account and
     * session with the provided email, password, and name.
     */
    async signUp(email, password, name) {
        email = email.trim();
        name = name.trim();
        this.#validateCredentials(email, password, name);
        if (password.length < 8) {
            throw new AuthError(`Password must be at least 8 characters long`);
        }

        const user = this.account.create(
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
     * The `login` function asynchronously validates the user's email and password credentials and
     * creates a session using the provided email and password.
     * @param {String} email - The `email` parameter is the email address entered by the user for logging in.
     * @param {String} password - The `password` parameter in the `login` function is a string that represents
     * the password entered by the user for authentication.
     * @returns The `login` function is returning the result of calling
     * `this.account.createEmailPasswordSession` with the email converted to lowercase and the password
     * as arguments.
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
     * The `logout` function asynchronously deletes the current session for the account.
     * @returns The `logout` function is returning a promise that resolves when the `deleteSession`
     * method of the `account` object is called with the argument "current".
     * @throws {AppwriteException} If the Appwrite API call fails.
     */
    async logout() {
        return this.account.deleteSession("current");
    }

    /**
     * The `getCurrentUser` function is an asynchronous function that returns the current user's
     * account information.
     * @returns The `getCurrentUser` function is returning the result of calling the `get` method on
     * the `account` object.
     */
    async getCurrentUser() {
        return this.account.get();
    }
}

export const authService = new AuthService();
