import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from '@mui/material'

import { useEvents } from '@/hooks'

export const CategoryFilter = () => {
    const {
        categoryOptions,
        filters: { category },
        handleFilterChange,
    } = useEvents().filter

    const handleSelectChange = (event: SelectChangeEvent) => {
        handleFilterChange('category', event.target.value as string)
    }

    return (
        <>
            <InputLabel id="category-select-label">Category</InputLabel>
            <FormControl fullWidth variant="standard">
                <Select
                    aria-label="Category"
                    id="category-select"
                    labelId="category-select-label"
                    name="category"
                    onChange={handleSelectChange}
                    value={category}
                >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categoryOptions?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
