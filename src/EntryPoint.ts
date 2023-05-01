import { OpenAI } from "langchain/llms/openai";
import * as Tools from "langchain/tools";
import * as Agents from "langchain/agents";
import { WeatherFetchTool } from "./Weather";

export default async () => {
  const chatBot = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
  });

  const agent = await Agents.initializeAgentExecutorWithOptions(
    [new WeatherFetchTool()],
    chatBot,
    {
      //verbose: true,
      agentType: "zero-shot-react-description",
    }
  );

  const response = await agent.call({
    input: "東京都の天気を教えてください。出力は日本語でお願いします。",
  });
  console.log(response);
};
