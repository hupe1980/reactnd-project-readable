import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import createEntityReducer from './createEntityReducer';

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  SORT_POSTS,
} from '../actions';

const getById = state => state.posts.byId;

const getPostIds = state => state.posts.ids;

export const getSortBy = state => state.posts.sortBy;

export const getSortedPostIds = createSelector([
  getPostIds, getSortBy, getById,
], (ids, sortBy, byId) => {
  if (sortBy === 'date') {
    ids.sort((a, b) => byId[b].timestamp - byId[a].timestamp);
  } else {
    ids.sort((a, b) => byId[b].voteScore - byId[a].voteScore);
  }
  return ids;
});

export const getPostById = (state, id) => state.posts.byId[id];

export const getIsFetching = state => state.posts.isFetching;

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case FETCH_POST_REQUEST:
      return true;
    case FETCH_POSTS_SUCCESS:
    case FETCH_POSTS_FAILURE:
    case FETCH_POST_SUCCESS:
    case FETCH_POST_FAILURE:
      return false;
    default:
      return state;
  }
};

const idsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload.result;
    case FETCH_POST_SUCCESS:
      return [...new Set([...state, action.payload.result])];
    case CREATE_POST_SUCCESS:
      return [...state, action.payload.result];
    case DELETE_POST_SUCCESS:
      return state.filter(id => id !== action.payload.result);
    default:
      return state;
  }
};

const sortByReducer = (state = 'date', action) => {
  if (action.type === SORT_POSTS) {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  byId: createEntityReducer('posts'),
  ids: idsReducer,
  sortBy: sortByReducer,
  isFetching,
});
