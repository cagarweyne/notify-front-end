import { SIGNIN_REQUEST } from './constants';

export function signInRequest(user) {
  return {
    type: SIGNIN_REQUEST,
    payload: user
  }
}