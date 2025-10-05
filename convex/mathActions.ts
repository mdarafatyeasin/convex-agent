import { v } from "convex/values";
import { action } from "./_generated/server";
import { mathAgent } from "./agents/simpleAgent/agent";
import { createThread } from "@convex-dev/agent";
import { components } from "./_generated/api";

export const askMath = action({
    args: { question: v.string(), threadId: v.optional(v.string()) },
    handler: async (ctx, { question, threadId }) => {
        let tId = threadId;
        if (!tId) {
            tId = await createThread(ctx, components.agent, {
                title: "Math agent",
                summary: "User asking about math",
            });
        }
        const result = await mathAgent.generateText(ctx, { threadId: tId }, { prompt: question });
        return result.text;
    },
});
