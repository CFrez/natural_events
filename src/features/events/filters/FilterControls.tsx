import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, Button, IconButton } from '@mui/material'

import { useEvents } from '@/hooks/useEvents'

export const FilterControls = () => {
    const {
        filter: { handleReset, hasChanged },
        handleRefetch,
    } = useEvents()

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                aria-label="Apply Filters"
                color="primary"
                disabled={!hasChanged}
                onClick={handleRefetch}
                sx={{
                    flexGrow: 1,
                }}
                type="submit"
                variant="contained"
            >
                Apply
            </Button>
            <IconButton
                aria-label="Reset Filters"
                color="secondary"
                onClick={handleReset}
                type="button"
            >
                <RestartAltIcon />
            </IconButton>
        </Box>
    )
}
