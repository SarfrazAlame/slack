import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useCreateChannelProp {
    workspaceId: Id<'workspace'>
}

export default function useGetChannel({ workspaceId }: useCreateChannelProp) {
    const data = useQuery(api.channel.get, { workspaceId })
    const isLoading = data === undefined

    return {
        data,
        isLoading
    }
}