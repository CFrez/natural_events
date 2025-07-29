import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import type { EventResponse } from '../types'

export const useEventsHook = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const {
        data: { events = [] } = {},
        error,
        isFetching,
        isPending,
    } = useQuery<EventResponse>({
        queryFn: async () => {
            const response = await fetch(
                'https://eonet.gsfc.nasa.gov/api/v2.1/events?days=30',
            )
            return await response.json()
        },
        queryKey: ['nasaEvents'],
    })

    return {
        events,
        error,
        isFetching,
        isPending,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
    }
}

export const EventsContext = React.createContext<
    ReturnType<typeof useEventsHook> | undefined
>(undefined)

export function useEvents() {
    const context = React.useContext(EventsContext)
    if (context === undefined) {
        throw new Error('useEvents must be used within a Events.Provider')
    }
    return context
}
