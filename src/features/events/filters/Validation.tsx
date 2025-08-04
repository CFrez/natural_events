import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'

import { useEvents } from '@/hooks'

export const Validation = () => {
    const {
        filters: { validation },
        formErrors: { validation: error },
        handleFilterChange,
    } = useEvents().filter

    return (
        <>
            <InputLabel error={error} id="validation-filter-label">
                Validation
            </InputLabel>
            <FormControl error={error} fullWidth variant="standard">
                <Input
                    aria-label="Validation"
                    aria-labelledby="validation-filter-label"
                    inputProps={{
                        step: 2,
                        type: 'number',
                    }}
                    name="validation"
                    onChange={(e) =>
                        handleFilterChange('validation', Number(e.target.value))
                    }
                    value={validation}
                />
                <FormHelperText>The only allowable answer is 42</FormHelperText>
            </FormControl>
        </>
    )
}
