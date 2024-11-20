
import { FaRegComments } from "react-icons/fa"
import { GoBell } from "react-icons/go"
import { IoIosMore } from "react-icons/io"
import { RiHome8Fill } from "react-icons/ri"


const List = [
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

export default function Lists(){
    return(
       <>
        <div className="flex flex-col items-center gap-6 my-5">
             {List.map((item) => {
                const Icon = item.icon
                return (
                    <div key={item.name} className="flex flex-col items-center cursor-pointer">
                        <Icon className="size-9 hover:bg-transparent/40 text-slate-300 p-1.5 rounded-md" />
                        <p className="text-[13px] text-slate-300 font-semibold">{item.name}</p>
                    </div>
                )
            })}
        </div>
       </>
    )
}