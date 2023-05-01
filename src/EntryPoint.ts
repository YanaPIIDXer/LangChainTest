import { OpenAI } from "langchain/llms/openai";

export default async () => {
  const chatBot = new OpenAI({
    temperature: 0.9,
  });
  const response = await chatBot.call(
    "TypeScriptでHello Worldを書いてください。また、ソースコードも解説してください。"
  );
  console.log(response);
};
