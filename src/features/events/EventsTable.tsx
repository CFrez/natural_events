import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

import { useEvents } from '@/hooks'
import type { Event } from '@/types'

export const EventsTable = () => {
    const { error, events, isFetching, isPending } = useEvents()

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

    const tableHeadCellStyle = {
        color: 'primary.main',
        fontFamily: 'Oswald Variable, sans-serif',
        fontSize: '1rem',
        fontWeight: 600,
    }

    return (
        <TableContainer
            sx={{
                border: '.5px solid #22418d',
                borderRadius: '0.5rem',
                maxHeight: 440,
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableHeadCellStyle}>Status</TableCell>
                        <TableCell sx={tableHeadCellStyle}>Title</TableCell>
                        <TableCell sx={tableHeadCellStyle}>Categories</TableCell>
                        <TableCell sx={tableHeadCellStyle}>Sources</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{events.map(generateTableRow)}</TableBody>
            </Table>
        </TableContainer>
    )
}
