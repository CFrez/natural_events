import { Circle } from '@mui/icons-material'

interface StatusIconProps {
    closed: boolean
    label: string
}

/**
 * A component that displays a colored status circle based on the `closed` prop.
 * Includes an `aria-label` that describes the status.
 *
 * __Required__
 * @param closed - Whether the status is closed.
 * @param label - The label to display for the icon.
 */
export const StatusIcon = ({ closed, label }: StatusIconProps) => {
    return (
        <Circle
            aria-label={`${label}: ${closed ? 'Closed' : 'Open'}`}
            role="img"
            sx={{ color: closed ? 'error.main' : 'success.main' }}
        />
    )
}
