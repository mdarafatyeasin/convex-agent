import { v } from "convex/values";
import { action, ActionCtx } from "./_generated/server";
import { routingAgent } from "./agents/routingAgent/agent";
import { api, components } from "./_generated/api";
import { createThread } from "@convex-dev/agent";

export const routeQuestion = action({
    args: { question: v.string(), threadId: v.optional(v.string()) },
    // explicitly type the return value to `Promise<string>`
    handler: async (
        ctx: ActionCtx,
        { question, threadId }: { question: string; threadId?: string }
    ): Promise<string> => {
        let tId = threadId;
        if (!tId) {
            tId = await createThread(ctx, components.agent, {
                title: "Routing agent",
                summary: "User asking about routing",
            });
        }

        const result = await routingAgent.generateText(
            ctx,
            { threadId: tId },
            { prompt: question }
        );

        const choice = result.text.toLowerCase();
        console.log("Routing Agent choice:", choice);

        if (choice.includes("math")) {
            return await ctx.runAction(api.mathActions.askMath, { question });
        } else if (choice.includes("storytelling")) {
            return await ctx.runAction(api.storyActions.tellStory, { question });
        } else {
            return "⚠️ Could not classify the question.";
        }
    },
});
