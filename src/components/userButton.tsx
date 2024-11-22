import { useCurrentUser } from "@/logic/auth/api/get-current-user"
import { Loader } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuthActions } from "@convex-dev/auth/react"

export default function UserButton() {
    const { signOut } = useAuthActions()
    const { data, isLoading } = useCurrentUser()
    if (!data) {
        return null
    }
    const { name, image } = data

    if (isLoading) {
        return <Loader className="animate-spin text-muted-foreground" />
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image src={image!} alt="logo" width={40} height={40} className="rounded-md cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-red-500" onClick={() => signOut()}>
                    Sign Out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Setting
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Profile
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
