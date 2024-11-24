import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
    args: {
        name: v.string(),
        workspaceId: v.id('workspace')
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            throw new Error('Unauthorized')
        }

        const channelId = await ctx.db.insert('channel', {
            name: args.name,
            workspaceId: args.workspaceId
        })

        return channelId
    }
})

export const get = query({
    args: {
        workspaceId: v.id('workspace')
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            return null
        }

        const channel = await ctx.db.query('channel').withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.workspaceId)).collect()

        if (!channel) {
            return null
        }

        return {
            channel
        }
    }
})