import { Box, Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Box component="section">
                <Typography variant="h1">Hello World</Typography>
            </Box>
        </QueryClientProvider>
    )
}

export default App
