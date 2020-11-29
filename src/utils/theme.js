import { createMuiTheme } from "@material-ui/core/styles";
import {blue, pink} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: "#fff",
    },
    secondary: {
      main: pink[500],
    },
  },
  typography: {
    fontFamily: "helvetica, arial, verdana, sans-serif",
  },
});

export default theme;
