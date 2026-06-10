import { BaseCallbackHandler } from "@langchain/core/callbacks/base";

export class AgentStepLogger extends BaseCallbackHandler {
  name = "AgentStepLogger";

  // Step 1 — REASON: LLM is thinking and decides to call a tool
  async handleLLMStart(_llm: any, messages: any[]) {
    console.log("\n🧠 [REASON] LLM is thinking...");
    const lastMessage = messages?.[0]?.at(-1);
    if (lastMessage?.content) {
      console.log("   Last message to LLM:", lastMessage.content.slice(0, 120));
    }
  }

  // Step 2 — ACT: LLM decided which tool to call and with what args
  async handleToolStart(_tool: any, input: string) {
    console.log("\n⚡ [ACT] Tool called with args:", input);
  }

  // Step 3 — OBSERVE: Tool ran and returned a result
  async handleToolEnd(output: any) {
    const toolName = output?.name ?? "unknown";
    const content =
      typeof output?.content === "string"
        ? output.content
        : JSON.stringify(output?.content);
    console.log(`\n👁️  [OBSERVE] "${toolName}" returned:`, content);
  }

  // Final answer
  async handleLLMEnd(output: any) {
    const text = output?.generations?.[0]?.[0]?.text;
    if (text) {
      console.log("\n✅ [FINAL ANSWER]:", text);
    }
  }
}
