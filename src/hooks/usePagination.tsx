import { useState } from 'react'

export const usePagination = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return {
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        page,
        rowsPerPage,
    }
}
