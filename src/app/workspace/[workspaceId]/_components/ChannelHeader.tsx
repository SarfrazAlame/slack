'use client'
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { useCreateChannel } from "@/logic/channel/api/use-create-channel";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { toast } from "sonner";
import Channels from "./Channels";
import useGetChannel from "@/logic/channel/api/use-get-channel";

export default function ChannelHeader() {
    const router = useRouter()
    const [open, setOpen] = useState(true)
    const [name, setName] = useState('')
    const workspaceId = useWorkspaceId()
    const { mutate, data } = useCreateChannel()
    
    const { data: channel, isLoading } = useGetChannel({ workspaceId })
    
    const channelId = useMemo(() => channel?.channel[channel.channel.length - 1]?._id, [channel])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ name, workspaceId }, {
            onSuccess: () => {
                toast.success(`channel created `)
                // router.replace(`/workspace/${workspaceId}/channel/${channelId}`)
            },
            onError: () => {
                toast.error('failed to create')
            }
        })
    }

    return (
        <>
            <div className="my-3 flex items-center gap-0.5">
                {
                    open ? <IoMdArrowDropdown onClick={() => setOpen(!open)} className="text-white cursor-pointer" /> : <IoMdArrowDropright onClick={() => setOpen(!open)} className="text-white cursor-pointer" />
                }

                <p className="text-slate-300 font-[500] text-13px hover:bg-purple-500/30 px-1 rounded-md cursor-pointer">Channels</p>
                <Dialog>
                    <Hint lable="Create Channel">
                        <DialogTrigger className="mt-1" asChild>
                            <GoPlus className="text-slate-200 hover:bg-purple-500/60 rounded-full size-6 p-0.5 cursor-pointer" />
                        </DialogTrigger>
                    </Hint>
                    <DialogContent>
                        <DialogTitle>
                            Create Channel
                        </DialogTitle>
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <Input placeholder="#your channel's name" className="h-10" onChange={(e) => setName(e.target.value)} />
                            <Button type="submit">
                                Create
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                {
                    open ? <Channels /> : null
                }
            </div>
        </>
    )
}
