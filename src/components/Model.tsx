'use client'
import { useEffect, useState } from "react";
import Header from "./Header";
import CreateSideBar from "./CreateSideBar";
import { Id } from "../../convex/_generated/dataModel";


export default function Model({workspaceId}:{workspaceId:Id<'workspace'>}){
    const [mounted,setMounted] = useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null
    }

    return (
        <div className="h-full flex flex-col">
           <Header/>
           <CreateSideBar workspaceId={workspaceId} />
        </div>
    )
}