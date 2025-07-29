import {
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    TableBody,
    Table,
} from '@mui/material'

import { useEvents } from '../../hooks'
import type { Event } from '../../types'

export const EventsTable = () => {
    const { events, page, rowsPerPage, isPending, isFetching, error } = useEvents()

    const generateTableRow = (row: Event) => {
        return (
            <TableRow hover key={row.id} role="checkbox" tabIndex={-1}>
                <TableCell>{row.closed ? 'Closed' : 'Open'}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                    {row.categories.map((category) => category.title).join(', ')}
                </TableCell>
                <TableCell>
                    {row.sources.map((source) => source.id).join(', ')}
                </TableCell>
            </TableRow>
        )
    }

    if (isPending || isFetching) return <div>Loading...</div>
    if (error) return <div>An error has occurred: {error.message}</div>

    return (
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell>Sources</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(generateTableRow)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
