export interface Category {
    description: string
    id: string
    layers: string
    link: string
    title: string
}

export interface CategoryResponse extends Response {
    categories: Category[]
}

export interface Event {
    categories: Category[]
    closed: boolean
    description?: string
    geometries: EventGeometry[]
    id: string
    link: string
    sources: EventSource[]
    title: string
}

export interface EventCategory {
    id: string
    title: string
}

export interface EventGeometry {
    coordinates: number[][]
    date: string
    type: 'Point' | 'Polygon'
}

export interface EventResponse extends Response {
    events: Event[]
}

export interface EventSource {
    id: string
    url: string
}

export interface Filters {
    category: string
    closed: boolean
    days: number
    open: boolean
    sources: string[]
}

export interface Response {
    description: string
    link: string
    title: string
}

export interface Source {
    id: string
    link: string
    source: string
    title: string
}

export interface SourceResponse extends Response {
    sources: Source[]
}
