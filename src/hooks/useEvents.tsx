import React, { useCallback, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { categoryIdMap } from '@/lib'
import type { EventResponse } from '@/types'

import { useFilters } from './useFilters'
import { usePagination } from './usePagination'

export const useEventsContext = () => {
    const pagination = usePagination()
    const filter = useFilters()

    const fetchFn = useCallback(() => {
        const { category, closed, days, open, sources } = filter.filters
        let url = 'https://eonet.gsfc.nasa.gov/api/v2.1/'

        if (category !== '') {
            // https://eonet.gsfc.nasa.gov/api/v2.1/categories/8?source=InciWeb
            url += `categories/${categoryIdMap[category]}`
        } else {
            url += `events`
        }

        const queryParams = new URLSearchParams()
        if (sources.length > 0) {
            // https://eonet.gsfc.nasa.gov/api/v2.1/events?source=InciWeb,EO
            queryParams.append('source', sources.join(','))
        }

        if (open && !closed) {
            // https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open
            queryParams.append('status', 'open')
        } else if (!open && closed) {
            // https://eonet.gsfc.nasa.gov/api/v2.1/events?status=closed
            queryParams.append('status', 'closed')
        }

        if (days) {
            // https://eonet.gsfc.nasa.gov/api/v2.1/events?days=20
            queryParams.append('days', days.toString())
        }
        url += `?${queryParams.toString()}`

        return fetch(url)
    }, [filter.filters])

    const {
        data: { events = [] } = {},
        error,
        isFetching,
        isPending,
        refetch,
    } = useQuery<EventResponse>({
        queryFn: async () => {
            const response = await fetchFn()
            return await response.json()
        },
        queryKey: ['nasaEvents'],
    })

    const handleReset = useCallback(() => {
        filter.handleReset()
        refetch()
    }, [filter.handleReset, refetch])

    const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            event.title.toLowerCase().includes(filter.titleSearch.toLowerCase()),
        )
    }, [events, filter.titleSearch])

    const slicedEvents = useMemo(() => {
        const { page, rowsPerPage } = pagination

        return filteredEvents.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        )
    }, [filteredEvents, pagination])

    const totalEvents = useMemo(() => {
        return filteredEvents.length
    }, [filteredEvents])

    return {
        error,
        events: slicedEvents,
        filter,
        handleRefetch: refetch,
        handleReset,
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
