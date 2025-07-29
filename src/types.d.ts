export interface Category {
    id: number
    title: string
}

export interface Event {
    categories: Category[]
    closed: boolean
    description?: string
    geometries: Geometry[]
    id: string
    link: string
    sources: Source[]
    title: string
}

export interface EventResponse {
    description: string
    events: Event[]
    link: string
    title: string
}

export interface Geometry {
    coordinates: number[][]
    date: string
    type: string
}

export interface Source {
    id: number
    url: string
}
