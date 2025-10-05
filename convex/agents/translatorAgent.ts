import { Agent } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { openai } from "@ai-sdk/openai";


export const translatorAgent = new Agent(components.agent, {
    name: "Translator Agent",
    languageModel: openai.chat("gpt-4o-mini"),
    instructions: "You are a translator. Translate text between Bangla and English.",
    maxSteps: 3,
});