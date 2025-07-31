import { Box, Typography } from '@mui/material'

export const IconMessage = ({
    details,
    icon,
    message,
}: {
    details?: React.ReactNode
    icon: React.ReactNode
    message: string
}) => {
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
            {icon}
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
