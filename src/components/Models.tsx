import CreateChannelModel from "./CreateChannelModel";
import CreateWorkspaceModel from "./CreateWorkspaceModel";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";

export default function Models() {
    return (
        <div>
            <CreateWorkspaceModel />
            <CreateChannelModel />
        </div>
    )
}