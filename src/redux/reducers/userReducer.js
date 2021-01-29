import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_POST,
  UNLIKE_POST,
  MARK_NOTIFICATIONS_READ,
} from "../types";

const intialState = {
  authenticated: false,
  info: {},
  notifications: [],
  likedPosts: [],
  clubs: [],
  industry: "",
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
    default:
      return state;
  }
}
