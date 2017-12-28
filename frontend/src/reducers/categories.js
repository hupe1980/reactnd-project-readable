import { combineReducers } from 'redux';
import createEntityReducer from './createEntityReducer';

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions';

export const getCategories = state => state.categories.ids.map(id => state.categories.byId[id]);

export const getIsFetching = state => state.categories.isFetching;

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return true;
    case FETCH_CATEGORIES_SUCCESS:
    case FETCH_CATEGORIES_FAILURE:
      return false;
    default:
      return state;
  }
};

const idsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return action.payload.result.categories;
    default:
      return state;
  }
};

export default combineReducers({
  byId: createEntityReducer('categories'),
  ids: idsReducer,
  isFetching,
});
