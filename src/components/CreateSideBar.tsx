'use client'
import { useCurrentUser } from "@/logic/auth/api/get-current-user"
import { Loader } from "lucide-react"
import { usePathname } from "next/navigation"
import Lists from "./Lists"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { FiPlus } from "react-icons/fi";
import UserButton from "./userButton"
import { useCreateWorkspaceModel } from "@/logic/workspace/store/use-get-workspace-model"
import { useGetWorkspaces } from "@/logic/workspace/api/use-get-workspace"
import Link from "next/link"


export default function CreateSideBar() {
    const [open, setOpen] = useCreateWorkspaceModel()
    const { data, isLoading } = useCurrentUser()
    const pathname = usePathname()

    const { data: workspaces, isLoading: isWorkspaceLoading } = useGetWorkspaces()

    if (isLoading) {
        return (
            <Loader className="size-4 animate-spin text-muted-foreground" />
        )
    }

    if (!data) {
        return null
    }

    const { name, image } = data

    const firstLetter = name?.charAt(0).toUpperCase()

    return (
        <div className="bg-purple-900 h-full w-20 flex flex-col items-center justify-between">
            <div className=" flex flex-col items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-gray-400 px-3 py-1 rounded-md font-bold text-xl">{firstLetter}</DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72">
                        <DropdownMenuLabel className="text-md">{name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {workspaces?.map((workspace, index) => (
                            <div key={index}>
                                {workspace?._id && (
                                    <Link href={`/workspace/${workspace?._id}`}>
                                        <DropdownMenuItem className="cursor-pointer h-10 flex ">
                                            <p className="text-lg font-semibold bg-slate-200 px-3 py-1 rounded-md">{workspace?.name.charAt(0).toUpperCase()}</p>
                                            <p className="text-md ">{workspace?.name}</p>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </Link>
                                )}
                            </div>
                        ))}

                        <DropdownMenuItem className="cursor-pointer h-14"
                            onClick={() => setOpen(true)}
                        >
                            <FiPlus className="size-16 bg-slate-200/40" />
                            <p className="text-mg font-semibold">Create a new workspace</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Lists />
            </div>
            <div className="my-2">
                <UserButton />
            </div>
        </div>
    )
}
