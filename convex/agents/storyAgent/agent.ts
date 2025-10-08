import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";
import { openai } from "@ai-sdk/openai";

export const storyCreatorAgent = new Agent(components.agent, {
  name: "Story Creator",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You write creative, engaging stories from user prompts.",
  maxSteps: 3,
});

export const twistAgent = new Agent(components.agent, {
  name: "Twist Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You add suspense and plot twists to stories.",
  maxSteps: 3,
});

export const dramaAgent = new Agent(components.agent, {
  name: "Drama Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You enhance dialogues, emotions, and make stories dramatic.",
  maxSteps: 3,
});

export const orchestratorAgent = new Agent(components.agent, {
  name: "Story Orchestrator",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You combine multiple story versions into one rich, final narrative.",
  maxSteps: 3,
});
