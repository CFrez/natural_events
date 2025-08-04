import { Circle } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

import { convertDateToString } from '@/lib'

interface StatusIconProps {
    closedDate?: string
    label: string
}

/**
 * A component that displays a colored status circle based on the `closedDate` prop.
 * Provides a tooltip with the date the event was closed.
 * Includes an `aria-label` that describes the status.
 *
 * __Required__
 * @param label - The label to display for the icon.
 *
 * __Optional__
 * @param closedDate - The date the event was closed.
 */
export const StatusIcon = ({ closedDate, label }: StatusIconProps) => {
    const stringDescription = closedDate
        ? `Closed: ${convertDateToString(new Date(closedDate))}`
        : 'Open'

    return (
        <Tooltip title={stringDescription}>
            <Circle
                aria-label={`${label}: ${stringDescription}`}
                role="img"
                sx={{ color: closedDate ? 'error.main' : 'success.main' }}
            />
        </Tooltip>
    )
}
