import { Button } from '@mui/material'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'

const queryClient = new QueryClient()

function App() {
    const [count, setCount] = useState(0)

    return (
        <QueryClientProvider client={queryClient}>
            <Button
                color="primary"
                onClick={() => setCount((count) => count + 1)}
                variant="contained"
            >
                count is {count}
            </Button>
        </QueryClientProvider>
    )
}

export default App
