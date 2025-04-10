import { Link } from "react-router";
import image404 from "../../assets/not-found-404.jpg";

export default function NotFound() {
    return (
        <div className="min-h-screen w-screen bg-white text-red-600 text-2xl dark:bg-gray-800 dark:text-red-400 flex flex-col justify-center items-center">
            <img src={image404} alt="not-found-404" className="w-80" />
            {/* Attribution */}
            <a
                href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_13315300.htm#fromView=keyword&page=1&position=0&uuid=d7de2c0b-baee-45c3-af52-66e080ec7db7&query=404+Page+Found"
                target="_blank"
                className="text-sm text-amber-50 -ml-35"
            >
                Image by storyset on Freepik
            </a>
            <p className="mt-4">This page does not exist</p>
            <Link
                to="/"
                className="cursor-pointer mt-4 text-blue-500 dark:text-blue-500 hover:text-blue-700 hover:underline focus:text-blue-700 focus:outline-none"
            >
                Return to Home Page
            </Link>
        </div>
    );
}
