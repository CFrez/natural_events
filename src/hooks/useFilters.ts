import { useCallback, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { categoryIdMap } from '@/lib'
import type { CategoryResponse, Filters, SourceResponse } from '@/types'

const defaultFilters: Filters = {
    category: 'all',
    days: 30,
    sources: [],
    status: 'open',
    validation: 42,
}

export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>(defaultFilters)
    const [formErrors, setFormErrors] = useState<
        Partial<Record<keyof Filters, string>>
    >({})
    const [hasChanged, setHasChanged] = useState(false)
    // Title search is kept separate since the API does not support it
    // so it is done locally
    const [titleSearch, setTitleSearch] = useState('')

    const { data: { categories = [] } = {} } = useQuery<CategoryResponse>({
        queryFn: async () => {
            const response = await fetch(
                'https://eonet.gsfc.nasa.gov/api/v3/categories',
            )
            return await response.json()
        },
        queryKey: ['categories'],
    })

    const { data: { sources = [] } = {} } = useQuery<SourceResponse>({
        queryFn: async () => {
            const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/sources')
            return await response.json()
        },
        queryKey: ['sources'],
    })

    const generateUrl = useCallback(() => {
        const { category, days, sources, status } = filters
        let url = 'https://eonet.gsfc.nasa.gov/api/v2.1/'

        if (category !== 'all') {
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

        // If no status is provided, the API will return only open events
        if (status === 'closed') {
            // https://eonet.gsfc.nasa.gov/api/v2.1/events?status=closed
            queryParams.append('status', 'closed')
        }

        if (days) {
            // https://eonet.gsfc.nasa.gov/api/v2.1/events?days=20
            queryParams.append('days', days.toString())
        }
        url += `?${queryParams.toString()}`

        setHasChanged(false)
        return url
    }, [filters])

    const handleReset = () => {
        setFilters(defaultFilters)
        setHasChanged(false)
    }

    const handleResetAll = () => {
        handleReset()
        setTitleSearch('')
    }

    const handleFilterChange = (
        name: keyof Filters,
        value: (typeof filters)[keyof Filters],
    ) => {
        setHasChanged(true)
        setFilters({ ...filters, [name]: value })
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleSearch(event.target.value)
    }

    const validateForm = () => {
        const validationError =
            filters.validation !== 42 && filters.validation !== undefined

        // All other fields do not allow for invalid input
        // so we only need to validate the validation field
        if (validationError) {
            setFormErrors({
                validation: 'Please make sure the answer is 42!',
            })
        } else {
            setFormErrors({})
        }
        return !validationError
    }

    const categoryOptions = useMemo(() => {
        return categories?.map((category) => ({
            label: category.title,
            value: category.id,
        }))
    }, [categories])

    const sourceOptions = useMemo(() => {
        return sources?.map((source) => ({
            label: source.title,
            value: source.id,
        }))
    }, [sources])

    return {
        categoryOptions,
        filters,
        formErrors,
        generateUrl,
        handleFilterChange,
        handleReset,
        handleResetAll,
        handleTitleChange,
        hasChanged,
        sourceOptions,
        titleSearch,
        validateForm,
    }
}
