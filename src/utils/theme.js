import { createMuiTheme } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors";

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
    fontFamily: "Open Sans, helvetica, arial, verdana, sans-serif",
    fontSize: "12",
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
