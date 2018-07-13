import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../actions/constants';
import parentInfo from './getParentProfile';
import profileErrorReducer from './profileErrorReducer';

describe('get parent info reducer', () => {
  it('returns the initial state', () => {
    expect(parentInfo(undefined, {})).toEqual({});
  });

  it('GET_PROFILE_SUCCESS', () => {
    const action = {
      type: GET_PROFILE_SUCCESS,
      payload: {
        data: {
          user: {
            firstName: 'John',
            lastName: 'Doe',
            children: []
          }
        }
      }
    }

    const expectedState = {
      firstName: 'John',
      lastName: 'Doe',
      children: []
    }

    expect(parentInfo({}, action)).toEqual(expectedState);
  });
});

describe('profileErrorReducer', () => {
  it('returns initial state', () => {
    expect(profileErrorReducer(undefined, {})).toEqual({ error: false });
  });


  it('GET_PROFILE_FAILURE', () => {
    const action = {
      type: GET_PROFILE_FAILURE,
      payload: new Error('error')
    }

    const expectedState = {
      error: true,
      errorObj: action.payload
    }

    expect(profileErrorReducer({}, action)).toEqual(expectedState)
  })
});