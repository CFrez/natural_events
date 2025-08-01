import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { Event, EventResponse } from '@/types'

import { useFilters } from './useFilters'
import { usePagination } from './usePagination'

export const useEventsContext = () => {
    const queryClient = useQueryClient()

    const pagination = usePagination()
    const filter = useFilters()

    const [selectedEvent, setSelectedEvent] = useState<Event>()

    const {
        data: { events = [] } = {},
        error,
        isFetching,
        isPending,
        refetch,
    } = useQuery<EventResponse>({
        queryFn: async () => {
            const response = await fetch(filter.generateUrl())
            return await response.json()
        },
        queryKey: ['nasaEvents'],
    })

    const handleRefetch = useCallback(() => {
        const { onPageChange: handleChangePage } = pagination
        handleChangePage(null, 0)
        refetch()
    }, [pagination, refetch])

    // HACK: after filters have been reset, the events are refetched
    // This avoids a race condition where the events are refetched before the filters are reset
    const hasRefetched = useRef(false)
    useEffect(() => {
        if (!filter.hasChanged && !hasRefetched.current) {
            handleRefetch()
            hasRefetched.current = true
        } else if (filter.hasChanged) {
            hasRefetched.current = false
        }
    }, [filter.hasChanged, handleRefetch])

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            queryClient.cancelQueries({ queryKey: ['nasaEvents'] })
        },
        [queryClient],
    )

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
        handleCancel,
        handleRefetch,
        isLoading: isFetching || isPending,
        pagination,
        selectedEvent,
        setSelectedEvent,
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
