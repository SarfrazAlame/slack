'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { IoCheckmarkDone } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { toast } from "sonner";


interface InviteModelProps {
    open: boolean,
    setOpen: (open: boolean) => void;
    name: string,
    joinCode: number
}

export default function InviteModel({ open, joinCode, name, setOpen }: InviteModelProps) {
    const [click, setClick] = useState(false)
    const workspaceId = useWorkspaceId()

    const handleCopy = () => {
        setClick(true)
        const inviteLink = `${window.location.origin}/join/${workspaceId}`

        navigator.clipboard.writeText(inviteLink).then(() => {
            toast.success("Link copied to clipboard")
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
                    <p className="text-center w-fit  text-2xl font-semibold text-gray-700 border p-1 rounded">{joinCode}</p>
                    {
                        click ? <IoCheckmarkDone className="size-4 text-blue-600 cursor-pointer hover:shadow-xl" /> :
                            <>
                                <Copy onClick={handleCopy} className="size-4 text-blue-600 cursor-pointer hover:shadow-xl" />
                            </>
                    }

                </div>
            </DialogContent>
        </Dialog>
    )
}
