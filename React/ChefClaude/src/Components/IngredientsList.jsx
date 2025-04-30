import ClaudeRecipe from "./ClaudeRecipe.jsx";

export default function IngredientsList({
    ingredients,
    getRecipe,
    recipeFromAI,
    ref,
}) {
    const listOfIngredients = ingredients.map((ingredient, index) => (
        <li key={index} className="animate-fadeIn">
            <em>{ingredient[0].toUpperCase() + ingredient.slice(1)}</em>
        </li>
    ));

    return (
        <section className="flex w-full flex-col items-center p-6">
            {ingredients.length > 0 && (
                <h2 className="mb-3 text-2xl font-bold">
                    Ingredients on hand:
                </h2>
            )}
            <ul className="list-disc space-y-2 text-lg text-gray-700">
                {listOfIngredients}
            </ul>
            {ingredients.length >= 4 && (
                <div
                    className="mt-6 flex flex-col items-center gap-2 rounded-xl bg-yellow-200 p-5 shadow-md"
                    ref={ref}
                >
                    <h3 className="text-xl font-semibold">
                        Ready for a recipe?
                    </h3>
                    <p className="text-sm">
                        Generate a recipe from your ingredients.
                    </p>
                    <button
                        type="button"
                        className="mt-2 cursor-pointer rounded-lg bg-[#D17557] px-4 py-2 text-white shadow-md transition hover:bg-green-700 focus:bg-green-700"
                        onClick={getRecipe}
                    >
                        {recipeFromAI ? `Get another Recipe` : `Get a Recipe`}
                    </button>
                </div>
            )}
            {recipeFromAI && (
                <ClaudeRecipe recipeFromAI={recipeFromAI} ref={ref} />
            )}
        </section>
    );
}
