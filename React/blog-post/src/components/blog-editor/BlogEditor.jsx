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
// import "tinymce/skins/ui/oxide/content.min.css";
// import "tinymce/skins/content/default/content.min.css";

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
                    content_style: `
                        body {
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            margin: 0;
                            line-height: 1.4;
                        }
                        table {
                            border-collapse: collapse;
                        }
                        table:not([cellpadding]) td,
                        table:not([cellpadding]) th {
                            padding: 0.4rem;
                        }
                        table[border]:not([border="0"]):not([style*="border-width"]) td,
                        table[border]:not([border="0"]):not([style*="border-width"]) th {
                            border-width: 1px;
                        }
                        table[border]:not([border="0"]):not([style*="border-style"]) td,
                        table[border]:not([border="0"]):not([style*="border-style"]) th {
                            border-style: solid;
                        }
                        table[border]:not([border="0"]):not([style*="border-color"]) td,
                        table[border]:not([border="0"]):not([style*="border-color"]) th {
                            border-color: #ccc;
                        }
                        figure {
                            display: table;
                            margin: 1rem auto;
                        }
                        figure figcaption {
                            color: #999;
                            display: block;
                            margin-top: 0.25rem;
                            text-align: center;
                        }
                        hr {
                            border-color: #ccc;
                            border-style: solid;
                            border-width: 1px 0 0 0;
                        }
                        code {
                            background-color: #e8e8e8;
                            border-radius: 3px;
                            padding: 0.1rem 0.2rem;
                        }
                        .mce-content-body:not([dir="rtl"]) blockquote {
                            border-left: 2px solid #ccc;
                            margin-left: 1.5rem;
                            padding-left: 1rem;
                        }
                        .mce-content-body[dir="rtl"] blockquote {
                            border-right: 2px solid #ccc;
                            margin-right: 1.5rem;
                            padding-right: 1rem;
                        }
                    `,
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
