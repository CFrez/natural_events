import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import type { EventResponse } from './types'

export const Events = () => {
    const { isPending, error, data, isFetching } = useQuery<EventResponse>({
        queryKey: ['nasaEvents'],
        queryFn: async () => {
            const response = await fetch(
                'https://eonet.gsfc.nasa.gov/api/v2.1/events?days=1',
            )
            return await response.json()
        },
    })

    if (isPending || isFetching) return <div>Loading...</div>
    if (error) return <div>An error has occurred: {error.message}</div>

    return (
        <Box component="section">
            {data?.events.map((event) => (
                <Box key={event.id} component="article">
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="body1">{event.description}</Typography>
                    <Typography variant="body1">
                        {event.closed ? 'Closed' : 'Open'}
                    </Typography>
                    <Typography variant="body1">
                        {event.categories.map((category) => category.title).join(', ')}
                    </Typography>
                    <Typography variant="body1">
                        {event.sources.map((source) => source.url).join(', ')}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}
