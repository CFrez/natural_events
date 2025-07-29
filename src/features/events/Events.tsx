import { Box } from '@mui/material'

import { EventsContext, useEventsContext } from '@/hooks'

import { EventsPagination } from './EventsPagination'
import { EventsTable } from './EventsTable'

export const Events = () => {
    const context = useEventsContext()

    return (
        <EventsContext.Provider value={context}>
            <Box component="section" sx={{ p: 2 }}>
                <EventsTable />
                <EventsPagination />
            </Box>
        </EventsContext.Provider>
    )
}
