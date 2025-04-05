import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { authService } from "../../appwrite-services/auth";
import { login, setLoading, setError } from "../../slices/authSlice";
import { Spinner } from "../exportCompos";

export default function Signup() {
    const { authStatus, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange", // Validate on every change
    });

    useEffect(() => {
        if (authStatus) {
            navigate(`/`);
        }
    }, [authStatus, navigate]);

    async function signupOnSubmit(data) {
        dispatch(setLoading(true));

        try {
            // Call signUp directly (it handles login too)
            const user = await authService.signUp(
                data.email,
                data.password,
                data.name
            );
            dispatch(
                login({
                    $id: user.$id,
                    email: user.email,
                    name: user.name,
                })
            );

            navigate(`/`);
        } catch (error) {
            if (error.type === `user_already_exists`) {
                dispatch(
                    setError(`A user already exists with the same email!`)
                );
            } else {
                dispatch(setError(error.message));
            }
            console.error("Signup failed:", error, error.code, error.type);
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-6 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    Sign Up
                </h1>

                <form
                    onSubmit={handleSubmit(signupOnSubmit)}
                    className="space-y-6"
                >
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                            title="Name - required field"
                        >
                            Name <sup className="text-red-600">*</sup>
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                                maxLength: {
                                    value: 127,
                                    message:
                                        "Name must be less than 128 characters",
                                },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:border-transparent"
                            disabled={loading}
                            autoComplete="on"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email Field with Real-Time Validation */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                            title="Email - required field"
                        >
                            Email <sup className="text-red-600">*</sup>
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className={`w-full px-3 py-2 border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:border-transparent`}
                            disabled={loading}
                            autoComplete="on"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                            title="Password - required field"
                        >
                            Password{" "}
                            <sup
                                className="text-red-600"
                                title="required field"
                            >
                                *
                            </sup>
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                maxLength: {
                                    value: 256,
                                    message:
                                        "Password must be less than 256 characters",
                                },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:border-transparent"
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Error from Redux */}
                    {error && (
                        <p className="italic text-center text-red-500 dark:text-red-400">
                            {error}{" "}
                            {error ===
                                `A user already exists with the same email!` && (
                                <NavLink
                                    to="/login"
                                    className="text-blue-500 dark:text-blue-400 hover:underline focus:underline focus:outline-none transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300"
                                >
                                    Log In instead
                                </NavLink>
                            )}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                Signing Up...{" "}
                                <Spinner size="4" className="ml-2" />
                            </>
                        ) : (
                            `Sign Up`
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <NavLink
                        to="/login"
                        className="text-blue-500 dark:text-blue-400 hover:underline focus:underline focus:outline-none transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                        Log In
                    </NavLink>
                </p>
            </div>
        </div>
        // <div className="min-h-full flex items-center justify-center px-4 py-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
        //     <div className="w-full max-w-md">
        //         <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        //             {/* Name Field */}
        //             <div>
        //                 <label
        //                     htmlFor="name"
        //                     className="block text-sm font-medium mb-1"
        //                 >
        //                     Name{" "}
        //                     <sup
        //                         className="text-red-600"
        //                         title="required field"
        //                     >
        //                         *
        //                     </sup>
        //                 </label>
        //                 <input
        //                     id="name"
        //                     type="text"
        //                     {...register("name", {
        //                         required: "Name is required",
        //                         maxLength: {
        //                             value: 127,
        //                             message:
        //                                 "Name must be less than 128 characters",
        //                         },
        //                     })}
        //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     disabled={loading}
        //                     autoComplete="on"
        //                 />
        //                 {errors.name && (
        //                     <p className="mt-1 text-sm text-red-500 dark:text-red-400">
        //                         {errors.name.message}
        //                     </p>
        //                 )}
        //             </div>

        //             {/* Email Field */}
        //             <div>
        //                 <label
        //                     htmlFor="email"
        //                     className="block text-sm font-medium mb-1"
        //                 >
        //                     Email{" "}
        //                     <sup
        //                         className="text-red-600"
        //                         title="required field"
        //                     >
        //                         *
        //                     </sup>
        //                 </label>
        //                 <input
        //                     id="email"
        //                     type="email"
        //                     {...register("email", {
        //                         required: "Email is required",
        //                         pattern: {
        //                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //                             message: "Invalid email format",
        //                         },
        //                     })}
        //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     disabled={loading}
        //                     autoComplete="on"
        //                 />
        //                 {errors.email && (
        //                     <p className="mt-1 text-sm text-red-500 dark:text-red-400">
        //                         {errors.email.message}
        //                     </p>
        //                 )}
        //             </div>

        //             {/* Password Field */}
        //             <div>
        //                 <label
        //                     htmlFor="password"
        //                     className="block text-sm font-medium mb-1"
        //                 >
        //                     Password{" "}
        //                     <sup
        //                         className="text-red-600"
        //                         title="required field"
        //                     >
        //                         *
        //                     </sup>
        //                 </label>
        //                 <input
        //                     id="password"
        //                     type="password"
        //                     {...register("password", {
        //                         required: "Password is required",
        //                         minLength: {
        //                             value: 8,
        //                             message:
        //                                 "Password must be at least 8 characters",
        //                         },
        //                         maxLength: {
        //                             value: 256,
        //                             message:
        //                                 "Password must be less than 256 characters",
        //                         },
        //                     })}
        //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     disabled={loading}
        //                 />
        //                 {errors.password && (
        //                     <p className="mt-1 text-sm text-red-500 dark:text-red-400">
        //                         {errors.password.message}
        //                     </p>
        //                 )}
        //             </div>

        //             {/* Error from Redux */}
        //             {error && (
        //                 <p className="text-center text-red-500 dark:text-red-400">
        //                     {error}
        //                 </p>
        //             )}

        //             {/* Submit Button */}
        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 cursor-pointer"
        //                 disabled={loading}
        //             >
        //                 {loading ? "Signing Up..." : "Sign Up"}
        //             </button>
        //         </form>

        //         {/* Login Link */}
        //         <p className="mt-4 text-center text-sm">
        //             Already have an account?{" "}
        //             <NavLink
        //                 to="/login"
        //                 className="text-blue-500 dark:text-blue-400 hover:underline focus:underline focus:outline-none"
        //             >
        //                 Log In
        //             </NavLink>
        //         </p>
        //     </div>
        // </div>
    );
}
