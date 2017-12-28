import { combineReducers } from 'redux';
import createEntityReducer from './createEntityReducer';

import {
  FETCH_POST_COMMENTS_REQUEST,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
} from '../actions';

export const getCommentIds = state => state.comments.ids;

export const getCommentById = (state, id) => state.comments.byId[id];

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS_REQUEST:
      return true;
    case FETCH_POST_COMMENTS_SUCCESS:
    case FETCH_POST_COMMENTS_FAILURE:
      return false;
    default:
      return state;
  }
};

const idsReducer = (state = [], action) => {
  if (action.type === DELETE_POST_SUCCESS) {
    return [];
  }

  switch (action.type) {
    case FETCH_POST_COMMENTS_SUCCESS:
      return action.payload.result;
    case CREATE_COMMENT_SUCCESS:
      return [...state, action.payload.result];
    case DELETE_COMMENT_SUCCESS:
      return state.filter(id => id !== action.payload.result);
    default:
      return state;
  }
};

export default combineReducers({
  byId: createEntityReducer('comments'),
  ids: idsReducer,
  isFetching,
});
