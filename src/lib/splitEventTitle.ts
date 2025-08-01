import type { Event } from '@/types'

export const splitEventTitle = (eventTitle: Event['title']) => {
    const title = eventTitle.split(',')[0]
    const location = eventTitle.split(',').slice(1).join(', ')
    return { location, title }
}
