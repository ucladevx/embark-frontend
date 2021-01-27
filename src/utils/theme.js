import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "../shared/config.js";

const theme = createMuiTheme({
  palette: {},
  typography: {
    fontFamily: "Open Sans, helvetica, arial, verdana, sans-serif",
    fontSize: "12",
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
