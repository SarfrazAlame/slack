import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetByIdProps {
    workspaceId: Id<'workspace'>
}

export default function useGetworkspaceDetails({ workspaceId }: useGetByIdProps) {
    const data = useQuery(api.workspace.getWorkspaceDetails, { workspaceId })

    const isLoading = data === undefined

    return {
        data,
        isLoading
    }
}
