import { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromMistral } from "./ai.js";

export default function MainSection() {
    const [ingredients, setIngredients] = useState([]);

    const [recipeFromAI, setRecipeFromAI] = useState("");

    function addIngredient(formData) {
        let newIngredient = formData.get("ingredient");
        if (
            typeof newIngredient === "string" &&
            newIngredient.trim() !== "" &&
            !ingredients.includes(newIngredient.trim().toLowerCase())
        ) {
            setIngredients([
                ...ingredients,
                newIngredient.trim().toLowerCase(),
            ]);
        }
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        console.log(recipeMarkdown);

        setRecipeFromAI(recipeMarkdown);
    }

    const recipeSectionRef = useRef(null);
    useEffect(() => {
        if (recipeFromAI && recipeSectionRef.current) {
            recipeSectionRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [recipeFromAI]);

    return (
        <main className="h-fit w-full p-6">
            <form
                className="mx-auto flex w-[90%] transform flex-wrap items-center justify-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105"
                onSubmit={(event) => {
                    event.preventDefault();
                    addIngredient(new FormData(event.currentTarget));
                    event.currentTarget.reset();
                }}
            >
                <label htmlFor="ingredient" className="text-lg font-medium">
                    Enter Ingredient:
                </label>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    className="h-10 w-40 rounded-lg border border-gray-300 p-2 sm:w-60 md:w-80"
                    name="ingredient"
                    id="ingredient"
                />
                <button
                    type="submit"
                    className="h-10 w-40 cursor-pointer rounded-lg bg-gray-950 font-bold text-white shadow-md transition before:mr-1 before:content-['+'] hover:bg-gray-800 focus:bg-gray-800 active:scale-95"
                >
                    Add Ingredient
                </button>
            </form>
            <IngredientsList
                ingredients={ingredients}
                getRecipe={getRecipe}
                recipeFromAI={recipeFromAI}
                ref={recipeSectionRef}
            />
        </main>
    );
}
