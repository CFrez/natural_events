import { DataArray, ErrorOutline } from '@mui/icons-material'
import { Box, CircularProgress, Typography } from '@mui/material'

/**
 * A component that displays an icon based on the `type` and a message.
 *
 * If an `icon` is provided then the `type` will be ignored. If neither are provided
 * then the icon will default to `error`.
 *
 * __Required__
 * @param message - The message to display under the icon.
 *
 * __Optional__
 * @param details - Details or actions to display below the message.
 * @param icon - The icon to display.
 * @param type - The type of icon to display.
 */
export const IconMessage = ({
    details,
    icon,
    message,
    type = 'error',
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
