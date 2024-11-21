import { useCurrentUser } from "@/logic/auth/api/get-current-user"
import { Loader } from "lucide-react"
import Image from "next/image"

export default function UserButton() {
    const { data, isLoading } = useCurrentUser()
    if (!data) {
        return null
    }
    const { name, image } = data

    if(isLoading){
        return <Loader className="animate-spin text-muted-foreground"/>
    }

    return (
        <div>
            <Image src={image!} alt="logo" width={40} height={40} className="rounded-md"/>
        </div>
    )
}