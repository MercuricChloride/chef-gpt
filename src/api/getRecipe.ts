function prompt(ingredients: string) {
  return `\
  Assuming I have normal seasonings in my kitchen create a meal with at least one course, showcase the instructions on how to cook it, using some of the following ingredients

  [INGREDIENTS]: ${ingredients}

  [RECIPE]:
  `
};

const apiKey = "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"; // Your API key from OpenAI

export default async function handler(req, res) {
  const ingredients = req.body.ingredients;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003", // The model to use
      prompt: prompt(ingredients),
      max_tokens: 300, // The maximum number of tokens to generate
      n: 1, // The number of completions to generate
      stop: "\n", // Stop generating text when a newline character is encountered
    }),
  })
  
  res.status(200).json(response);
}
