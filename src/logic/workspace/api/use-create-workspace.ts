import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { useCallback, useMemo, useState } from "react"

type RequestType = { name: string }
type ResponceType = Id<'workspace'> | null

type Options = {
    onSuccess?: (data: ResponceType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onthrowError?: boolean
}

export const useCreateWorkspace = () => {
    const [data, setData] = useState<ResponceType>(null)
    const [error, setError] = useState<Error | null>(null)

    const [status, setStatus] = useState<'success' | 'error' | 'settled' | 'pending' | null>(null)

    const isPending = useMemo(() => status === "pending", [status])
    const isSuccess = useMemo(() => status === "success", [status])
    const isError = useMemo(() => status === "error", [status])
    const isSettled = useMemo(() => status === "settled", [status])


    const mutation = useMutation(api.workspace.create)

    const mutate = useCallback(async (values: RequestType, options: Options) => {
        try {
            setData(null)
            setStatus(null)
            setError(null)

            const response = await mutation(values)
            options.onSuccess?.(response)
            return response

        } catch (error) {
            setStatus('error')
            options.onError?.(error as Error)
            if (options.onthrowError) {
                throw error
            }
        } finally {
            setStatus('settled'),
                options.onSettled?.()
        }
    }, [mutation])

    return {
        mutate,
        data,
        error,
        isError,
        isPending,
        isSettled,
        isSuccess,
    }

}