'use client'
import useGetworkspaceDetails from "@/logic/workspace/api/use-get-worksapce";
import { Id } from "../../../../../convex/_generated/dataModel";
import { IoIosArrowDown } from "react-icons/io";
import { Loader } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function WorkspaceHeader({ workspaceId }: { workspaceId: Id<'workspace'> }) {
    const { data, isLoading } = useGetworkspaceDetails({ workspaceId })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 items-center cursor-pointer">
                {
                    isLoading ? <Loader className="size-5 animate-spin text-muted-foreground" /> : <p className="font-semibold text-slate-200">{data?.name}</p>
                }
                <IoIosArrowDown className="text-slate-200 font-bold" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="start">
                <DropdownMenuItem>
                    <p>{data?.name.charAt(0).toUpperCase()}</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
