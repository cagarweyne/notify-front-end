import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './constants';
import { signUpRequest } from './actions';
import signUpReducer from './reducer';

describe('Signup actions', () => {
  it('creates an action to request signup', () => {
    const expectedAction = {
      type: SIGNUP_REQUEST
    }

    expect(signUpRequest()).toEqual(expectedAction);
  });
});

describe('Signup reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      requesting: false,
      successful: false,
      errors: [],
      messages: ''
    };
  });

  it('returns the initial state', () => {
    expect(signUpReducer(undefined, {})).toEqual(initialState)
  });

  it('SIGNUP_REQUEST', () => {
    const action = {
      type: SIGNUP_REQUEST
    }

    const expectedState = {
      requesting: true,
      successful: false,
      messages: 'Signing up...',
      errors: []
    };

    expect(signUpReducer({}, action)).toEqual(expectedState);

  });

  it('SIGNUP_SUCCESS', () => {
    const action = {
      type: SIGNUP_SUCCESS
    }

    const expectedState = {
      requesting: false,
      successful: true,
      messages: 'Sign up successful',
      errors: []
    };

    expect(signUpReducer({}, action)).toEqual(expectedState);

  });

  it('SIGNUP_FAILURE', () => {
    const action = {
      type: SIGNUP_FAILURE,
      payload: { response: { data: {error: 'Error Signing up'}}}
    }

    const expectedState = {
      requesting: false,
      successful: false,
      messages: action.payload.response.data.error,
      errors: action.payload
    };

    expect(signUpReducer({}, action)).toEqual(expectedState);
  });
});
