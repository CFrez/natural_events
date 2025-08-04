import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'

import { useEvents } from '@/hooks'

export const StatusFilter = () => {
    const {
        filter: {
            filters: { status },
            handleFilterChange,
        },
    } = useEvents()

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" id="status-filter-label">
                Status
            </FormLabel>
            <RadioGroup
                aria-labelledby="status-filter-label"
                name="status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
                sx={{
                    '& .MuiFormControlLabel-root': {
                        lineHeight: 1,
                    },
                }}
                value={status}
            >
                <FormControlLabel
                    control={<Radio size="small" />}
                    label="Open"
                    value="open"
                />
                <FormControlLabel
                    control={<Radio size="small" />}
                    label="Closed"
                    value="closed"
                />
            </RadioGroup>
        </FormControl>
    )
}
