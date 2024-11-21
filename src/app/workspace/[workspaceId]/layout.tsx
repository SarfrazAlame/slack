import Model from "@/components/Model";
import Models from "@/components/Models";
import React from "react";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full relative">
             <Models />
            <Model />
            <div className="absolute top-12 left-1/4">
                {children}
            </div>
        </div>
    )
}
