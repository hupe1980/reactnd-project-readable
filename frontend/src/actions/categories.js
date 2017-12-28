import { CALL_API } from '../middleware';
import Schemas from './Schemas';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategories = () => dispatch => dispatch({
  [CALL_API]: {
    types: [FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE],
    endpoint: '/categories',
    schema: Schemas.CATEGORY_ARRAY,
  },
});
