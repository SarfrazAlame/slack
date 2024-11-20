import { Search } from "lucide-react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";


export default function Header() {
    return (
        <div className="w-full h-9 bg-purple-900 flex justify-center items-center gap-3">
            <div className="flex  items-center gap-3">
                <IoMdArrowBack className="size-5 text-purple-300" />
                <IoMdArrowForward className="size-5 text-purple-300" />
            </div>
            <input type="text" className="relative rounded-md bg-purple-500/40 w-1/2 h-6 px-3 text-sm placeholder:text-slate-100" placeholder="Search here" />
            <Search size={18} className="absolute right-1/4 tems-center text-purple-200/60" />
            <AiOutlineQuestionCircle className="absolute right-2 size-7 text-slate-100 hover:bg-purple-400/90 transition-all p-1 rounded-sm cursor-pointer" />
        </div>
    )
}