'use client'
import useGetworkspaceDetails from "@/logic/workspace/api/use-get-worksapce";
import { Id } from "../../../../../convex/_generated/dataModel";
import { IoIosArrowDown } from "react-icons/io";
import { Loader } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BsFilter } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import Hint from "@/components/Hint";

export default function WorkspaceHeader({ workspaceId }: { workspaceId: Id<'workspace'> }) {
    const { data, isLoading } = useGetworkspaceDetails({ workspaceId })
    return (
        <div className="w-full flex justify-between items-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-1 items-center cursor-pointer hover:bg-purple-500/20 px-2 py-1 rounded-sm transition-all">
                    {
                        isLoading ? <Loader className="size-5 animate-spin text-muted-foreground" /> : <p className="font-semibold text-slate-200">{data?.name}</p>
                    }
                    <IoIosArrowDown className="text-slate-200 font-bold" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 px-3 py-2" align="start">
                    <DropdownMenuItem className="flex gap-3 items-center">
                        <div>
                            <p className="bg-gray-500 px-4 py-2 rounded-md text-slate-200 font-semibold">{data?.name.charAt(0).toUpperCase()}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-medium ">{data?.name}</p>
                            <p className="text-sm">Active workspace</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm flex items-center h-8 cursor-pointer">
                        Invite people to {data?.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm flex items-center h-8 cursor-pointer">
                        Sign Out
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-4 items-center">
                <Hint lable="Filter conversations">
                    <BsFilter className="text-white size-4 cursor-pointer" />
                </Hint>
                <Hint lable="New message">
                    <SlNote className="text-white cursor-pointer" />
                </Hint>
            </div>
        </div>
    )
}
