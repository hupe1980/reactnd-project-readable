import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import categories from './categories';
import posts from './posts';
import comments from './comments';

export default combineReducers({
  form,
  auth,
  categories,
  posts,
  comments,
});
