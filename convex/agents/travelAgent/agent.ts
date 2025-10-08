import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";
import { openai } from "@ai-sdk/openai";

// Finds best locations for trip
export const locationAgent = new Agent(components.agent, {
    name: "Location Finder",
    instructions: "Suggest best cities/places for a trip based on user input.",
    languageModel: openai.chat("gpt-4o-mini"),
  });
  
  // transportAgent
  export const transportAgent = new Agent(components.agent, {
    name: "Transport Finder",
    instructions: "Suggest best travel options (flights, trains, buses) and feasibility.",
    languageModel: openai.chat("gpt-4o-mini"),
  });
  
  // activityAgent
  export const activityAgent = new Agent(components.agent, {
    name: "Activity Finder",
    instructions: "Suggest activities, restaurants, and local tips for each location.",
    languageModel: openai.chat("gpt-4o-mini"),
  });

// orchestratorAgent
  export const orchestratorAgent = new Agent(components.agent, {
    name: "Travel Orchestrator",
    instructions: `
    You are a travel planner. 
    - First, break down request into: locations, transport, activities.
    - Collect parallel results from workers.
    - Then merge them into a structured day-by-day itinerary.
    `,
    languageModel: openai.chat("gpt-4o-mini"),
  });