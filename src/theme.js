import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F06F38',
    },
    secondary: {
      main: '#2B2B2B',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#0000',
    },
  },
});

export default theme;
