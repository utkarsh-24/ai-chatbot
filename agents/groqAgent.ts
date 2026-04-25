import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";

export class GroqAgent {
  private agent;
  private static __instance: GroqAgent;
  private session;

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

    this.session = new MemorySaver();

    const agent = createAgent({
      model,
      tools: [],
      checkpointer: this.session,
    });

    this.agent = agent;
    GroqAgent.__instance = this;
  }

  async invoke(message: string, userId: number) {
    const agentResponse = await this.agent.invoke(
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        configurable: { thread_id: userId },
      }
    );
    const aiMessage = agentResponse.messages[agentResponse.messages.length - 1];
    return aiMessage.content;
  }
}
