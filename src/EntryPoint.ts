import { OpenAI } from "langchain/llms/openai";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
import * as fs from "fs";

export default async () => {
  // ↓「魔法少女まどか☆マギカ」の「鹿目まどか」になりきらせるためのプロンプト
  //   アニメ上での台詞をサンプルに含むので、テキストファイルはリポジトリの管理外としている
  const madokaPrompt = fs
    .readFileSync("./templates/secrets/Madoka.txt")
    .toString();

  const chatBot = new OpenAI({
    modelName: "gpt-3.5-turbo", // MEMO: こいつを記述したら何故か空文字問題が解決した
    temperature: 0.2,
  });

  const prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(madokaPrompt),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);

  const chain = new ConversationChain({
    llm: chatBot,
    prompt,
    verbose: true,
  });

  const response = await chain.predict({ text: "あなたの名前は？" });
  console.log(response || "No Message"); // MEMO: 何故か空文字が返ってきていた
};
