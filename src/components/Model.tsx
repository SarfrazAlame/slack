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
        <div>
           <Header/>
           <CreateSideBar/>
        </div>
    )
}