import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignInForm } from "@/utils/schema"
import { useAuthActions } from "@convex-dev/auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SignInCardProps {
    setState: (state: SignInForm) => void
}


export default function SignInPage({ setState }: SignInCardProps) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')

    const { signIn } = useAuthActions()
    const onSubmitHander = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)

        await signIn("password", {
            email,
            password,
            flow: "signIn"
        }).then(() => {
            router.push('/')
        }).catch((error) => {
            setError('Invalid email or password')
        }).finally(() => {
            setPending(false)
        })
    }

    const handleProviderSignIn = async(value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => {
            setPending(false)
        })
    }
    return (
        <div>
        <div>
            <p className="text-2xl font-[600] tracking-wide">Login to Continue</p>
            <p className="text-sm text-slate-600">Use your email or another service to continue</p>
        </div>
        <div>
            <form className="space-y-4 my-4" >
                <Input placeholder="Email" className="" onChange={(e) => setEmail(e.target.value)} />

                <Input placeholder="Password" className="" onChange={(e) => setPassword(e.target.value)} />

                <Button type="submit" className="w-full h-12">
                    Continue
                </Button>
                <Button onClick={() => { }} type="button" variant={'secondary'} className="w-full h-12 border">
                    <FcGoogle className="" />
                    <p> Continue with Google</p>
                </Button>
                <Button onClick={() => void signIn('github')} type="button" variant={'secondary'} className="w-full h-12 border">
                    <FaGithub className="" />
                    <p> Continue with Github</p>
                </Button>
                <div>
                    <p className="text-sm text-slate-600">Don't have an account? <span onClick={() => setState("signup")} className="text-blue-600 cursor-pointer">Sign up</span></p>
                </div>
            </form>
        </div>
    </div>
    )
}