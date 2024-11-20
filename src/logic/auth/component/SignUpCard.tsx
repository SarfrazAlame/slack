import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignInForm } from "@/utils/schema"
import { useAuthActions } from "@convex-dev/auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SignUpCardProps {
    setState: (state: SignInForm) => void
}

export default function SignUpPage({ setState }: SignUpCardProps) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')

    const { signIn } = useAuthActions()

    const onSubmitHander = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)

        signIn("password", {
            name,
            email,
            password,
        }).then(() => {
            router.push('/')
        }).catch((error) => {
            setError('Invalid email or password')
        }).finally(() => {
            setPending(false)
        })
    }

    const handleProviderSignIn = async (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => {
            setPending(false)
        })
    }

    return (
        <div>
            <div>
                <p className="text-2xl font-[600] tracking-wide">Sign Up to Continue</p>
                <p className="text-sm text-slate-600">Use your email or another service to continue</p>
            </div>
            <div>
                <form className="space-y-4 my-4" onSubmit={onSubmitHander} >
                    <Input placeholder="Name" className="" onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Email" className="" onChange={(e) => setEmail(e.target.value)} />

                    <Input placeholder="Password" className="" onChange={(e) => setPassword(e.target.value)} />
                    <p>{error}</p>
                    <Button type="submit" className="w-full h-12">
                        Continue
                    </Button>
                    <Button onClick={() => { handleProviderSignIn('google') }} type="button" variant={'secondary'} className="w-full h-12 border">
                        <FcGoogle className="" />
                        <p> Continue with Google</p>
                    </Button>
                    <Button onClick={() => { handleProviderSignIn('github') }} type="button" variant={'secondary'} className="w-full h-12 border">
                        <FaGithub className="" />
                        <p> Continue with Github</p>
                    </Button>
                    <div>
                        <p className="text-sm text-slate-600">Don't have an account? <span onClick={() => setState("signin")} className="text-blue-600 cursor-pointer">Sign up</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
