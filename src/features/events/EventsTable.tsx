import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

import { StatusIcon } from '@/components'
import { useEvents } from '@/hooks'
import type { Event } from '@/types'

import { TitleSearch } from './filters/TitleSearch'
import { EmptyMessage, ErrorMessage, LoadingMessage } from './messages'

export const EventsTable = () => {
    const { error, events, isLoading, setSelectedEvent } = useEvents()

    const generateTableRow = (event: Event) => {
        const title = event.title.split(',')[0]
        const location = event.title.split(',').slice(1).join(', ')

        return (
            <TableRow
                hover
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                role="checkbox"
                tabIndex={-1}
            >
                <TableCell sx={{ textAlign: 'center', width: '50px' }}>
                    <StatusIcon closed={event.closed} label="Event status" />
                </TableCell>
                <TableCell>
                    {title}
                    <br />
                    {location}
                </TableCell>
                <TableCell>
                    {event.categories.map((category) => category.title).join(', ')}
                </TableCell>
                <TableCell>
                    {event.sources.map((source) => source.id).join(', ')}
                </TableCell>
            </TableRow>
        )
    }

    const needsMessage = events.length === 0 || isLoading || !!error

    const getMessage = () => {
        return (
            <TableRow>
                <TableCell
                    colSpan={4}
                    sx={{
                        border: 'none',
                        height: '100%',
                        pt: '5rem',
                    }}
                >
                    {isLoading ? (
                        <LoadingMessage />
                    ) : error ? (
                        <ErrorMessage />
                    ) : (
                        <EmptyMessage />
                    )}
                </TableCell>
            </TableRow>
        )
    }

    const tableHeadCellStyle = {
        color: 'primary.main',
        fontFamily: 'Oswald Variable, sans-serif',
        fontSize: '1rem',
        fontWeight: 600,
        p: '.75rem 1rem',
    }

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
                <TableBody>
                    {needsMessage ? getMessage() : events.map(generateTableRow)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
