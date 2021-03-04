import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  NEW_POST,
  SET_POST,
  CLOSE_COMMENT,
  FILTER_POSTS,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_NEXT_STRING,
  SET_HAS_NEXT,
} from "../types";

import axios from "axios";

// Get All Posts
export const getPosts = () => async (dispatch) => {
  try {
    const nextString = localStorage.getItem("nextString");
    let params;
    if (nextString !== "undefined") {
      params = {
        limit: 6,
        nextPage: nextString,
      };
    } else {
      params = {
        limit: 6,
      };
    }
    const res = await axios.get("/posts", {
      params,
    });

    localStorage.setItem("nextString", res.data.paginatedPosts.next.toString());
    dispatch({ type: SET_POSTS, payload: res.data.paginatedPosts.results });
    dispatch({ type: SET_NEXT_STRING, payload: res.data.paginatedPosts.next });
  } catch (err) {
    console.error(err);
  }
};

export const getNextPosts = () => async (dispatch, getState) => {
  try {
    const { nextString } = getState().data;
    const res = await axios.get("/posts", {
      params: {
        limit: 2,
        nextPage: nextString,
      },
    });
    const { posts } = getState().data;
    const { results, next, hasNext } = res.data.paginatedPosts;
    const newPosts = [...posts, ...results];
    console.log(next === localStorage.getItem("nextString"));
    localStorage.setItem("nextString", next.toString());
    dispatch({ type: SET_POSTS, payload: newPosts });
    dispatch({ type: SET_NEXT_STRING, payload: next });
    dispatch({ type: SET_HAS_NEXT, payload: hasNext });
  } catch (err) {
    console.error(err);
  }
};

// Create A New Post
export const newPost = (newP) => async (dispatch) => {
  try {
    const res = await axios.post("/posts", newP);
    dispatch({ type: NEW_POST, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Like a Post
export const likePost = (post_id) => async (dispatch, getState) => {
  try {
    const { email } = getState().user;
    const body = {
      post_id,
      authorEmail: email,
    };
    const res = await axios.get(`/posts/likes`, body);
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
export const getPost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get("/posts");
    dispatch({ type: SET_POST, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Submit a comment
export const submitComment = (post_id, commentData) => async (
  dispatch,
  getState
) => {
  try {
    const { email } = getState().user;
    if (commentData.trim().length === 0) throw Error("comment cannot be empty");
    const res = await axios.post(`/posts/comments`, {
      post_id,
      authorEmail: email,
      comment: commentData,
    });
    const newPosts = getState().data.posts.map((p, i) => {
      if (p._id === post_id) {
        p.comments = res.data.comments;
      }
      return p;
    });

    dispatch({
      type: SET_POSTS,
      payload: newPosts,
    });
    dispatch({
      type: CLOSE_COMMENT,
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
  });
};

// Add a filter on the landing page
export const addFilter = (filterToAdd) => (dispatch) => {
  dispatch({
    type: ADD_FILTER,
    payload: filterToAdd,
  });
};

// Remove a filter on the landing page
export const removeFilter = () => (dispatch) => {
  dispatch({
    type: REMOVE_FILTER,
  });
};
