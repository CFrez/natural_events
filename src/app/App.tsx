import { useState } from 'react'

import TuneIcon from '@mui/icons-material/Tune'
import {
    AppBar,
    Box,
    CssBaseline,
    IconButton,
    ThemeProvider,
    Typography,
} from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Events } from '../features/events/Events'

import { theme } from './theme'

const queryClient = new QueryClient()

export function App() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev)
    }

    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: '1rem 1.5rem',
                        }}
                    >
                        <Typography variant="h1">Natural Events from EONET</Typography>
                        <IconButton color="inherit" onClick={toggleDrawer}>
                            <TuneIcon />
                        </IconButton>
                    </Box>
                </AppBar>
                <Events isDrawerOpen={isDrawerOpen} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
