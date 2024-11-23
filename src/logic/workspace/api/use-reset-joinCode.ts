import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { useCallback, useMemo, useState } from "react"

type RequestType = { workspaceId: Id<'workspace'> }
type ResponceType = Id<'workspace'> | null

type Options = {
    onSuccess?: (data: ResponceType) => void,
    onError?: (error:Error) => void,
    onSettled?: () => void
    onThrowError?: boolean
}

export const useResetJoinCode = () => {
    const [data, setData] = useState<ResponceType | null>(null)
    const [error,setError] = useState<Error | null>(null)
    const [status, setStatus] = useState<'success' | 'error' | 'settled' | 'pending' | null>(null)

    const isSuccess = useMemo(() => status === 'success', [data])
    const isError = useMemo(() => status === 'error', [data])
    const isPending = useMemo(() => status === 'pending', [data])
    const isSettled = useMemo(() => status === 'settled', [data])

    const mutation = useMutation(api.workspace.reset)

    const mutate = useCallback(async (values: RequestType, options: Options) => {
        try {
            setData(null)
            setError(null)
            setStatus('pending')
            const response = await mutation(values)
            options?.onSuccess?.(response)

            return response
        } catch (error) {
            setStatus('error')
            options?.onError?.(error as Error)
            if(options?.onThrowError){
                throw error
            }
        }finally{
            setStatus('settled')
            options.onSettled?.()
        }
    }, [mutation])

    return {
        mutate,
        data,
        error,
        isPending,
        isSettled,
        isSuccess,
        isError
    }

}