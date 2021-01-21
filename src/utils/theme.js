import { createMuiTheme } from "@material-ui/core/styles";
import {colors} from '../shared/config.js';

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
    fontFamily: "helvetica, arial, verdana, sans-serif",
  },
});


export default theme;
