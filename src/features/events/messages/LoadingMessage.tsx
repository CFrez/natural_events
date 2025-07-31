import { Button, CircularProgress } from '@mui/material'

import { IconMessage } from '@/components'
import { useEvents } from '@/hooks'

export const LoadingMessage = () => {
    const {
        filter: {
            filters: { days },
        },
        handleCancel,
    } = useEvents()

    return (
        <IconMessage
            details={
                days > 30 ? (
                    <>
                        With a large number of days selected, this may take a while to
                        load.
                        <br />
                        <Button
                            color="error"
                            onClick={handleCancel}
                            size="small"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                    </>
                ) : undefined
            }
            icon={<CircularProgress />}
            message="Loading..."
        />
    )
}
