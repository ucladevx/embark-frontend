import {
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";

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
    history.push("/landing");
  } catch (err) {
    console.error(err);
  }
};

// Get all users data
export const getStudentData = () => async (dispatch) => {
  try {
    const res = await axios.get("/student/profile");
    dispatch({
      type: SET_USER,
      payload: res.data.student,
    });
  } catch (err) {
    console.error(err);
  }
};

// Sign Up a user
export const signupStudent = (newUserData) => async (dispatch) => {
  try {
    console.log(newUserData);
    const res = await axios.post("/auth/signup", newUserData);
    setAuthorizationHeader(res.data.token);
    dispatch(getStudentData());
  } catch (err) {
    console.error(err);
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
