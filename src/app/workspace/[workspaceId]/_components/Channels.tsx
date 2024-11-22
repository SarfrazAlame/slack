'use client'
import { useWorkspaceId } from "@/hook/use-workspace-id"
import useGetChannel from "@/logic/channel/api/use-get-channel"
import { Hash, Loader } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"

export default function Channels() {
    const pathname = usePathname()
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const { data, isLoading } = useGetChannel({ workspaceId })

    const channelId = useMemo(() => data?.channel[data.channel.length - 1]?._id, [data])

    useEffect(() => {
        if (data) {
            router.replace(`/workspace/${workspaceId}/channel/${channelId}`)
        } else if (isLoading) {
            router.replace(`/workspace/${workspaceId}`)
        }
    }, [data])

    if (isLoading) {
        return <Loader className="animate-spin size-5 text-muted-foreground" />
    }
    return (
        <div className="">
            {
                data?.channel.map((chan) => {
                    const isActive = pathname === `/workspace/${workspaceId}/channel/${chan._id}`
                    return (
                        <Link href={`/workspace/${workspaceId}/channel/${chan._id}`} key={chan._creationTime} className={`font-medium w-full px-2 flex items-center cursor-pointer my-1 hover:bg-purple-900/40 rounded-md ${isActive && 'bg-purple-900/40'}`}>
                            <Hash className={`size-4 text-slate-300 ${isActive && 'text-purple-950'}`} />
                            <p className={`mx-2 py-0.5 text-gray-300 ${isActive && 'text-purple-950'}`}>{chan.name}</p>
                        </Link>
                    )
                })
            }
        </div>
    )
}
