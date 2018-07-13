import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './constants';

const inititalState = {
  requestingSignIn: false,
  successfulSignIn: false,
  errors: '',
};

export default function signInReducer(state=inititalState, action) {
  switch(action.type) {
    case SIGNIN_REQUEST:
      return {
        requestingSignIn: true,
        successfulSignIn: false,
        errors: '',
      };
    case SIGNIN_SUCCESS:
      return {
        requestingSignIn: false,
        successfulSignIn: true,
        errors: '',
      };
    case SIGNIN_FAILURE:
      return {
        requestingSignIn: false,
        successfulSignIn: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}