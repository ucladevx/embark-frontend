import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  NEW_POST,
  SET_POST,
  ADD_FILTER,
  REMOVE_FILTER,
  FILTER_POSTS,
  SET_HAS_NEXT,
  SET_NEXT_STRING,
  NEW_EVENT,
  SET_EVENTS,
} from "../types";

const initialState = {
  posts: [],
  filter: [],
  nextString: "",
  hasNext: true,
  events: [],
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
        (post) => post.post_id === action.payload.post.post_id
      );
      const newPosts = [...state.posts];
      newPosts[index] = action.payload.post;
      return {
        ...state,
        posts: newPosts,
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
    case ADD_FILTER:
      return {
        ...state,
        filter: [...state.filter, action.payload],
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filter: state.filter.filter(
          (eachfilter) => eachfilter !== action.payload
        ),
      };
    case FILTER_POSTS: {
      var postsCopy = state.posts;
      postsCopy = postsCopy.sort(function (post1, post2) {
        for (var i = 0; i < state.filter.length; i++) {
          if (post1.tags.includes(state.filter[i])) {
            if (!post2.tags.includes(state.filter[i])) {
              return -1;
            }
          } else if (post2.tags.includes(state.filter[i])) {
            return 1;
          }
        }
        return 0;
      });
      return {
        ...state,
        posts: postsCopy,
      };
    }
    case NEW_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}
