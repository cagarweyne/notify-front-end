import { SIGNUP_REQUEST } from './constants';

export function signUpRequest(user) {
  return {
    type: SIGNUP_REQUEST,
    payload: user
  }
}