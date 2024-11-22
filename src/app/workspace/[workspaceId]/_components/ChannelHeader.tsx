'use client'
import Hint from "@/components/Hint";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

export default function ChannelHeader() {
    const [open, setOpen] = useState(true)
    return (
        <div className="my-4 flex items-center gap-2">
            {
                open ? <IoMdArrowDropdown onClick={() => setOpen(!open)} className="text-white" /> : <IoMdArrowDropright onClick={() => setOpen(!open)} className="text-white" />
            }
            <p className="text-slate-300 font-[500] text-13px">Channels</p>
            <Hint lable="Create Channel">
                <GoPlus className="text-slate-200 hover:bg-purple-500/60 rounded-full size-6 p-0.5 cursor-pointer" />
            </Hint>
        </div>
    )
}