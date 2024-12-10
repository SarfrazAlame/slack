'use client'
import Model from "@/components/Model";
import Models from "@/components/Models";
import Toolbar from "@/components/Toolbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import React from "react";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    const workspaceid = useWorkspaceId()
    return (
        <div className="w-full h-full flex">
            <div className="w-full h-full">
                <Models />
                <Model workspaceId={workspaceid} />
            </div>
            <div className="absolute top-8 left-20 flex w-[90%] h-[96.5%]">
                <ResizablePanelGroup direction="horizontal" autoSaveId="ca-workspace-layout">
                    <ResizablePanel>
                        <Toolbar workspaceId={workspaceid} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel>
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
