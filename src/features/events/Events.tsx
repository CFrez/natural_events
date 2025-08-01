import { Box } from '@mui/material'

import { Modal } from '@/components'
import { EventsContext, useEventsContext } from '@/hooks'

import { EventDetails } from './EventDetails'
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
                <Box
                    component="section"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        overflow: 'auto',
                        p: 3,
                        pb: 1,
                    }}
                >
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
                            p: 3,
                            width: 'clamp(200px, 25%, 250px)',
                        }}
                    >
                        <EventFilters />
                    </Box>
                )}
                <Modal
                    onClose={() => context.setSelectedEvent(undefined)}
                    open={!!context.selectedEvent}
                >
                    <EventDetails />
                </Modal>
            </EventsContext.Provider>
        </Box>
    )
}
