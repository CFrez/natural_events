import { TextField } from '@mui/material'

import { useEvents } from '@/hooks'

export const TitleSearch = () => {
    const { handleTitleChange, titleSearch } = useEvents().filter

    return (
        <TextField
            aria-label="Search current results by title"
            id="title-search"
            onChange={handleTitleChange}
            placeholder="Search results"
            sx={{
                '& .MuiFilledInput-root': {
                    borderRadius: 0,
                },
                width: '100%',
            }}
            value={titleSearch}
            variant="standard"
        />
    )
}
