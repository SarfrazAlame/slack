import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { getInfoById } from "../../../../convex/workspace"

interface useGetInfoByIdProps {
    workspaceId: Id<'workspace'>
}

export const useGetInfoById = ({ workspaceId }: useGetInfoByIdProps) => {
    const data = useQuery(api.workspace.getInfoById, { workspaceId })
    const isLoading = data === undefined

    return {
        data,
        isLoading
    }
}
