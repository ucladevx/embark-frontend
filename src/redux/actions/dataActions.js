import {
  SET_POSTS,
  LIKE_POST,
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
  SET_CLUB_RESOURCES,
  SET_CLUB_LINKS,
  UPLOAD_CLUB_RESOURCES,
  UPLOAD_CLUB_LINKS,
  SAVE_POST,
  GET_CLUB,
} from "../types";

import axios from "axios";

const maintenanceErrorCheck = (err) => {
  if (err.message.includes(" 503")) {
    console.log("here");
    alert("ERROR 503: Embark is on maintenance, please check later");
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
    dispatch({
      type: SET_POSTS,
      payload: res.data.paginatedPosts.result.results,
    });
    dispatch({
      type: SET_NEXT_STRING,
      payload: res.data.paginatedPosts.result.next,
    });
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
        limit: 6,
        nextPage: nextString,
      },
    });
    const { posts } = getState().data;
    const { results, next, hasNext } = res.data.paginatedPosts.result;
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
    alert("Post successfully created");
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
    alert("Post failed to be created");
  }
};

// Save a Post
export const savePost = (post_id) => async (dispatch, getState) => {
  try {
    const { userType } = getState().user;
    // TODO: Include accountType to default header once club flow is set up
    const res = await axios.post("/posts/saved", {
      accountType: userType,
      post_id: post_id,
    });
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
    const res_post = await axios.post(`/posts/likes`, body);
    console.log(res_post.data);
    const res_student = await axios.post("student/likePost", { post_id });
    console.log(res_student.data);
    dispatch({ type: LIKE_POST, payload: res_post.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Unlike a Post
/**
export const unlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/`);
    dispatch({ type: UNLIKE_POST, payload: res.data });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
}; */

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
export const submitComment =
  (post_id, commentData) => async (dispatch, getState) => {
    try {
      const { _id: authorID, firstName, lastName } = getState().user;
      // TODO: Add error display for comment
      if (commentData.trim().length === 0)
        throw Error("comment cannot be empty");

      const res = await axios.post(`/posts/comments`, {
        post_id,
        authorID,
        commentBody: commentData,
        authorName: `${firstName} ${lastName}`,
      });
      const newPosts = getState().data.posts.map((p) => {
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
    const res = await axios.post("/events/create", newE);
    dispatch({ type: NEW_EVENT, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Get All Events - unsure how the backend will handle event storage(is it paginated?)
export const getEvents = (amount) => async (dispatch) => {
  try {
    const res = await axios.get("/events/discover", {
      params: {
        limitNum: amount,
        userType: "student",
      },
    });
    console.log(res.data);
    dispatch({ type: SET_EVENTS, payload: res.data.events });
  } catch (err) {
    console.error(err);
  }
};

// Get club resources
export const getResources = () => async (dispatch) => {
  try {
    const res = await axios.get("/club/resources");
    console.log(res);
    dispatch({ type: SET_CLUB_RESOURCES, payload: res.data.resources });
    dispatch({ type: SET_CLUB_LINKS, payload: res.data.embededlinks });
  } catch (error) {
    console.log(error);
  }
};

// Club upload one resource
export const uploadResource =
  (newResource, resourceName) => async (dispatch) => {
    try {
      console.log(resourceName);
      const formData = new FormData();
      formData.append("file", newResource);
      const res = await axios.post(
        `/club/resources?linkFile=file&userNamed=${resourceName}`,
        formData
      );
      console.log(res);
      dispatch({ type: UPLOAD_CLUB_RESOURCES, payload: res.data.fileUrls[0] });
    } catch (err) {
      console.log(err);
    }
  };

export const uploadLink = (newLink, linkName) => async (dispatch) => {
  try {
    console.log(linkName);
    console.log(newLink);
    const res = await axios.post(
      `/club/resources?linkFile=link&userNamed=${linkName}`,
      {
        link: newLink,
      }
    );
    console.log(res);
    dispatch({ type: UPLOAD_CLUB_LINKS, payload: res.data.fileUrls });
  } catch (err) {
    console.log(err);
  }
};

//Grab a club's data as a non-club
export const getExpandedClub = (clubId) => async (dispatch) => {
  try {
    const res = await axios.get(`/club/profilebyId?clubId=${clubId}`);
    dispatch({ type: GET_CLUB, payload: res });
    return res;
  } catch (err) {
    console.error(err);
  }
};
