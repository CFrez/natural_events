import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface PaletteColor {
        lighter?: string
    }

    interface SimplePaletteColorOptions {
        lighter?: string
    }
}

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Oswald Variable';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 200 700;
                    src: url(@fontsource-variable/oswald/files/oswald-latin-wght-normal.woff2) format('woff2-variations');
                    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
                }
                @font-face {
                    font-family: 'Source Sans 3 Variable';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 200 900;
                    src: url(@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2) format('woff2-variations');
                    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
                }
            `,
        },
    },
    palette: {
        primary: {
            lighter: '#22418d1a',
            main: '#22418d',
        },
        secondary: {
            main: '#ef412a',
        },
    },
    typography: {
        fontFamily: 'Source Sans 3 Variable, sans-serif',
        h1: {
            fontFamily: 'Oswald Variable, sans-serif',
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
    },
})
