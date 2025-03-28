import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Import TinyMCE core and plugins
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";
// Import skins
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";

function BlogEditor({ initialValue, onContentChange }) {
    const editorRef = useRef(null);

    const handleEditorChange = (content, editor) => {
        if (onContentChange) {
            onContentChange(content);
        }
    };

    return (
        <div>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={
                    initialValue || "<p>Write your blog post here...</p>"
                }
                onEditorChange={handleEditorChange}
                init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic backcolor | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | link image table | removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    license_key: "gpl",
                    skin: false,
                    content_css: false,
                    base_url: "/tinymce",
                    suffix: ".min",
                }}
            />
        </div>
    );
}

export default BlogEditor;
