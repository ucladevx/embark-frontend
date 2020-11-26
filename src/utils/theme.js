import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "blue",
      contrastText: "#fff",
    },
    secondary: {
      main: "pink",
    },
  },
  typography: {
    fontFamily: "helvetica, arial, verdana, sans-serif",
  },
});

export default theme;
