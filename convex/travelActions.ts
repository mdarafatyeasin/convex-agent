import { v } from "convex/values";
import { action } from "./_generated/server";
import { createThread } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { activityAgent, locationAgent, orchestratorAgent, transportAgent } from "./agents/travelAgent/agent";

export const planItinerary = action({
  args: { question: v.string() },
  handler: async (ctx, { question }) => {
    // Create thread
    const threadId = await createThread(ctx, components.agent, {
      title: "Travel Itinerary",
      summary: `Planning trip for: ${question}`,
    });

    // Run workers in parallel
    const [locations, transport, activities] = await Promise.all([
      locationAgent.generateText(ctx, { threadId }, { prompt: question }),
      transportAgent.generateText(ctx, { threadId }, { prompt: question }),
      activityAgent.generateText(ctx, { threadId }, { prompt: question }),
    ]);

    // Merge results using orchestrator
    const finalPlan = await orchestratorAgent.generateText(
      ctx,
      { threadId },
      {
        prompt: `
        User request: ${question}
        Locations: ${locations.text}
        Transport: ${transport.text}
        Activities: ${activities.text}
        
        Now generate a final detailed day-by-day itinerary with restaurants and tips.
        `,
      }
    );

    return finalPlan.text;
  },
});