import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl"; // Dark mode friendly

/**
 * Highlights code blocks in blog content.
 * @param {Object} props
 * @param {string} props.code - The code string.
 * @param {string} [props.language="javascript"] - The language for highlighting.
 */
export default function CodeBlock({ code, language = "javascript" }) {
    return (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={code.trim()}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={`${className} p-4 rounded-md bg-gray-800 text-gray-100`}
                    style={style}
                >
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
}
