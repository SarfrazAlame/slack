'use client'
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/hook/use-workspace-id"
import { useEffect, useMemo } from "react"
import { useGetInfoById } from "@/logic/workspace/api/use-getInfoBy-id"
import { FaSlackHash } from "react-icons/fa"
import VerificationInput from "react-verification-input";
import { Loader } from "lucide-react"


export default function Join() {
    const router = useRouter()
    const workspaceId = useWorkspaceId()

    const { data, isLoading } = useGetInfoById({ workspaceId })

    const isMember = useMemo(() => data?.isMember, [data?.isMember])

    useEffect(() => {
        if (isMember) {
            router.push(`/workspace/${workspaceId}`)
        }
    }, [isMember, router, workspaceId])

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center my-32">
            <div className="flex justify-center items-center">
                <FaSlackHash className="text-rose-600" size={100} />
                <div>
                    <p className="text-xl font-medium mx-3 text-slate-700">Join {data?.name} </p>
                </div>
            </div>
            <div>
                <p className="text-lg my-3 text-slate-600">Enter code to join workspace</p>
            </div>
            <VerificationInput 
            
            />
        </div>
    )
}
