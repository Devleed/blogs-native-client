import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
  user: null,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
