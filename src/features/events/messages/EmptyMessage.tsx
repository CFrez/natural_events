import { DataArray } from '@mui/icons-material'
import { Button } from '@mui/material'

import { IconMessage } from '@/components'
import { useEvents } from '@/hooks'

export const EmptyMessage = () => {
    const {
        events,
        filter: { handleResetAll },
    } = useEvents()

    if (events.length === 0) {
        return (
            <IconMessage
                details={
                    <>
                        Adjust filters or search
                        <br />
                        <Button
                            color="primary"
                            onClick={handleResetAll}
                            size="small"
                            variant="contained"
                        >
                            Clear Search and Filters
                        </Button>
                    </>
                }
                icon={<DataArray />}
                message="No data found"
            />
        )
    }
}
