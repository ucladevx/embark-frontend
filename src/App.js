import "./App.css";
// Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

// Utils
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

// Pages
import OnBoarding from "./pages/OnBoarding";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";

axios.defaults.baseURL = "http://localhost:9000/";

const token = localStorage.getItem("AuthToken");

// Check log in at first
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUserData());
}

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={OnBoarding}></Route>
              <Route exact path="/landing" component={Landing}></Route>
              <Route exact path="/user/:userid" component={Profile}></Route>
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
