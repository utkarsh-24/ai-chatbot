import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import { AgentStepLogger } from "../utils";

export class Agent {
  private model;
  private agent;
  private tools;
  private systemPrompt;

  constructor(properties) {
    const { model, tools, systemPrompt } = properties;
    this.model = model;
    this.tools = tools;
    this.systemPrompt = systemPrompt;
    this.agent = createAgent({
      model: this.model,
      tools: this.tools,
      checkpointer: new MemorySaver(),
      systemPrompt: this.systemPrompt,
    });
  }

  async invoke(messagePayload) {
    const { sessionId, message } = messagePayload;
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
        configurable: { thread_id: sessionId },
        callbacks: [new AgentStepLogger()],
      }
    );
    const aiMessage = agentResponse.messages[agentResponse.messages.length - 1];
    return aiMessage.content;
  }
}
