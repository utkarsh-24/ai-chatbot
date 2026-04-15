import { processEvent } from "./service";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const chatbotAgent: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const eventDetails = JSON.parse(event.body);
    const result = await processEvent(eventDetails);
    return {
      statusCode: 200,
      body: JSON.stringify({
        generatedAt: Date.now(),
        message: "chatbotAgent invoked successfully",
        result,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        generatedAt: Date.now(),
        message: "Internal Server Error",
      }),
    };
  }
};
