import { useRef, useState } from 'react'

export const usePagination = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const tableTopRef = useRef<HTMLTableElement>(null)

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
        tableTopRef.current?.scrollIntoView({ behavior: 'smooth' })
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
        tableTopRef,
    }
}
