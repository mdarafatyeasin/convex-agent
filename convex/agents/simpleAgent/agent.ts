import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";
import { openai } from "@ai-sdk/openai";


// math agent
export const mathAgent = new Agent(components.agent, {
  name: "Math Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You are a helpful math solver.",
  maxSteps: 3,
});
