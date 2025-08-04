import { TablePagination } from '@mui/material'

import { useEvents } from '@/hooks'

export const EventsPagination = () => {
    const { pagination, totalEvents } = useEvents()

    return (
        <TablePagination
            component="div"
            count={totalEvents}
            rowsPerPageOptions={[5, 10, 25, 50]}
            {...pagination}
        />
    )
}
