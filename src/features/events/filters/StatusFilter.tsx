import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Switch,
} from '@mui/material'

import { useEvents } from '@/hooks'

export const StatusFilter = () => {
    const {
        filter: {
            filters: { closed, open },
            handleFilterChange,
        },
    } = useEvents()

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Status</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            aria-label={`${open ? 'Hide' : 'Show'} open events`}
                            checked={open}
                            onChange={() => handleFilterChange('open', !open)}
                        />
                    }
                    label="Open"
                    name="open"
                />
                <FormControlLabel
                    control={
                        <Switch
                            aria-label={`${closed ? 'Hide' : 'Show'} closed events`}
                            checked={closed}
                            onChange={() => handleFilterChange('closed', !closed)}
                        />
                    }
                    label="Closed"
                    name="closed"
                />
            </FormGroup>
        </FormControl>
    )
}
