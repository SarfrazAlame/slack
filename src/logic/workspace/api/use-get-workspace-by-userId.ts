import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useGetWorkspaceByUserId = () =>{
    const data = useQuery(api.workspace.getWorkspaceByUserId)
    const isLoading = data===undefined

    return {
        data,
        isLoading
    }
}