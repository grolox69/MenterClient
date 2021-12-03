import { createTheme, responsiveFontSizes  } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#FBFCF5"
    },
    primary: {
      main: '#65afef',
      light: '#9be1ff',
      dark: '#2780bc',
      contrastText: '#FBFCF5'
    },
    secondary: {
      main: '#fe5244',
      
    },
    error: {
      main: '#fe5244',
      light: '#ff8670',
      dark: '#c4101b'
    },
    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23'
    },
  },
  typography: {
    fontFamily: `"Roboto"`,
  },
});

export default theme;