import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  NEW_POST,
  SET_POST,
  SUBMIT_COMMENT,
  FILTER_POSTS,
  ADD_FILTER,
  REMOVE_FILTER,
} from "../types";

import axios from "axios";

// Get All Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/posts");
    dispatch({ type: SET_POSTS, payload: res.data.paginatedPosts.results });
  } catch (err) {
    console.error(err);
  }
};

// Create A New Post
export const newPost = (newP) => async (dispatch) => {
  try {
    await axios.post("/posts", newP);
    dispatch({ type: SET_POST, payload: newP });
  } catch (err) {
    console.error(err);
  }
};

// Like a Post
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postId}/like`);
    dispatch({ type: LIKE_POST, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Unlike a Post
export const unlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postId}/unlike`);
    dispatch({ type: UNLIKE_POST, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Delete a Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (err) {
    console.error(err);
  }
};

// Get a Specific Post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postId}`);
    dispatch({ type: SET_POST, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Submit a comment
export const submitComment = (postId, commentData) => async (dispatch) => {
  try {
    const res = await axios.post(`/posts/${postId}/comment`, commentData);
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get User Specific page
export const getUserPage = (userHandle) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/${userHandle}`);
    dispatch({ type: SET_POSTS, payload: res.data.posts });
  } catch (err) {
    dispatch({ type: SET_POSTS, payload: null });
  }
};

//Sort(filter) posts by relevance to filters
export const filterPosts = (filters) => (dispatch) => {
  dispatch({
    type: FILTER_POSTS,
    payload: filters,
  })
}

// Add a filter on the landing page
export const addFilter = (filterToAdd) => (dispatch) => {
  dispatch({
    type: ADD_FILTER,
    payload: filterToAdd
  });
};

// Remove a filter on the landing page
export const removeFilter = () => (dispatch) => {
  dispatch({
    type: REMOVE_FILTER,
  });
};