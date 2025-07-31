import { Divider } from '@mui/material'

import { CategoryFilter } from './CategoryFilter'
import { DateFilter } from './DateFilter'
import { FilterControls } from './FilterControls'
import { SourceFilter } from './SourceFilter'
import { StatusFilter } from './StatusFilter'

export const EventFilters = () => {
    return (
        <>
            <form>
                <StatusFilter />
                <Divider sx={{ my: 2 }} />
                <CategoryFilter />
                <Divider sx={{ my: 2 }} />
                <SourceFilter />
                <Divider sx={{ my: 2 }} />
                <DateFilter />
            </form>
            <FilterControls />
        </>
    )
}
