'use client'
import { useCurrentUser } from "@/logic/auth/api/get-current-user"
import { Loader } from "lucide-react"
import { usePathname } from "next/navigation"
import Lists from "./Lists"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"


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
        <div className="bg-purple-900 h-full w-20 flex flex-col items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-400 px-3 py-1 rounded-md font-bold text-xl">{firstLetter}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
                <DropdownMenuLabel className="text-md">{name}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
            </DropdownMenuContent>
          </DropdownMenu>
          <Lists/>
        </div>
    )
}
