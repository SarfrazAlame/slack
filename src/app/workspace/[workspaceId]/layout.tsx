import Model from "@/components/Model";
import React from "react";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full relative">
            <Model />
            <div className="absolute top-12 left-1/4">
                {children}
            </div>
        </div>
    )
}
