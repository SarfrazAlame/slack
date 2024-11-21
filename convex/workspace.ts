import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";
import { useId } from "react";

const generateCode = () => {
    const letter = '1234567890'
    let code = 0
    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 1000000; j = j * 10) {
            code += Math.floor(Math.random() * 10) * j
        }
    }

    return code
}

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            return null
        }
        const members = await ctx.db.query('member').withIndex('by_user_id', (q) => q.eq('userId', userId)).collect()

        if (!members) {
            return null
        }

        const workspaceIds = members.map((member) => member.workspaceId)

        const workspaces = [];

        for (const workspaceId of workspaceIds) {
            const workspace = await ctx.db.get(workspaceId)
            workspaces.push(workspace)
        }

        return workspaces
    }
})

export const create = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            throw new Error("Unauthenticated")
        }
        const joinCode = generateCode()

        const workspaceId = await ctx.db.insert('workspace', {
            name: args.name,
            joinCode,
            userId
        })

        const memberId = await ctx.db.insert('member', {
            userId,
            workspaceId,
            role: "admin"
        })

        return {
            workspaceId
        }
    }
})

export const getWorkspaceId = query({
    args:{},
    handler: async(ctx)=>{
        const userId = await auth.getUserId(ctx)

        if(!userId){
            return null
        }

        

    }
})
