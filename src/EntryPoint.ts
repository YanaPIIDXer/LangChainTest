import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export default async () => {
  const chatBot = new OpenAI({
    temperature: 0.9,
  });
  const promptTemplate = new PromptTemplate({
    inputVariables: ["lang"],
    template: "{lang}でHello Worldを書いてください",
  });

  const chain = new LLMChain({ llm: chatBot, prompt: promptTemplate });

  const langs = ["TypeScript", "C#", "C++", "Python", "PHP"];
  for (const lang of langs) {
    console.log("==== " + lang + " ====");
    const response = await chain.call({ lang });
    console.log(response["text"]);
  }
};
