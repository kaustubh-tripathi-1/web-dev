// server.js
const express = require("express");
const cors = require("cors");
const { Anthropic } = require("@anthropic-ai/sdk");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/api/recipe", async (req, res) => {
    try {
        const { ingredients } = req.body;
        const ingredientsString = ingredients.join(", ");

        const SYSTEM_PROMPT = `
    You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
    `;

        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe you'd recommend which can be made with these ingredients!`,
                },
            ],
        });

        res.json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
