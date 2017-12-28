import { LOGIN, LOGOUT } from '../actions';

export const getUser = state => state.auth.user;

export const getIsLoggedIn = state => state.auth.isLoggedIn;

const initialState = {
  user: 'anonymous',
  isLoggedIn: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
