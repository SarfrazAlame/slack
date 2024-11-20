'use client'
import { useEffect, useState } from "react";
import Header from "./Header";
import CreateSideBar from "./CreateSideBar";


export default function Model(){
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
           <CreateSideBar/>
        </div>
    )
}