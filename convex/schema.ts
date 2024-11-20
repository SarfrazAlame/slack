import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    workspace:defineTable({
        name:v.string(),
        userId:v.string(),
        joinCode:v.number()
    })
})

export default schema
