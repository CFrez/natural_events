import { type MouseEvent, useState } from 'react'

import { AddCircleOutline } from '@mui/icons-material'
import {
    Box,
    Chip,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'

import { useEvents } from '@/hooks'

export const SourceFilter = () => {
    const {
        filters: { sources },
        handleFilterChange,
        sourceOptions,
    } = useEvents().filter

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = (value: string) => {
        handleFilterChange(
            'sources',
            sources.filter((source) => source !== value),
        )
    }

    const handleAdd = (value: string) => {
        handleFilterChange('sources', [...sources, value])
        handleClose()
    }

    const unselectedOptions = sourceOptions?.filter(
        (option) => !sources.includes(option.value),
    )

    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-between',
                }}
            >
                <InputLabel id="source-select-label">Sources</InputLabel>
                <IconButton
                    aria-controls={open ? 'add-source-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    id="add-source-button"
                    onClick={handleClick}
                >
                    <AddCircleOutline />
                </IconButton>
                {/* TODO: Should this also have a source specific reset button? */}
                <Menu
                    anchorEl={anchorEl}
                    id="add-source-menu"
                    onClose={handleClose}
                    open={open}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'add-source-button',
                        },
                    }}
                >
                    {unselectedOptions?.map((option) => (
                        <MenuItem
                            key={option.value}
                            onClick={() => handleAdd(option.value)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {sources.length > 0 ? (
                    sources.map((source) => (
                        <Chip
                            color="primary"
                            key={source}
                            label={source}
                            onDelete={() => handleDelete(source)}
                            size="small"
                        />
                    ))
                ) : (
                    <Typography variant="body1">All Sources</Typography>
                )}
            </Box>
        </>
    )
}
