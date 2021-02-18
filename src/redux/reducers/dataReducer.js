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

const initialState = {
  posts: [],
  post: {},
  filter: [],
  nextString: '',
  hasNext: true,
};

export default function dataReducer(state = initialState, action) {
  let index;
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case SET_NEXT_STRING: {
      return {
        ...state,
        nextString: action.payload,
      };
    }
    case SET_HAS_NEXT: {
      return {
        ...state,
        hasNext: action.payload,
      };
    }
    case LIKE_POST:
    case UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId,
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

    default:
      return state;
  }
}
