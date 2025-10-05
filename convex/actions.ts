import { action } from "./_generated/server";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { createThread } from "@convex-dev/agent";
import { weatherAgent } from "./agents/agent";
import { listUIMessages } from "@convex-dev/agent";
// import { tree } from "next/dist/build/templates/app-page";

export const helloWorld = action({
  args: { city: v.string(), threadId: v.optional(v.string()) },
  handler: async (ctx, { city, threadId }) => {
    let tId = threadId;

    // যদি client থেকে threadId না আসে, নতুন বানান
    if (!tId) {
      tId = await createThread(ctx, components.agent, {
        title: "Weather Forecast",
        summary: "User asking about weather",
      });
    }

    const prompt = `What is the weather in ${city}?`;
    const result = await weatherAgent.generateText(ctx, { threadId: tId }, { prompt });

    return {
      weather: result.text,
      threadId: tId,
    };

  },
});


export const getThreadMessages = action({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    const messages = await listUIMessages(ctx, components.agent, {
      threadId,
      paginationOpts: { cursor: null, numItems: 10 },
    });

    return messages;
  },
});
