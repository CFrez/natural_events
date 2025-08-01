import { Circle } from '@mui/icons-material'

export const StatusIcon = ({ closed, label }: { closed: boolean; label: string }) => {
    return (
        <Circle
            aria-label={`${label}: ${closed ? 'Closed' : 'Open'}`}
            role="img"
            sx={{ color: closed ? 'error.main' : 'success.main' }}
        />
    )
}
