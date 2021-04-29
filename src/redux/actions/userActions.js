import {
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  AUTH_SIGNUP,
  AUTH_SIGNIN,
  GOING_EVENT,
  SET_ERRORS,
} from "../types";
import axios from "axios";

const maintenanceErrorCheck = (err) => {
  if (err.message.includes(" 503")) {
    console.log("here");
    alert("ERROR 503: " + "Embark is on maintenance, please check later");
  }
};

const setAuthorizationHeader = (token) => {
  const AuthToken = `Bearer ${token}`;
  localStorage.setItem("AuthToken", AuthToken);
  axios.defaults.headers.common["Authorization"] = AuthToken;
};

// Login A User
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/signin", userData);
    setAuthorizationHeader(res.data.token);
    dispatch(getStudentData());
    history.push("/home");
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    maintenanceErrorCheck(err);
  }
};

// Get all users data
export const getStudentData = () => async (dispatch) => {
  try {
    const res = await axios.get("/student/profile");
    const payload = { ...res.data.student, userType: "student" };
    dispatch({
      type: SET_USER,
      payload,
    });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Sign Up a user
export const signupStudent = (newUserData, handleUser, handleStep) => async (
  dispatch,
) => {
  try {
    const res = await axios.post("/auth/signup", newUserData);
    setAuthorizationHeader(res.data.token);
    dispatch(getStudentData());
    handleUser(newUserData);
    handleStep(1);
  } catch (err) {
    console.log(err);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    maintenanceErrorCheck(err);
  }
};

// Log out a user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// Upload the Avatar
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then((res) => {
      dispatch(getStudentData());
    })
    .catch((err) => console.error(err));
};

// Edit a specific user's setting
export const editStudentDetails = (userDetails) => async (dispatch) => {
  try {
    const res = await axios.post("/student/profile", userDetails);
    dispatch({ type: "SET_USER", payload: res.data.updatedStudent });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Mark notification read on user's end
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => console.error(err));
};

export const studentGoogleSignUp = () => async (dispatch) => {
  try {
    const res = await axios.post(
      "/auth/google",
      {
        type: "signup",
        user: "student",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    dispatch({ type: AUTH_SIGNUP, payload: res.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

export const studentGoogleSignIn = () => async (dispatch) => {
  try {
    const res = await axios.post("/auth/google", {
      type: "signin",
      user: "student",
    });
    dispatch({ type: AUTH_SIGNIN, payload: res.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

//Mark going to an event
export const goingToEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.post(`/student/events`, eventId);
    dispatch({ type: GOING_EVENT, payload: eventId });
  } catch (err) {
    console.error(err);
  }
};
