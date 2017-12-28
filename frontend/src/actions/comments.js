import { v4 as uuid } from 'uuid';

import { CALL_API } from '../middleware';
import Schemas from './Schemas';
import { getUser } from '../reducers/auth';

export const FETCH_POST_COMMENTS_REQUEST = 'FETCH_POST_COMMENTS_REQUEST';
export const FETCH_POST_COMMENTS_SUCCESS = 'FETCH_POST_COMMENTS_SUCCESS';
export const FETCH_POST_COMMENTS_FAILURE = 'FETCH_POST_COMMENTS_FAILURE';

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE';

export const fetchPostComments = postId => (dispatch) => {
  const endpoint = `/posts/${postId}/comments`;

  return dispatch({
    [CALL_API]: {
      types: [
        FETCH_POST_COMMENTS_REQUEST,
        FETCH_POST_COMMENTS_SUCCESS,
        FETCH_POST_COMMENTS_FAILURE,
      ],
      endpoint,
      schema: Schemas.COMMENT_ARRAY,
      payload: {
        parentId: postId,
      },
    },
  });
};

export const createComment = ({
  body, parentId,
}) => (dispatch, getState) => {
  const endpoint = '/comments';
  const postData = JSON.stringify({
    id: uuid(),
    timestamp: Date.now(),
    parentId,
    body,
    author: getUser(getState()),
  });

  return dispatch({
    [CALL_API]: {
      types: [CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE],
      endpoint,
      schema: Schemas.COMMENT,
      payload: {
        parentId,
      },
      options: {
        method: 'POST',
        body: postData,
      },
    },
  });
};

export const updateComment = (id, { body }) => (dispatch) => {
  const endpoint = `/comments/${id}`;
  const putData = JSON.stringify({
    body,
  });

  return dispatch({
    [CALL_API]: {
      types: [UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE],
      endpoint,
      schema: Schemas.COMMENT,
      options: {
        method: 'PUT',
        body: putData,
      },
    },
  });
};

export const deleteComment = comment => (dispatch) => {
  const { id, parentId } = comment;
  const endpoint = `/comments/${id}`;

  return dispatch({
    [CALL_API]: {
      types: [DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE],
      endpoint,
      schema: Schemas.COMMENT,
      payload: {
        parentId,
      },
      options: {
        method: 'DELETE',
      },
    },
  });
};

export const voteComment = (id, option) => (dispatch) => {
  const endpoint = `/comments/${id}`;
  const postData = JSON.stringify({ option });

  return dispatch({
    [CALL_API]: {
      types: [VOTE_COMMENT_REQUEST, VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE],
      endpoint,
      schema: Schemas.COMMENT,
      options: {
        method: 'POST',
        body: postData,
      },
    },
  });
};
