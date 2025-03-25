import { useState } from "react";
import BlogEditor from "./BlogEditor";

export default function App() {
    const [content, setContent] = useState("");
    return (
        <>
            <div>
                <BlogEditor onContentChange={setContent} />
                <div>
                    <h2>Preview:</h2>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </>
    );
}
