import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  NEW_POST,
  SET_POST,
  SUBMIT_COMMENT,
  NEXT_REGISTER_STEP,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  filter: [],
  register: {
    register_step: 0,
    register_user: { first_name: "", last_name: "", email: "", password: "" },
  },
};

export default function dataReducer(state = initialState, action) {
  let index;
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_POST:
      index = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state,
      };
    case NEW_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    case NEXT_REGISTER_STEP: {
      const nextStep = state["register"].register_step + 1;
      const newRegister = {
        register_step: nextStep,
        register_user: action.payload,
      };
      return {
        ...state,
        register: newRegister,
      };
    }
    default:
      return state;
  }
}
