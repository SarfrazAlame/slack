'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGetUser } from "./auth/api/get-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/logic/workspace/api/use-create-workspace";
import { toast } from "sonner";
import { useCreateChannel } from "@/logic/channel/api/use-create-channel";

export default function Home() {
  const [workspace, setWorkspace] = useState(false)

  const router = useRouter()
  const [name, setName] = useState('')
  const [channelName, setChannelName] = useState('')
  const { data: user, isLaoding: isLoadingUser } = useGetUser()
  const { mutate, isPending, data: workspaceId } = useCreateWorkspace()

  const { mutate: mutateChannel, isPending: isLoadingChannel, data: channelId } = useCreateChannel()

  const handleSubmitWorkspace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      mutate({ name }, {
        onSuccess: () => {
          toast.success('workspace created')
        },
        onError: () => {
          toast.error('failed to create workspace')
        }
      })
    } catch (error) {
      toast.error('failed to create')
    } finally {
      setWorkspace(true)
    }
  }

  const handleSubmitChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      mutateChannel({ channelName, workspaceId,name }, {
        onSuccess: () => {
          toast.success('workspace created')
        },
        onError: () => {
          toast.error('failed to create workspace')
        }
      })
    } catch (error) {
      toast.error('failed to create')
    } finally {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`)
    }
  }



  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      {
        workspace ? <><p className="lg:text-5xl text-3xl font-semibold text-slate-700">Hey, {isLoadingUser}<span className="text-purple-600 font-mono">{user?.name}</span></p>
          <p className="text-3xl font-semibold text-slate-600">now create channel</p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmitChannel}>
            <Input placeholder="your channel's name..." className="h-12 w-96" onChange={(e) => setChannelName(e.target.value)} />
            <Button className="my-2" type="submit">Create</Button>
          </form></> : <><p className="lg:text-5xl text-3xl font-semibold text-slate-700">Hey, {isLoadingUser}<span className="text-purple-600 font-mono">{user?.name}</span></p>
          <p className="text-3xl font-semibold text-slate-600">let's create workspace</p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmitWorkspace}>
            <Input placeholder="your workspace's name..." className="h-12 w-96" onChange={(e) => setName(e.target.value)} />
            <Button className="my-2" type="submit">Create</Button>
          </form></>
      }
    </div>
  );
}
