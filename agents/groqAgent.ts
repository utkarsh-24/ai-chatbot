import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";

export class GroqAgent {
  private agent;
  private static __instance: GroqAgent;

  constructor() {
    if (GroqAgent.__instance) {
      return GroqAgent.__instance;
    }

    const model = new ChatOpenAI({
      apiKey: process.env.GROQ_API_KEY,
      model: "openai/gpt-oss-120b",
      configuration: {
        baseURL: "https://api.groq.com/openai/v1",
      },
    });

    const agent = createAgent({
      model,
      tools: [],
    });

    this.agent = agent;
    GroqAgent.__instance = this;
  }

  async invoke(message: string) {
    const agentResponse = await this.agent.invoke({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    const aiMessage = agentResponse.messages[agentResponse.messages.length - 1];
    return aiMessage.content;
  }
}
