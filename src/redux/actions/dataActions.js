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
  NEW_EVENT,
  SET_EVENTS,
  SAVE_POST,
} from "../types";

import axios from "axios";

const maintenanceErrorCheck = (err) => {
  if (err.message.includes(" 503")) {
    console.log("here");
    alert("ERROR 503: " + "Embark is on maintenance, please check later");
  }
};

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
    if (res.data.paginatedPosts.next)
      localStorage.setItem(
        "nextString",
        res.data.paginatedPosts.next.toString()
      );
    dispatch({ type: SET_POSTS, payload: res.data.paginatedPosts.results });
    dispatch({ type: SET_NEXT_STRING, payload: res.data.paginatedPosts.next });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
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
    console.log(res.data);
    const { results, next, hasNext } = res.data.paginatedPosts;
    const newPosts = [...posts, ...results];
    if (!!next) localStorage.setItem("nextString", next.toString());
    dispatch({ type: SET_POSTS, payload: newPosts });
    dispatch({ type: SET_NEXT_STRING, payload: next });
    dispatch({ type: SET_HAS_NEXT, payload: hasNext });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Create A New Post
export const newPost = (newP) => async (dispatch) => {
  try {
    const res = await axios.post("/posts", newP);
    dispatch({ type: NEW_POST, payload: res.data.post });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};
// Save a Post
export const savePost = (post_id) => async (dispatch, getState) => {
  try {
    const { userType } = getState().user;
    // TODO: Include accountType to default header once club flow is set up
    const res = await axios.post("/posts/saved", { accountType: userType });
    // TODO: check the documentation of save endpoint
    console.log(res.data);
    dispatch({ type: SAVE_POST, payload: res.data });
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
    const res = await axios.post(`/posts/likes`, body);
    dispatch({ type: LIKE_POST, payload: res.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Unlike a Post
export const unlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/`);
    dispatch({ type: UNLIKE_POST, payload: res.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Delete a Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Get a Specific Post
export const getPost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get("/posts");
    dispatch({ type: SET_POST, payload: res.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Submit a comment
export const submitComment = (post_id, commentData) => async (
  dispatch,
  getState
) => {
  try {
    const { email } = getState().user;
    // TODO: Add error display for comment
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
    maintenanceErrorCheck(err);
  }
};

// Get User Specific page
export const getUserPage = (userHandle) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/${userHandle}`);
    dispatch({ type: SET_POSTS, payload: res.data.posts });
  } catch (err) {
    dispatch({ type: SET_POSTS, payload: null });
    maintenanceErrorCheck(err);
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

// Create A New Event
export const newEvent = (newE) => async (dispatch) => {
  try {
    // TODO: Fix the endpoint later
    const res = await axios.post("/events", newE);
    dispatch({ type: NEW_EVENT, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Get All Events - unsure how the backend will handle event storage(is it paginated?)
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("/events", {
      params: {
        limitNum: 8,
      },
    });
    console.log(res.data);
    dispatch({ type: SET_EVENTS, payload: res.data.events });
  } catch (err) {
    console.error(err);
  }
};
