'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { IoCheckmarkDone } from "react-icons/io5";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useResetJoinCode } from "@/logic/workspace/api/use-reset-joinCode";

interface InviteModelProps {
    open: boolean,
    setOpen: (open: boolean) => void;
    name: string,
    joinCode: number|string
}

export default function InviteModel({ open, joinCode, name, setOpen }: InviteModelProps) {
    const [click, setClick] = useState(false)
    const [clickCode, setClickCode] = useState(false)
    const workspaceId = useWorkspaceId()

    const { mutate, data } = useResetJoinCode()

    const handleCopy = () => {
        setClick(true)
        const inviteLink = `${window.location.origin}/join/${workspaceId}`

        navigator.clipboard.writeText(inviteLink).then(() => {
            toast.success("Link copied to clipboard")
        })
    }

    const handleCopyCode = () => {
        setClickCode(true)
        const copyCode = joinCode
        navigator.clipboard.writeText(copyCode.toString())
    }

    const handleReset = () => {
        mutate({ workspaceId }, {
            onSuccess: () => {
                toast.success('Reset successfully')
            },
            onError: () => {
                toast.error('failed to reset')
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="w-full ">
                <DialogHeader>
                    <DialogTitle>Invite people to {name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Use the code below to invite people to your wordspace
                </DialogDescription>
                <div className="w-full flex justify-center items-center gap-2">
                    <p className="text-center w-fit  text-2xl font-semibold text-gray-700 tracking-wider" onClick={handleCopyCode}>{joinCode}</p>
                    {
                        clickCode ? <IoCheckmarkDone className="size-4 mt-2" /> : <Copy onClick={handleCopyCode} className="size-4 mt-2 hover:text-blue-600 cursor-pointer" />
                    }
                </div>
                <div className="w-full flex items-center justify-between mt-4">
                    <Button onClick={handleReset}>
                        Reset
                    </Button>
                    {
                        click ? <Button variant={'ghost'}>
                            Copy Link
                            <IoCheckmarkDone />
                        </Button> : <Button variant={'ghost'} onClick={handleCopy} className="hover:text-blue-600">
                            Copy Link
                            <Copy />
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
