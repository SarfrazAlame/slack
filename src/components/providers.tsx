import { Provider } from 'jotai'
import React from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}