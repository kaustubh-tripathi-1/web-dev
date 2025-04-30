import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an chef that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. And please keep the markdown well formatted with headings as headings, recipe name as a h3 heading and all that. Keep the spellings correct too
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a tasty recipe you'd recommend I should make!`,
                },
            ],
            max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } catch (err) {
        console.error(`Error : ${err.message}`);
        console.log(`Failed to get Recipe form AI!`);
    }
}
