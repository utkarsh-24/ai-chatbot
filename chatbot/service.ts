import { GroqAgent } from "../agents";
import { TChatbotEvent } from "../types";

const groqAgent = new GroqAgent();

export const processEvent = async (event: TChatbotEvent) => {
  const { message, userId } = event;
  return groqAgent.invoke(message, userId);
};
