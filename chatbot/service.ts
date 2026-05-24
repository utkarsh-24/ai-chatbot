import AgentFactory, { Agent } from "../agents";
import { TChatbotEvent } from "../types";
import { AgentType } from "../utils";

const agentFactory = new AgentFactory();

export const processEvent = async (event: TChatbotEvent) => {
  const { message, userId, agentType } = event;

  var agent: Agent = agentFactory.getDefaultAgent();
  if (agentType == AgentType.SALES_AGENT) {
    agent = agentFactory.getSalesAgent();
  } else if (agentType == AgentType.CUSTOMER_SERVICE_AGENT) {
    agent = agentFactory.getCustomerServiceAgent();
  }
  return agent.invoke({ message, sessionId: userId });
};
