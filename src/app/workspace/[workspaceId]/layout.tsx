import Model from "@/components/Model";
import React from "react";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Model />
            {children}
        </div>
    )
}
