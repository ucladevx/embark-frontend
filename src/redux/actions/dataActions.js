import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  NEW_POST,
  SET_POST,
  SUBMIT_COMMENT,
  SET_NEXT_STRING,
  SET_HAS_NEXT,
} from '../types';

import axios from 'axios';

// Get All Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/post/postsPage', {
      params: {
        limitNum: 8,
      },
    });
    console.log(res.data);
    dispatch({ type: SET_POSTS, payload: res.data.posts });
    dispatch({ type: SET_NEXT_STRING, payload: res.data.paginatedPosts.next });
  } catch (err) {
    console.error(err);
  }
};

export const getNextPosts = () => async (dispatch, getState) => {
  try {
    const { nextString } = getState().data;
    const res = await axios.get('/posts', {
      params: {
        limit: 8,
        nextPage: nextString,
      },
    });
    const { posts } = getState().data;
    const { results, next, hasNext } = res.data.paginatedPosts;
    const newPosts = [...posts, ...results];
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
    const res = await axios.post('/posts', newP);
    dispatch({ type: NEW_POST, payload: res.data });
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
