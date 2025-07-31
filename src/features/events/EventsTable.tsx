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

import { TitleSearch } from './filters/TitleSearch'

export const EventsTable = () => {
    const { error, events, isFetching, isPending } = useEvents()

    const generateTableRow = (row: Event) => {
        const title = row.title.split(',')[0]
        const location = row.title.split(',').slice(1).join(', ')

        return (
            <TableRow hover key={row.id} role="checkbox" tabIndex={-1}>
                <TableCell>{row.closed ? 'Closed' : 'Open'}</TableCell>
                <TableCell>
                    {title}
                    <br />
                    {location}
                </TableCell>
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

    // TODO: Have table fill full height of container with pagination at bottom of screen
    // TODO: Add a loading state to the table
    // TODO: Add a no data state to the table

    return (
        <TableContainer
            sx={{
                border: '.5px solid #22418d',
                borderRadius: '0.5rem',
                flexGrow: 1,
                height: '100%',
            }}
        >
            <Table stickyHeader>
                <TableHead
                    // Since the Title header cell didn't stick this was needed
                    sx={{
                        position: 'sticky',
                        top: 0,
                    }}
                >
                    <TableRow>
                        <TableCell sx={tableHeadCellStyle}>Status</TableCell>
                        <TableCell
                            sx={{
                                ...tableHeadCellStyle,
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                            }}
                        >
                            Title
                            <TitleSearch />
                        </TableCell>
                        <TableCell sx={tableHeadCellStyle}>Categories</TableCell>
                        <TableCell sx={tableHeadCellStyle}>Sources</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{events.map(generateTableRow)}</TableBody>
            </Table>
        </TableContainer>
    )
}
