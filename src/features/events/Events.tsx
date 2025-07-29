import { Box, Typography } from '@mui/material'

import { EventsContext, useEventsContext } from '@/hooks'

import { EventsPagination } from './EventsPagination'
import { EventsTable } from './EventsTable'

export const Events = () => {
    const context = useEventsContext()

    return (
        <EventsContext.Provider value={context}>
            <Typography variant="h2" component="h1" sx={{ textAlign: 'center' }}>
                Natural Events
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
                <EventsTable />
                <EventsPagination />
            </Box>
        </EventsContext.Provider>
    )
}
