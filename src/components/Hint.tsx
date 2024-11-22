import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface HintProps {
    children: React.ReactNode
    lable: string,
    side?: 'top' | 'right' | 'bottom' | 'left',
    align?: "start" | "center" | "end"
}

export default function Hint({ children, lable, align, side }: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} className="bg-black text-white ">
                    <p className="font-medium text-xs">{lable}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}