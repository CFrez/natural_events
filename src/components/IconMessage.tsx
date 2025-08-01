import { DataArray, ErrorOutline } from '@mui/icons-material'
import { Box, CircularProgress, Typography } from '@mui/material'

export const IconMessage = ({
    details,
    icon,
    message,
    type,
}: {
    details?: React.ReactNode
    icon?: React.ReactNode
    message: string
    type?: 'empty' | 'error' | 'loading'
}) => {
    const iconMap = {
        empty: <DataArray fontSize="large" />,
        error: <ErrorOutline color="error" fontSize="large" />,
        loading: <CircularProgress size={48} />,
    }

    return (
        <Box
            sx={{
                '& > svg': {
                    fontSize: '4rem',
                },
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            {icon && icon}
            {!icon && type && iconMap[type]}
            <Typography sx={{ textAlign: 'center' }} variant="h4">
                {message}
            </Typography>
            {typeof details === 'string' ? (
                <Typography sx={{ textAlign: 'center' }} variant="body1">
                    {details}
                </Typography>
            ) : (
                details
            )}
        </Box>
    )
}
