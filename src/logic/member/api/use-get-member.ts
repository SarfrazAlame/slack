import { useQuery } from "convex/react"
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"

interface useGetMemberProps {
    workspaceId:Id<'workspace'>
}

export const useGetMember = ({workspaceId}:useGetMemberProps)=>{
    const data = useQuery(api.member.get, {workspaceId})
    const isLoading = data === undefined

    return {
        data,
        isLoading
    }
}