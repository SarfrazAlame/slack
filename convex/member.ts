import { v } from "convex/values"
import { query } from "./_generated/server"
import { auth } from "./auth"

export const get = query({
    args: {
        workspaceId: v.id('workspace')
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            return null
        }

        const member = await ctx.db.query('member').withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.workspaceId)).collect()

        if (!member) {
            return null
        }

        return {
            member
        }
    }
})