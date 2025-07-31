import { useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import type { CategoryResponse, Filters, SourceResponse } from '@/types'

const defaultFilters: Filters = {
    category: '',
    closed: false,
    days: 30,
    open: true,
    sources: [],
}

export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>(defaultFilters)
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

    const handleReset = () => {
        setFilters(defaultFilters)
        setHasChanged(false)
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(filters)
        setHasChanged(false)
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
        handleFilterChange,
        handleReset,
        handleSubmit,
        handleTitleChange,
        hasChanged,
        sourceOptions,
        titleSearch,
    }
}
