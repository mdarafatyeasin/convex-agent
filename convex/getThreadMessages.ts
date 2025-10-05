import { action } from "./_generated/server";
import { v } from "convex/values";
import { listUIMessages } from "@convex-dev/agent"; // ✅ এখানে থেকে আনবেন
import { components } from "./_generated/api";

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




/*
error:
1. Module '"@convex-dev/agent"' has no exported member 'components'.ts(2305)

*/