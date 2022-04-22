import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
            dark: "#000000",
            light: "#EAF6FF"
        },
        secondary: {
            main: '#50B2C0',
        },
        error: {
            main: "#EE4266",
        },
        warning: {
            main: "#FFD23F"
        },
        success: {
            main: "#4bb543"
        }
    },
});

export default theme;
