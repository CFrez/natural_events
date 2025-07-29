import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import type { EventResponse } from './types'

export const Events = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const {
        data: { events = [] } = {},
        error,
        isFetching,
        isPending,
    } = useQuery<EventResponse>({
        queryFn: async () => {
            const response = await fetch(
                'https://eonet.gsfc.nasa.gov/api/v2.1/events?days=30',
            )
            return await response.json()
        },
        queryKey: ['nasaEvents'],
    })

    if (isPending || isFetching) return <div>Loading...</div>
    if (error) return <div>An error has occurred: {error.message}</div>

    return (
        <Paper sx={{ p: 2, height: '100%' }}>
            <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
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
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell>
                                            {row.closed ? 'Closed' : 'Open'}
                                        </TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>
                                            {row.categories
                                                .map((category) => category.title)
                                                .join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            {row.sources
                                                .map((source) => source.id)
                                                .join(', ')}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
