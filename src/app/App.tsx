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
                <Container component="main" maxWidth="xl">
                    <Container component="header" maxWidth="xl">
                        <Typography
                            color="primary"
                            sx={{ textAlign: 'center' }}
                            variant="h1"
                        >
                            Natural Events
                        </Typography>
                    </Container>
                    <Events />
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
