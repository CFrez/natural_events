import React, { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import type { EventResponse } from '@/types'

import { usePagination } from './usePagination'

export const useEventsContext = () => {
    const pagination = usePagination()

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

    const slicedEvents = useMemo(() => {
        const { page, rowsPerPage } = pagination
        return events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }, [events, pagination])

    const totalEvents = useMemo(() => {
        return events.length
    }, [events])

    return {
        error,
        events: slicedEvents,
        isFetching,
        isPending,
        pagination,
        totalEvents,
    }
}

export const EventsContext = React.createContext<
    ReturnType<typeof useEventsContext> | undefined
>(undefined)

export function useEvents() {
    const context = React.useContext(EventsContext)
    if (context === undefined) {
        throw new Error('useEvents must be used within a EventsContext.Provider')
    }
    return context
}
