'use client'
import { useCreateWorkspaceModel } from "@/logic/workspace/store/use-get-workspace-model";
import { Dialog, DialogContent, DialogTitle } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import React, { useMemo, useState } from "react";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { toast } from "sonner";
import { useGetWorkspaces } from "../api/use-get-workspace";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function CreateWorkspaceModel() {
    const router = useRouter()
    const [open, setOpen] = useCreateWorkspaceModel()
    const [name, setName] = useState('')

    const { mutate, isPending } = useCreateWorkspace()
    const { data, isLoading } = useGetWorkspaces()

    const workspaceId = useMemo(() => data?.[data.length-1]?._id, [data])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            mutate({ name }, {
                onSuccess: (id) => {
                    toast.success('Workspace created')
                },
                onError: () => {
                    toast.error('failed to create workspace')
                }
            })
        } catch (error) {
            toast.error('failed to create')
        } finally {
            router.replace(`/workspace/${workspaceId}`)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogTitle>Add a workspace</DialogTitle>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input placeholder="add a workspace... " onChange={(e) => setName(e.target.value)} />
                    <Button className="w-fit" type="submit">Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
