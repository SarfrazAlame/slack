import { FaRegComments } from "react-icons/fa"
import { GoBell } from "react-icons/go"
import { IoIosMore } from "react-icons/io"
import { RiHome8Fill } from "react-icons/ri"


const Lists = [
    {
        name: "Home",
        icon: RiHome8Fill,
    },
    {
        name: "DMs",
        icon: FaRegComments,
    },
    {
        name: "Activity",
        icon: GoBell,
    },
    {
        name: "More",
        icon: IoIosMore,
    },
]

export default function CreateSideBar() {

    return (
        <div className="bg-purple-900 h-full w-20">
            {Lists.map((item) => {
                const Icon = item.icon
                return (
                    <div key={item.name} className="flex flex-col items-center gap-3">
                        <Icon className="size-6" />
                        <p className="text-sm">{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
