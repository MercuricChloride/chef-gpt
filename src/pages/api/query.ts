import { NextApiRequest, NextApiResponse } from "next";

function prompt(ingredients: string) {
  return `\
  Assuming I have normal seasonings in my kitchen create a meal with at least one course, showcase the instructions on how to cook it, using some of the following ingredients

  In the style of a friendly cookbook, create a recipe for some of the given ingredients. Give some background on the recipe, and why it should be good. Give step by step instructions for the cooking process.

  [INGREDIENTS]: ${ingredients}

  [RECIPE]:`;
}

async function getRecipe(ingredients: string, apiKey: string) {
   return await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003", // The model to use
      prompt: prompt(ingredients),
      max_tokens: 500, // The maximum number of tokens to generate
      n: 1, // The number of completions to generate
      //stop: "\n", // Stop generating text when a newline character is encountered
    }),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get the environment variables from env.local
  const apiKey = process.env.API_KEY;
  const ingredients: string = req.body.ingredients as string;

  // call the getRecipe function
  // and wait for the response
  // then send the response to the client
  // as a json object
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }

  const response = await getRecipe(ingredients, apiKey);

  res.status(200).json(response);
}
