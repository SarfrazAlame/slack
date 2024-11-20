import {z} from 'zod'

export const SignInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(4)
})

export const SignUpSchema = z.object({
    name:z.string().min(1).max(30),
    email:z.string(),
    password:z.string()
})



export type SignInForm = "signin"|"signup"
