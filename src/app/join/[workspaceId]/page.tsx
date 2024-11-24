'use client'
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/hook/use-workspace-id"
import React, { useEffect, useMemo, useState } from "react"
import { useGetInfoById } from "@/logic/workspace/api/use-getInfoBy-id"
import { FaSlackHash } from "react-icons/fa"
import VerificationInput from "react-verification-input";
import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import { useJoinWorkspace } from "@/logic/workspace/api/use-join-workspace"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Join() {

    const [code, setCode] = useState('')

    const router = useRouter()
    const workspaceId = useWorkspaceId()

    const { data, isLoading } = useGetInfoById({ workspaceId })

    const { mutate, data: workspace, isPending } = useJoinWorkspace()

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

    const handleComplete = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        mutate(
            { workspaceId, joinCode: code },
            {
                onSuccess: (id) => {
                    router.push(`/workspace/${id}`);
                    toast.success("Joined successfully");
                },
                onError: () => {
                    toast.error("Failed to join");
                },
            }
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
            <form onSubmit={handleComplete}>
                <div className="flex space-x-3 items-center justify-center">
                    <Input className="w-20" autoFocus maxLength={6} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div className="flex justify-between items-center gap-10">
                    <div className="flex gap-x-4 my-4">
                        <Button type="button" variant={"outline"} asChild>
                            <Link href={"/"}>Back</Link>
                        </Button>
                    </div>
                    <Button type="submit">
                        join
                    </Button>
                </div>
            </form>
        </div>
    )
}
