'use client'
import { useCreateWorkspaceModel } from "@/logic/workspace/store/use-get-workspace-model";
import { Dialog, DialogContent, DialogTitle } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import React, { useState } from "react";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { toast } from "sonner";

export default function CreateWorkspaceModel() {
    const [open, setOpen] = useCreateWorkspaceModel()
    const [name, setName] = useState('')

    const { mutate, isPending } = useCreateWorkspace()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ name }, {
            onSuccess: (id) => {
                toast.success('Workspace created')
            },
            onError: () => {
                toast.error('failed to create workspace')
            }
        })
    }

    return (
        <Dialog open={!open}>
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