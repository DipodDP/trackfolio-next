import PortfolioProvider from '@/context/PortfolioContext'
import { QueryProvider } from '@/lib/react-query/QueryProvider'
import { StoreProvider } from '@/store/StoreProvider'
import React from 'react'

export function Providers(props: { children: React.ReactNode }) {

    return (
        <QueryProvider>
            <StoreProvider>
                <PortfolioProvider>
                    {props.children}
                </PortfolioProvider>
            </StoreProvider>
        </QueryProvider>
    )
}
