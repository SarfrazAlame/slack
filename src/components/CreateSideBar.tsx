'use client'
import { useCurrentUser } from "@/logic/auth/api/get-current-user"
import { Loader } from "lucide-react"
import { usePathname } from "next/navigation"
import Lists from "./Lists"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { FiPlus } from "react-icons/fi";
import UserButton from "./userButton"



export default function CreateSideBar() {
    const { data, isLoading } = useCurrentUser()
    const pathname = usePathname()

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
                        <DropdownMenuItem className="cursor-pointer h-14">
                            workspace
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer h-14">
                            <FiPlus className="size-16 bg-slate-200/40" />
                            <p className="text-mg font-semibold"> Add a worksapce</p>
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
