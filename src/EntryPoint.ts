import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

export default async () => {
  const chatBot = new OpenAI({
    temperature: 0.9,
  });
  const promptTemplate = new PromptTemplate({
    inputVariables: ["lang"],
    template: "{lang}でHello Worldを書いてください",
  });

  const langs = ["TypeScript", "C#", "C++", "Python", "PHP"];
  for (const lang of langs) {
    console.log("==== " + lang + " ====");
    const prompt = await promptTemplate.format({ lang });
    const response = await chatBot.call(prompt);
    console.log(response + "\n");
  }
};
