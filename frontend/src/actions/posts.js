import { createAction } from 'redux-actions';
import { v4 as uuid } from 'uuid';

import { CALL_API } from '../middleware';
import Schemas from './Schemas';
import { getUser } from '../reducers/auth';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE';

export const SORT_POSTS = 'SORT_POSTS';

export const fetchPosts = category => (dispatch) => {
  const endpoint = category ? `/${category}/posts` : '/posts';

  return dispatch({
    [CALL_API]: {
      types: [FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE],
      endpoint,
      schema: Schemas.POST_ARRAY,
      payload: {
        category: category || 'all',
      },
    },
  });
};

export const fetchPost = postId => (dispatch) => {
  const endpoint = `/posts/${postId}`;

  return dispatch({
    [CALL_API]: {
      types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE],
      endpoint,
      schema: Schemas.POST,
    },
  });
};

export const createPost = ({
  title, body, category,
}) => (dispatch, getState) => {
  const endpoint = '/posts';
  const postData = JSON.stringify({
    id: uuid(),
    timestamp: Date.now(),
    title,
    body,
    author: getUser(getState()),
    category,
  });

  return dispatch({
    [CALL_API]: {
      types: [CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE],
      endpoint,
      schema: Schemas.POST,
      options: {
        method: 'POST',
        body: postData,
      },
    },
  });
};

export const updatePost = (id, { title, body }) => (dispatch) => {
  const endpoint = `/posts/${id}`;
  const putData = JSON.stringify({
    title,
    body,
  });

  return dispatch({
    [CALL_API]: {
      types: [UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE],
      endpoint,
      schema: Schemas.POST,
      options: {
        method: 'PUT',
        body: putData,
      },
    },
  });
};

export const deletePost = postId => (dispatch) => {
  const endpoint = `/posts/${postId}`;

  return dispatch({
    [CALL_API]: {
      types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
      endpoint,
      schema: Schemas.POST,
      options: {
        method: 'DELETE',
      },
    },
  });
};

export const votePost = (postId, option) => (dispatch) => {
  const endpoint = `/posts/${postId}`;
  const postData = JSON.stringify({ option });

  return dispatch({
    [CALL_API]: {
      types: [VOTE_POST_REQUEST, VOTE_POST_SUCCESS, VOTE_POST_FAILURE],
      endpoint,
      schema: Schemas.POST,
      options: {
        method: 'POST',
        body: postData,
      },
    },
  });
};

export const sortPosts = createAction(SORT_POSTS);
