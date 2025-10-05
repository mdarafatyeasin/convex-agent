import { components } from "../_generated/api";
import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";

// Agent definition
export const weatherAgent = new Agent(components.agent, {
  name: "Weather Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You are a helpful weather forecaster.",
  maxSteps: 3,
});


