import { Box } from '@mui/material'

import { EventsContext, useEventsContext } from '@/hooks'

import { EventsPagination } from './EventsPagination'
import { EventsTable } from './EventsTable'
import { EventFilters } from './filters/EventFilters'

export const Events = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
    const context = useEventsContext()

    return (
        <Box
            component="main"
            sx={{ display: 'flex', flexGrow: 1, overflow: 'auto', width: '100%' }}
        >
            <EventsContext.Provider value={context}>
                <Box component="section" sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                    <EventsTable />
                    <EventsPagination />
                </Box>
                {isDrawerOpen && (
                    <Box
                        component="aside"
                        sx={{
                            backgroundColor: 'primary.lighter',
                            display: 'flex',
                            flexDirection: 'column',
                            flexShrink: 0,
                            height: '100%',
                            justifyContent: 'space-between',
                            overflow: 'auto',
                            p: 2,
                            width: 200,
                        }}
                    >
                        <EventFilters />
                    </Box>
                )}
            </EventsContext.Provider>
        </Box>
    )
}
