'use client'
import { useChannelId } from "@/hook/use-channel-id"
import { useWorkspaceId } from "@/hook/use-workspace-id"
import useGetChannel from "@/logic/channel/api/use-get-channel"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export default function Page() {

    const router = useRouter()
    const workspaceId = useWorkspaceId()

    const { data, isLoading } = useGetChannel({ workspaceId })

    const channelId = useMemo(() => data?.channel[0]?._id, [data])

    useEffect(() => {
        if (data) {
            router.replace(`workspace/${workspaceId}/channel/${channelId}`)
        }
    }, [])
    return (
        <div>
            main
        </div>
    )
}
