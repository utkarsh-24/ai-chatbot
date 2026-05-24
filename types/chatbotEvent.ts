import { AgentType } from "../utils";

export type TChatbotEvent = {
  userId: string;
  agentType: AgentType;
  message: string;
};
