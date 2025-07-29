import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Events } from './features/events/Events'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Events />
        </QueryClientProvider>
    )
}

export default App
