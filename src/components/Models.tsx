import CreateChannelModel from "./CreateChannelModel";
import CreateWorkspaceModel from "../logic/workspace/components/CreateWorkspaceModel";

export default function Models() {
    return (
        <div>
            <CreateWorkspaceModel />
            <CreateChannelModel />
        </div>
    )
}