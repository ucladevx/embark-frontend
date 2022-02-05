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
  SET_CLUB_RESOURCES,
  SET_CLUB_LINKS,
  UPLOAD_CLUB_RESOURCES,
  UPLOAD_CLUB_LINKS,
  GET_CLUB,
} from "../types";

const initialState = {
  posts: [],
  filter: [],
  nextString: "",
  hasNext: true,
  events: [],
  resources: [],
  links: [],
  club: {},
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
        (post) => post._id === action.payload.post._id
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
      if (action.payload === "resource") {
        return {
          ...state,
          filter: [action.payload, ...state.filter],
        };
      } else {
        return {
          ...state,
          filter: [...state.filter, action.payload],
        };
      }
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
          if (!post1 || !post1.tags) return 1; // post 2 comes before post 1
          if (!post2 || !post2.tags) return -1; // post 1 comes before post 2
          // create copy of post1 tags that are all lowercase
          let post1Tags = post1.tags.slice();
          for (let i = 0; i < post1Tags.length; i++)
            post1Tags[i] = post1Tags[i].toLowerCase();
          // create copy of post2 tags that are all lowercase
          let post2Tags = post2.tags.slice();
          for (let i = 0; i < post2Tags.length; i++)
            post2Tags[i] = post2Tags[i].toLowerCase();
          if (post1Tags.includes(state.filter[i].toLowerCase())) {
            // if first post contains tag
            if (!post2Tags.includes(state.filter[i].toLowerCase())) {
              // but the second post doesn't
              return -1;
            }
          } else if (post2Tags.includes(state.filter[i].toLowerCase())) {
            // lowercase because case insensitive
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
    case SET_CLUB_RESOURCES:
      return {
        ...state,
        resources: action.payload,
      };
    case SET_CLUB_LINKS:
      return {
        ...state,
        links: action.payload,
      };
    case UPLOAD_CLUB_RESOURCES:
      return {
        ...state,
        resources: [action.payload, ...state.resources],
      };
    case UPLOAD_CLUB_LINKS:
      return {
        ...state,
        links: [action.payload, ...state.links],
      };
    case GET_CLUB:
      return {
        ...state,
        club: action.payload,
      };
    default:
      return state;
  }
}
