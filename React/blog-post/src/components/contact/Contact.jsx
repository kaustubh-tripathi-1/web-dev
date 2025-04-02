export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg mb-4">
                We’d love to hear from you! Whether you have feedback,
                questions, or collaboration ideas, feel free to reach out.
            </p>
            <p className="text-lg mb-4">
                Email us at:{" "}
                <a
                    href="mailto:support@myblog.com"
                    className="text-blue-500 hover:underline"
                >
                    support@myblog.com
                </a>
            </p>
            <p className="text-lg">
                Follow us on social media for updates and more:
            </p>
            <ul className="list-disc list-inside mt-2">
                <li>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Twitter
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        GitHub
                    </a>
                </li>
            </ul>
        </div>
    );
}
