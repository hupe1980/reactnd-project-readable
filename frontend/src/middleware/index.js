import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

const callApi = (apiRoot, endpoint, options, schema) => {
  const fullUrl = (endpoint.indexOf(apiRoot) === -1) ? `${apiRoot}${endpoint}` : endpoint;
  return fetch(fullUrl, options)
    .then(response =>
      response.json().then((json) => {
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          throw new Error(errorMessage);
        }

        return schema ? normalize(json, schema) : json;
      }));
};

export const CALL_API = 'Call API';

export default apiConfig => store => next => (action) => {
  const callAPI = action[CALL_API];

  if (!callAPI) {
    return next(action);
  }

  let { endpoint } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  const {
    types, schema, payload, options,
  } = callAPI;

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const { apiRoot, globalFetchOptions } = apiConfig;

  const finalOptions = Object.assign({}, globalFetchOptions, options);

  const [requestType, successType, failureType] = types;

  next(createAction(requestType)(payload));

  return callApi(apiRoot, endpoint, finalOptions, schema)
    .then(response => next(createAction(successType)({
      ...payload,
      ...response,
    })))
    .catch(error => next(createAction(failureType)(error)));
};
