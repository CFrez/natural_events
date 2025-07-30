import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');
            `,
        },
    },
    palette: {
        primary: {
            main: '#22418d',
        },
        secondary: {
            main: '#ef412a',
        },
    },
    typography: {
        fontFamily: 'Rubik, sans-serif',
    },
})
