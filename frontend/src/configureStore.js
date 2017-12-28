import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import api from './middleware';
import reducers from './reducers';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const API_ROOT = process.env.REACT_APP_API_ROOT_URL || 'http://localhost:3001';

const apiConfig = {
  apiRoot: API_ROOT,
  globalFetchOptions: {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'whatever-you-want',
    },
  },
};

const configureStore = () => createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, api(apiConfig))),
);

export default configureStore;
