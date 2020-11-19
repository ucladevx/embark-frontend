import "./App.css";
// Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

// Utilities
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Pages
import OnBoarding from "./pages/OnBoarding";
import Landing from "./pages/Landing";
import User from "./pages/User";

// axios.defaults.baseURL =

const token = localStorage.getItem("AuthToken");

// Check log in at first
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUserData());
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={OnBoarding}></Route>
          <Route exact path="/landing" component={Landing}></Route>
          <Route exact path="/user/:id" component={User}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
