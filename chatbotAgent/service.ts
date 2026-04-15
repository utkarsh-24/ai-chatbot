import { ChatbotAgent } from "../agents";
import { TChatbotAgentEvent } from "../types";

const chatbotAgent = new ChatbotAgent();

export const processEvent = async (event: TChatbotAgentEvent) => {
  const { message } = event;
  return chatbotAgent.invoke(message);
};
