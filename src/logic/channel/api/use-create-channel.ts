import { useMutation } from "convex/react"
import { useCallback, useMemo, useState } from "react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

type RequestType = { name: string, workspaceId: Id<'workspace'> }
type ResponceType = Id<'channel'> | null

type Options = {
    onSuccess?: (data: ResponceType) => void
    onError?: (error: Error) => void
    onSettled?: () => void
    onthrowError?: boolean
}

export const useCreateChannel = () => {
    const [data, setData] = useState<ResponceType>(null)
    const [status, setStatus] = useState<'success' | 'pending' | 'error' | 'settled' | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const isSuccess = useMemo(() => status === 'success', [status])
    const isPending = useMemo(() => status === 'pending', [status])
    const isError = useMemo(() => status === 'error', [status])
    const isSettled = useMemo(() => status === 'settled', [status])

    const mutation = useMutation(api.channel.create)
    const mutate = useCallback(async (values: RequestType, options: Options) => {
        try {
            setData(null)
            setStatus(null)
            setError(null)

            const response = await mutation(values)
            options.onSuccess?.(response)
            return response
        } catch (error) {
            options.onError?.(error as Error)
            setStatus('error')
            if (options.onthrowError) {
                throw error
            }
        } finally {
            setStatus('settled')
            options.onSettled?.()
        }
    }, [])

    return {
        mutate,
        data,
        isError,
        isPending,
        isSettled,
        isSuccess
    }
}

