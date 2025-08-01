import { Box, Link, Typography } from '@mui/material'

import { StatusIcon } from '@/components'
import { useEvents } from '@/hooks'
import { splitEventTitle } from '@/lib'

export const EventDetails = () => {
    const { selectedEvent } = useEvents()

    if (!selectedEvent) return null

    const {
        categories,
        closed,
        description,
        link,
        sources,
        title: eventTitle,
    } = selectedEvent

    const { location, title } = splitEventTitle(eventTitle)
    const closedDate = closed ? new Date(closed).toLocaleDateString() : null

    const generateDetailsSection = (title: string, content: React.ReactNode) => {
        return (
            <Box
                component="section"
                sx={{ display: 'flex', flexDirection: 'column', fontSize: '1.25rem' }}
            >
                <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                    {title}:
                </Typography>
                <Typography>{content || 'None'}</Typography>
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
                <StatusIcon closed={!!closed} label="Event status" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        sx={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: 1.2 }}
                        variant="h6"
                    >
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem' }}>{location}</Typography>
                </Box>
            </Box>
            {/* HACK: Not best experience to have horizontal scroll in the modal.... */}
            <Box sx={{ overflowX: 'auto', p: 2 }}>
                {closedDate && generateDetailsSection('Closed', closedDate)}
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
