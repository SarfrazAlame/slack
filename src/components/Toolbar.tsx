import WorkspaceHeader from "@/app/workspace/[workspaceId]/_components/WorkspaceHeader";
import { Id } from "../../convex/_generated/dataModel";

export default function Toolbar({ workspaceId }: { workspaceId: Id<'workspace'> }) {
    return (
        <div className="bg-purple-900/90 h-full p-5">
            <WorkspaceHeader workspaceId={workspaceId}/>
        </div>
    )
}