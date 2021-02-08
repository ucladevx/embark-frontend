import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_POST,
  UNLIKE_POST,
  MARK_NOTIFICATIONS_READ,
  ADD_FILTER,
  REMOVE_FILTER
} from "../types";

const intialState = {
  authenticated: false,
  info: {},
  notifications: [],
  likedPosts: [],
  clubs: [],
  industry: "",
  filters: []
};

export default function userReducer(state = intialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return intialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    case LIKE_POST:
      return {
        ...state,
        likedPosts: [
          ...state.likedPosts,
          {
            likeBy: state.info.name,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likedPosts: state.likedPosts.filter(
          (post) => post.postId !== action.payload.postId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((noti) => (noti.read = true));
      return {
        ...state,
      };
    case ADD_FILTER:
      console.log("add");
      return {
        ...state,
        filters: [
          ...state.filters,
          action.payload
        ],
      };
    case REMOVE_FILTER:
      console.log("remove");
      return {
        ...state,
        filters: state.filters.filter(
          (eachfilter) => eachfilter !== action.payload
        ),
      };
    default:
      return state;
  }
}
