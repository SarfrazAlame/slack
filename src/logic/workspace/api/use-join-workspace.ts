import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useCallback, useMemo, useState } from "react"
import { Id } from "../../../../convex/_generated/dataModel"

type RequestType = {
    workspaceId: Id<'workspace'>
    joinCode: string
}

type ResponceType = Id<'workspace'>

type Options = {
    onSuccess?: (data: ResponceType) => void,
    onError?: (error: Error) => void,
    onSettled?: () => void,
    onThrowError?: boolean
}

export const useJoinWorkspace = () => {
    const [data, setData] = useState<ResponceType | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const [status, setStatus] = useState<'success' | 'error' | 'pending' | 'settled' | null>(null)

    const isPending = useMemo(() => status === "pending", [status])
    const isSuccess = useMemo(() => status === "success", [status])
    const isError = useMemo(() => status === "error", [status])
    const isSettled = useMemo(() => status === "settled", [status])

    const mutation = useMutation(api.workspace.joinWorkspace)

    const mutate = useCallback(async (values: RequestType, options: Options) => {
        try {
            setData(null)
            setStatus(null)
            setError(null)

            const response = await mutation(values)
            options.onSuccess?.(response._id)

            return response
        } catch (error) {
            setStatus('error')
            options.onError?.(error as Error)
        } finally {
            options.onSettled?.()
        }
    }, [mutation])

    return {
        data,
        mutate,
        isError,
        isPending,
        isSettled,
        isSuccess
    }

}