import "./App.css";
// Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { getStudentData } from "./redux/actions/userActions";

// Utils
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

// Pages
import Login from "./pages/Login/Login.js";
import OnBoarding from "./pages/OnBoarding";
import ClubOnBoarding from "./pages/ClubOnBoarding/FormUserDetails";
import ClubDetails from "./pages/ClubOnBoarding/FormPersonalDetails";
import studentDetails from "./pages/OnBoarding/FormPersonalDetails";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import StudentProfile from "./pages/Profile/StudentProfile";
import ClubProfile from "./pages/Profile/ClubProfile";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";

import ViewClubProfile from "./pages/Profile/viewClubProfile";
import ViewStudentProfile from "./pages/Profile/viewStudentProfile";
import Moderation from "./pages/Moderation";

axios.defaults.baseURL = "https://embark-backend-dev.herokuapp.com/";

const token = localStorage.getItem("AuthToken");

// Check log in at first
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getStudentData());
}

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/linkedin" component={LinkedInPopUp}></Route>
              <Route exact path="/" component={OnBoarding}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route
                exact
                path="/clubsignup"
                component={ClubOnBoarding}
              ></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/" component={OnBoarding}></Route>
              <Route exact path="/clubDetails" component={ClubDetails}></Route>
              <Route
                exact
                path="/studentDetails"
                component={studentDetails}
              ></Route>

              <Route
                exact
                path="/user/:userid"
                component={StudentProfile}
              ></Route>
              <Route exact path="/club/:clubid" component={ClubProfile}></Route>

              {/* EXAMPLE: http://localhost:3000/view-club/?clubId=CLUBID */}
              <Route path="/view-club" component={ViewClubProfile}></Route>
              {/* EXAMPLE: http://localhost:3000/view-student/?studentId=STUDENTID */}
              <Route
                exact
                path="/view-club/:clubId"
                component={ViewClubProfile}
              ></Route>
              <Route
                path="/view-student"
                component={ViewStudentProfile}
              ></Route>
              <Route path="/moderation" exact component={Moderation}></Route>
              <Route path="/" component={ErrorPage}></Route>
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
