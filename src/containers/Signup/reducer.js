import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './constants';

const initialState = {
  requesting: false,
  successful: false,
  errors: [],
  messages: ''
};

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: 'Signing up...',
        errors: []
      };
    case SIGNUP_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: 'Sign up successful',
        errors: []
      };
    case SIGNUP_FAILURE:
      return {
        requesting: false,
        successful: false,
        messages: action.payload.response.data.error,
        errors: action.payload
      };
    default:
      return state;
  }
}
