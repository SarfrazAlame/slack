'use client'
import { useCreateWorkspaceModel } from "@/logic/workspace/store/use-get-workspace-model";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CreateWorkspaceModel() {
    const [open, setOpen] = useCreateWorkspaceModel()
    return (
        <Dialog open={!open}>
            <DialogContent>
                <DialogTitle>Add a workspace</DialogTitle>
                <Input placeholder="add a workspace... '" />
                <Button className="w-fit">Create</Button>
            </DialogContent>
        </Dialog>
    )
}
