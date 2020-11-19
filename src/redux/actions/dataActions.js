import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  NEW_POST,
  LOADING_UI,
  SET_POST,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get All Posts
export const getPosts = () => (dispatch) => {
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Create A New Post
export const newPost = (newP) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/posts", newP)
    .then((res) => {
      dispatch({
        type: NEW_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Like a Post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/posts/${postId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch((err) => console.error(err));
};

// Unlike a Post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/posts/${postId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch((err) => console.error(err));
};

// Delete a Post
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/posts/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.error(err));
};

// Get a Specific Post
export const getPost = (postId) => (dispatch) => {
  axios
    .get(`/posts/${postId}`)
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
    })
    .catch((err) => console.error(err));
};

// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/posts/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Get User Specific page
export const getUserPage = (userHandle) => (dispatch) => {
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data.posts });
    })
    .catch(() => {
      dispatch({ type: SET_POSTS, payload: null });
    });
};
