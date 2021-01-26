import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from '../shared/config.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.pink,
      contrastText: "#fff",
    },
    secondary: {
      main: colors.lightblue,
    },
    background: {
      default: colors.lightblue
    }
  },
  typography: {
    fontFamily: "Open Sans, helvetica, arial, verdana, sans-serif",
    fontSize: "12",
    button: {
      textTransform: "none",
    },
  },
});


export default theme;
