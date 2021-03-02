## Embark Frontend

## To Run:

To install all the dependencies for the first time:
`npm install`

Then,
`npm start`

## Before Push:

Go to the top level of the repo, run
`make`
to format all your code

Hint: You could also set up git hooks to automate this process.

## Overview w/ comments
```javascript
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
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";

axios.defaults.baseURL = "http://localhost:9000/"; // set the default URL for our backend

const token = localStorage.getItem("AuthToken"); // Check localStorage to see if the user is logged in

if (token) { // If the user is logged in, dispatch authenticated and get user's data
  store.dispatch({ type: SET_AUTHENTICATED });
  // this step would include the token to axios's header, so every HTTP request you made has the token included
  axios.defaults.headers.common["Authorization"] = token; 
  store.dispatch(getStudentData());
}

function App() {
  return (
    <StylesProvider injectFirst> // add styled components to style MUI components
      <ThemeProvider theme={theme}> // apply default theme from theme.js
        <Provider store={store}> // add redux store
          <Router>
            <Switch> // current routes we have
              <Route exact path="/" component={OnBoarding}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/landing" component={Home}></Route>
              <Route exact path="/user/:userid" component={Profile}></Route>
              <Route exact path="/profile" component={Profile}></Route>
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
```
## Routes
- OnBoarding: student OnBoarding pages for now. We'll create a different set of OnBoarding pages for clubs in near feature
- Login: Login for both student and club. We'll enable club's login in near future
- Home: Home page with all features, which has 3 columns. The left column is to navigate through different pages and resources. Middle column is for the main features of the page, and right column is related to event scheduling with a calendar to help visualize.
- user/userid: a route for each user. This would include the flows for user views club, user views user, club views user, and club views club
- profile: profile page for student/club to view their own profile

## Redux
### Reducers:
- uireducer: handle action types for display, including loading, popup, and errors...
- datareducer: handle action types for any data flow in the app, including posts, events, and filters...
- userreducer: handle action types for any user-specific actions, including authentication of users, users' industries...

### Actiosn
- UserActions.js: action creators to handle user-related actions (corresponds to the previous reducers)
- DataActions.js: action creators to handle data-related actions
Note: ui doesn't have action for itself, all ui-related handling is included in these two action js files.

### Note for the future:
since we are having inconsistency in our frontend, backend, and design, we'll finalize the initial states for these reducers in the future

## Best Practices in this repo
In src:
- we use pages folder to organize all the pages. For each page, we create its own folder with its components storing in the same folder.
- If there are functional components being used across differnet pages, or the component is very important, we put the components into components folder
- For each smaller component, we could write the styles in the same file. However, we should put the styles for the entire page to the StylexxPage.js because usually the styles for a page is a lot
- shared: used for shared UI components and CSS resources, mediaQueries. You should put the components you used in more than one page to the shared folder
- utils: utility functions and components
- apicall.rest: pre-written apicall scripts. Add if you need to make api calls that are not in the file (You need to install REST CLIENT vscode extension, see below for the link)

## Useful resources

### 1. Formik: https://formik.org/
- Formik is a powerful tool to create React forms. It is a tool recommended by react documentaiton. Fields in react forms are so-called controlled components, and updating their internal states requires writting different handlers. We use Formik to save writting at least 100 lines of code per components with yup to simplify the validation logic
- More info about react form: https://reactjs.org/docs/forms.html

### 2. Styled Components: https://styled-components.com/
- Styled Components is a tool Javascript version of SASS. It has nice property of style inheritance, and make the CSS look clean and logical. Users could create their own components, and import and export them in complete blocks. Users could also pass prop to a component to let it do conditional rendering. It uses similar syntax to that of SASS, but more powerful in a sense that it also utilizes the nice features of javascript.

### 3. React Redux: https://react-redux.js.org/
- Redux is the most commonly used global state management tool for react. Since our application has lots of features, sometimes same chunks of information are shared across multiple components with no direct relationships. Redux helps make maintaining the shared states a lot easier
- We also used redux thunk for async actions. By using redux thunk, redux actions could be async. It also has two nice functions: dispatch, for you to dispatch more actions, and getState, get the global state for an action to use. 

### 4. Material UI: https://material-ui.com/
- Material UI (MUI) is a UI library which contains all commonly used app components. Since our design team is also using material design, it is a consistent pratice to use Material UI in the frontend. Other frontend frameworks could also be used together with MUI. For instance, we use styled components with MUI. By using `<StyleProvider injectFirst />`, we increase the specificity of styled components over the theme of MUI, which saves some time chaning MUI components' styles.

### 5. REST CLIENT: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- VScode's postman. Really easy to use, and you could save the scripts for the api backend calls.

### 6. Makefile & Prettier
- We use a prettier script to format the codebase before pushing. This script could be run at the root folder using commands `make` or `make format`.

## Future thoughts
- We'll probably change the folder structure a little bit since there definitely are redundancies and unclear purpose folders using this structures. But rn is still the early stage.
- We'll probably migirate to TypeScript after the first development stage. If we want more feature, javascipt itself is too limited and cause so many troubles for developing even a single feature
