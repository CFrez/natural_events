import { Container, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Events } from '../features/events/Events'

import { theme } from './theme'

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Container
                    component="header"
                    maxWidth={false}
                    sx={{
                        backgroundColor: 'primary.main',
                        margin: 0,
                        padding: '1rem',
                    }}
                >
                    <Typography
                        color="primary.contrastText"
                        sx={{ textAlign: 'center' }}
                        variant="h1"
                    >
                        Natural Events from EONET
                    </Typography>
                </Container>
                <Container component="main">
                    <Events />
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
