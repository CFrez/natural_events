import { Box, Typography } from '@mui/material'

import { Map, StatusIcon } from '@/components'
import { useEvents } from '@/hooks'
import { splitEventTitle } from '@/lib'

export const EventDetails = () => {
    const { selectedEvent } = useEvents()

    if (!selectedEvent) return null

    const { closed, geometries, title: eventTitle } = selectedEvent

    const { location, title } = splitEventTitle(eventTitle)

    return (
        <>
            <Box
                component="header"
                sx={{
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    // HACK: This is so it doesn't overlap the close button
                    pr: 20,
                }}
            >
                <StatusIcon closedDate={closed} label="Event status" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        sx={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: 1.2 }}
                        variant="h6"
                    >
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem' }}>{location}</Typography>
                </Box>
            </Box>
            <Box sx={{ height: '50vh', width: '100%' }}>
                <Map geometries={geometries} />
            </Box>
        </>
    )
}
