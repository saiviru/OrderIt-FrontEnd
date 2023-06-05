import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa726', // Customize primary color
    },
    secondary: {
      main: '#ff9800', // Customize secondary color
    },
  },
  spacing: 8,
//   spacing: 12,
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Customize font family
  },
});

export default theme;