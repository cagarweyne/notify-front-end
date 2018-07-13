import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './constants';
import { signInRequest } from './actions';
import signInReducer from './reducer';

describe('Signin actions', () => {
  it('makes request to signin in', () => {
    const expectedAction = {
      type: SIGNIN_REQUEST
    }

    expect(signInRequest()).toEqual(expectedAction);
  });
});

describe('Signin reducer', () => {
  let inititalState;

  beforeEach(() => {
    inititalState = {
      requestingSignIn: false,
      successfulSignIn: false,
      errors: '',
    };
  });

  it('returns the initial state', () => {
    expect(signInReducer(undefined, {})).toEqual(inititalState);
  });

  it('SIGNIN_REQUEST', () => {
    const action = {
      type: SIGNIN_REQUEST
    }
    const expectedState = {
      requestingSignIn: true,
      successfulSignIn: false,
      errors: '',
    };

    expect(signInReducer({}, action)).toEqual(expectedState);

  });

  it('SIGNIN_SUCCESS', () => {
    const action = {
      type: SIGNIN_SUCCESS
    }

    const expectedState = {
      requestingSignIn: false,
      successfulSignIn: true,
      errors: '',
    };

    expect(signInReducer({}, action)).toEqual(expectedState);
  });

  it('SIGNIN_FAILURE', () => {
    const action = {
      type: SIGNIN_FAILURE,
      payload: new Error('error')
    }

    const expectedState = {
      requestingSignIn: false,
      successfulSignIn: false,
      errors: new Error('error')
    };

    expect(signInReducer({}, action)).toEqual(expectedState);
  });
});