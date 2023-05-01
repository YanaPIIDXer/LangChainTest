import { OpenAI } from "langchain/llms/openai";
import * as Tools from "langchain/tools";
import * as Agents from "langchain/agents";
import { parse as parseYaml } from "yaml";
import * as fs from "fs";

export default async () => {
  const chatBot = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
  });

  // ↓ChatGPTに生成してもらったTODOアプリのAPI仕様
  //  一応管理対象外とする
  const yamlOrigin = fs
    .readFileSync("./secrets/openapi/TodoManage.yaml")
    .toString();
  const yaml = parseYaml(yamlOrigin);
  const jsonSpec = new Tools.JsonSpec(yaml);
  const jsonToolkit = new Agents.JsonToolkit(jsonSpec);
  const jsonAgent = Agents.createJsonAgent(chatBot, jsonToolkit);
  const response = await jsonAgent.call({
    input: "Todoを作るには？日本語で答えてください。",
  });
  console.log(response.output);
};
