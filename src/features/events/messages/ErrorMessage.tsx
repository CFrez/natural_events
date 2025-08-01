import { IconMessage } from '@/components'
import { useEvents } from '@/hooks'

export const ErrorMessage = () => {
    const { error } = useEvents()

    return (
        <IconMessage
            details={error?.message}
            message="An Error Occurred"
            type="error"
        />
    )
}
