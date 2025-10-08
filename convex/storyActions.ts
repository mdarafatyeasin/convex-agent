import { v } from "convex/values";
import { action } from "./_generated/server";
import { createThread } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { dramaAgent, orchestratorAgent, storyCreatorAgent, twistAgent } from "./agents/storyAgent/agent";

// export const tellStory = action({
//     args: { question: v.string(), threadId: v.optional(v.string()) },
//     handler: async (ctx, { question, threadId }) => {
//         let tId = threadId;
//         if (!tId) {
//             tId = await createThread(ctx, components.agent, {
//                 title: "Story agent",
//                 summary: "User asking about story",
//             });
//         }
//         const result = await storyAgent.generateText(ctx, { threadId: tId }, { prompt: question });
//         return result.text;
//     },
// })

export const tellStory = action({
  args: { question: v.string() },
  handler: async (ctx, { question }) => {
    // 🧵 create a shared thread
    const threadId = await createThread(ctx, components.agent, {
      title: "Storytelling Workflow",
      summary: `Creating a story about: ${question}`,
    });

    // ✨ Run story creation steps in parallel (LLM1, LLM2, LLM3)
    const [base, twist, drama] = await Promise.all([
      storyCreatorAgent.generateText(ctx, { threadId }, { prompt: question }),
      twistAgent.generateText(ctx, { threadId }, { prompt: question }),
      dramaAgent.generateText(ctx, { threadId }, { prompt: question }),
    ]);

    // 🤖 Combine and finalize with the orchestrator
    const finalStory = await orchestratorAgent.generateText(
      ctx,
      { threadId },
      {
        prompt: `
        User request: ${question}

        Base Story: ${base.text}

        Twisted Version: ${twist.text}

        Dramatic Version: ${drama.text}

        Now merge them into a single creative, emotional, and suspenseful story.
        `,
      }
    );

    return finalStory.text;
  },
});
