import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useGetUser = () =>{
    const data = useQuery(api.user.get)
    const isLaoding = data===undefined

    return{
        data,
        isLaoding
    }
}