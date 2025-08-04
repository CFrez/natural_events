import { Divider } from '@mui/material'

import { CategoryFilter } from './CategoryFilter'
import { DateFilter } from './DateFilter'
import { FilterControls } from './FilterControls'
import { SourceFilter } from './SourceFilter'
import { StatusFilter } from './StatusFilter'
import { Validation } from './Validation'

export const EventFilters = () => {
    return (
        <>
            <form>
                <StatusFilter />
                <Divider sx={{ my: 2 }} />
                <DateFilter />
                <Divider sx={{ my: 2 }} />
                <CategoryFilter />
                {/* mb reduced to allow for extra spacing around source add button */}
                <Divider sx={{ mb: 1, mt: 2 }} />
                <SourceFilter />
                <Divider sx={{ my: 2 }} />
                <Validation />
            </form>
            <FilterControls />
        </>
    )
}
