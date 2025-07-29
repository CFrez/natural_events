export interface Category {
    id: number
    title: string
}

export interface Source {
    id: number
    url: string
}

export interface Geometry {
    type: string
    coordinates: number[][]
    date: string
}

export interface Event {
    id: string
    title: string
    description?: string
    link: string
    categories: Category[]
    sources: Source[]
    geometries: Geometry[]
    closed: boolean
}

export interface EventResponse {
    link: string
    title: string
    description: string
    events: Event[]
}
