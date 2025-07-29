import { Box } from '@mui/material'

import { useEventsHook, EventsContext } from '../../hooks'
import { EventsTable } from './EventsTable'
import { EventsPagination } from './EventsPagination'

export const Events = () => {
    const hook = useEventsHook()

    return (
        <EventsContext.Provider value={hook}>
            <Box component="section" sx={{ p: 2 }}>
                <EventsTable />
                <EventsPagination />
            </Box>
        </EventsContext.Provider>
    )
}
