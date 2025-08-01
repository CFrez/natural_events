import { Box, Link, Typography } from '@mui/material'

import { StatusIcon } from '@/components'
import { useEvents } from '@/hooks'

export const EventDetails = () => {
    const { selectedEvent } = useEvents()

    if (!selectedEvent) return null

    const { categories, closed, description, link, sources, title } = selectedEvent

    const generateDetailsSection = (title: string, content: React.ReactNode) => {
        if (!content) return null
        return (
            <Box
                component="section"
                sx={{ display: 'flex', flexDirection: 'column', fontSize: '1.25rem' }}
            >
                <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                    {title}:
                </Typography>
                <Typography>{content}</Typography>
            </Box>
        )
    }

    return (
        <>
            <Box
                component="header"
                sx={{
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    // HACK: This is so it doesn't overlap the close button
                    pr: 20,
                }}
            >
                <StatusIcon closed={closed} label="Event status" />
                <Typography
                    sx={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: 1.2 }}
                    variant="h6"
                >
                    {title}
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                {generateDetailsSection('Description', description)}
                {generateDetailsSection('Category', categories[0]?.title)}
                {generateDetailsSection(
                    'Sources',
                    sources.map((source) => source.id).join(', '),
                )}
                {generateDetailsSection(
                    'Link',
                    <Link href={link} rel="noopener noreferrer" target="_blank">
                        {link}
                    </Link>,
                )}
            </Box>
        </>
    )
}
