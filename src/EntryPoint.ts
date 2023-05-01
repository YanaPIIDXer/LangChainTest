import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";

export default async () => {
  const chatBot = new OpenAI({
    temperature: 0.9,
  });

  const template = new PromptTemplate({
    inputVariables: ["name"],
    template: "あなたは{name}というエンジニアです。自己紹介をしてください。",
  });

  const memory = new ConversationSummaryMemory({
    llm: chatBot,
  });

  const chain = new ConversationChain({
    llm: chatBot,
    prompt: template,
    memory,
  });

  const response = await chain.call({
    name: "TANAKA",
  });
  console.log(response.response + "\n\n");
};
