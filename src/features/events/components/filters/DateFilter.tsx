import { FormControl, InputLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { DateTime } from 'luxon'

import { useEvents } from '@/hooks'

export const DateFilter = () => {
    const {
        filters: { days },
        handleFilterChange,
    } = useEvents().filter

    // the days is how many days before today to show events for
    // so we need to show a date picker that defaults to today
    // and then subtract the days from that date
    const calculatedDate = DateTime.now().minus({ days })

    const handleDateChange = (date: DateTime | null) => {
        if (date) {
            const days = date.diff(DateTime.now(), 'day').days
            handleFilterChange('days', Math.round(Math.abs(days)))
        }
    }

    return (
        <>
            <InputLabel id="date-select-label">Events Since</InputLabel>
            <FormControl fullWidth variant="standard">
                <DatePicker
                    aria-label="Events since date"
                    maxDate={DateTime.now()}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: {
                            variant: 'standard',
                        },
                    }}
                    value={calculatedDate}
                />
            </FormControl>
        </>
    )
}
