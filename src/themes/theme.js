import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#0D47A1',
      },
      secondary: {
        main: '#d00000',
      },
      accent1: {
        main: '#00ACC1',
      },
      accent2: {
        main: '#8E24AA',
      },
      background: {
        default: '#FFFFFF',
        paper: '#FAFAFA',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
      },
    },
  });

export default theme;
