import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  OPEN_COMMENT,
  CLOSE_COMMENT,
  OPEN_EXPLORE,
  CLOSE_EXPLORE,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  newComment: "",
  openExplore: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case OPEN_COMMENT:
      return {
        ...state,
        newComment: action.payload,
      };
    case CLOSE_COMMENT:
      return {
        ...state,
        newComment: "",
      };
    case OPEN_EXPLORE:
      return {
        ...state,
        openExplore: true,
      };
    case CLOSE_EXPLORE:
      return {
        ...state,
        openExplore: false,
      };
    default:
      return state;
  }
}
