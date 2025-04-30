import Markdown from "react-markdown";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import "./ClaudeRecipe.css";

export default function ClaudeRecipe({ recipeFromAI, ref }) {
    const [showMarkdown, setShowMarkdown] = useState(false);

    return (
        <section className="suggested-recipe-container prose mx-auto mt-6 w-[90%] rounded-lg bg-blue-50 p-8 text-blue-900 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold" ref={ref}>
                Chef Claude Recommends:
            </h2>
            <article
                className="suggested-recipe-article prose"
                aria-live="polite"
            >
                {/* {!showMarkdown ? (
                    <TypeAnimation
                        sequence={[
                            "Generating recipe...",
                            1000, // Show "Generating recipe..." for 1 sec
                            () => setShowMarkdown(true), // Then show full markdown
                        ]}
                        speed={10} // Super-fast effect
                        cursor={false}
                    />
                ) : (
                    <Markdown>{recipeFromAI}</Markdown>
                )} */}
                <Markdown>{recipeFromAI}</Markdown>
            </article>
        </section>
    );
}
