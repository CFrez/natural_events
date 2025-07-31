import { ErrorOutline } from '@mui/icons-material'

import { IconMessage } from '@/components'
import { useEvents } from '@/hooks'

export const ErrorMessage = () => {
    const { error } = useEvents()

    return (
        <IconMessage
            details={error?.message}
            icon={<ErrorOutline />}
            message="An error occurred"
        />
    )
}
