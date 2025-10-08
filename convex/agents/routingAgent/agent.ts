import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";
import { openai } from "@ai-sdk/openai";


// Routing Agent
export const routingAgent = new Agent(components.agent, {
  name: "Routing Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: `
    You are a smart router agent.
    Decide which specialized agent should answer the question:
    - If it's a math calculation → use Math Agent.
    - If it's about storytelling → use Storytelling Agent.
    Only output the agent name and nothing else.
  `,
  maxSteps: 2,
});
