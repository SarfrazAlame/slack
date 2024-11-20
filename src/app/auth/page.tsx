'use client'

import SignInPage from "@/logic/auth/component/SignInCard"
import { SignInForm } from "@/utils/schema"
import { useState } from "react"

export default function AuthPage() {
    const [state, setState] = useState<SignInForm>("signin")
    return (
        <div className="bg-fuchsia-950/85 h-full w-full flex justify-center items-center">
        <div className="bg-slate-100 p-12 rounded-lg">
            {
                state === 'signin' ? <SignInPage setState={setState}/> :  null
            }
        </div>
    </div>
    )
}