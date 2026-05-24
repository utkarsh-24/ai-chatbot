import {
  chatAgentPrompt,
  customerServiceAgentPrompt,
  salesAgentPrompt,
} from "../prompts";
import { Agent } from "./agent";
import basicModel from "../models/basicModel";
import { calculatorTool, weatherTool } from "../agentTools";

class AgentFactory {
  static __instance: AgentFactory;
  private agentModels;
  private agentTools;
  constructor() {
    if (AgentFactory.__instance) {
      return AgentFactory.__instance;
    }
    AgentFactory.__instance = this;
  }

  getDefaultAgent = (): Agent =>
    new Agent({
      model: basicModel,
      tools: [calculatorTool, weatherTool],
      systemPrompt: chatAgentPrompt,
    });
  getSalesAgent = (): Agent =>
    new Agent({
      model: basicModel,
      tools: [calculatorTool, weatherTool],
      systemPrompt: salesAgentPrompt,
    });
  getCustomerServiceAgent = (): Agent =>
    new Agent({
      model: basicModel,
      tools: [calculatorTool, weatherTool],
      systemPrompt: customerServiceAgentPrompt,
    });
}

export default AgentFactory;
export { Agent };
