import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    workspace: defineTable({
        name: v.string(),
        userId: v.id('users'),
        joinCode: v.number()
    }),
    member: defineTable({
        userId: v.id('users'),
        workspaceId: v.id('workspace'),
        role: v.union(v.literal('admin'), v.literal('member'))
    }).index('by_user_id', ['userId'])
        .index('by_workspace_id', ['workspaceId'])
        .index('by_workspace_id_user_id', ['workspaceId', 'userId']),
    channel: defineTable({
        name: v.string(),
        workspaceId: v.id('workspace'),
    }).index('by_workspace_id',['workspaceId'])

})

export default schema
