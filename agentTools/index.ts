import * as z from "zod";
import axios from "axios";
import { tool } from "langchain";
import { evaluate } from "mathjs";

const calculatorTool = tool(
  async ({ expression }) => {
    try {
      const result = evaluate(expression);
      return result.toString();
    } catch {
      return "Invalid expression";
    }
  },
  {
    name: "calculator",
    description: "Useful for performing mathematical calculations.",
    schema: z.object({
      expression: z.string().describe("Math expression to evaluate."),
    }),
  }
);

const weatherTool = tool(
  async ({ latitude, longitude }) => {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude,
        longitude,
        current: "temperature_2m,wind_speed_10m",
      },
    });

    return JSON.stringify(response.data.current);
  },
  {
    name: "weather_tool",
    description: "Get current weather using latitude and longitude",
    schema: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }
);

export { calculatorTool, weatherTool };
