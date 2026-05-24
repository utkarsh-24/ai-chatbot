import { ChatOpenAI } from "@langchain/openai";

const basicModel = new ChatOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  configuration: {
    baseURL: "https://api.groq.com/openai/v1",
  },
});

export default basicModel;
