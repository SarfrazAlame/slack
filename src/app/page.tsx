"use client"
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useGetUser } from "./auth/api/get-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/logic/workspace/api/use-create-workspace";
import { toast } from "sonner";
import { useGetWorkspaceByUserId } from "@/logic/workspace/api/use-get-workspace-by-userId";
import { Loader } from "lucide-react";
import { useGetWorkspaces } from "@/logic/workspace/api/use-get-workspace";
import { getWorkspaceByUserId } from "../../convex/workspace";

export default function Home() {

  const router = useRouter()
  const [name, setName] = useState('')
  const { data: user, isLaoding: isLoadingUser } = useGetUser()
  const { mutate, isPending, data: workspaceId } = useCreateWorkspace()

  const { data, isLoading } = useGetWorkspaceByUserId()

  console.log(data?.length)

  const workspaceIds = data ? data?.[0]?._id : undefined

  console.log(workspaceIds)

  const handleSubmitWorkspace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      mutate({ name }, {
        onSuccess: () => {
          toast.success('workspace created')
          router.push(`/workspace/${workspaceId}`)
        },
        onError: () => {
          toast.error('failed to create workspace')
        }
      })
    } catch (error) {
      toast.error('failed to create')
    }
  }

  if (workspaceIds) {
    return redirect(`/workspace/${workspaceIds}`)
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <p className="lg:text-5xl text-3xl font-semibold text-slate-700">Hey, <span>{isLoadingUser && <Loader className="size-5 animate-spin text-muted-foreground" />}</span><span className="text-purple-600 font-mono">{user?.name}</span></p>
      <p className="text-3xl font-semibold text-slate-600">let's create workspace</p>
      <form className="space-y-3 mt-4" onSubmit={handleSubmitWorkspace}>
        <Input placeholder="your workspace's name..." className="h-12 w-96" onChange={(e) => setName(e.target.value)} />
        <Button className="my-2" type="submit">Create</Button>
      </form>
    </div>
  );
}
