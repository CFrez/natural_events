import { type MouseEvent, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Button, Chip, Menu, MenuItem } from '@mui/material'

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
            <div>
                <Button
                    aria-controls={open ? 'add-source-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    endIcon={<ArrowDropDownIcon fontSize="large" />}
                    fullWidth
                    id="add-source-button"
                    onClick={handleClick}
                    // make it look like the simplified select
                    sx={{
                        // border thicken on hover
                        '&:hover': {
                            backgroundColor: 'transparent',
                            borderBottom: '2px solid',
                            borderColor: 'text.primary',
                            padding: '0 0 0 0',
                        },
                        border: 'none',
                        borderBottom: '1px solid',
                        borderRadius: 0,
                        boxShadow: 'none',
                        color: 'text.secondary',
                        fontSize: '1rem',
                        fontWeight: 'medium',
                        justifyContent: 'space-between',
                        mb: sources.length > 0 ? 2 : 0,
                        padding: '0 0 1px 0',
                        textTransform: 'capitalize',
                    }}
                    variant="outlined"
                >
                    Add Source
                </Button>
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
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {sources.map((source) => (
                    <Chip
                        color="primary"
                        key={source}
                        label={source}
                        onDelete={() => handleDelete(source)}
                        size="small"
                    />
                ))}
            </Box>
        </>
    )
}
