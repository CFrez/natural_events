import { TablePagination } from '@mui/material'

import { useEvents } from '../../hooks'

export const EventsPagination = () => {
    const { events, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
        useEvents()

    return (
        <TablePagination
            component="div"
            count={events.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
    )
}
