'use client'

import { useWorkspaceId } from "@/hook/use-workspace-id"
import useGetworkspaceDetails from "@/logic/workspace/api/use-get-worksapceDetails"

export default function Page() {
    const workspaceId = useWorkspaceId()
    const workspace = useGetworkspaceDetails({workspaceId})

    return (
        <div>
            main
        </div>
    )
}
