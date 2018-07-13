import {ADD_CHILD_REQUEST, ADD_CHILD_SUCCESS, ADD_CHILD_FAILURE} from "./constants";
import { addChildRequest } from './actions';
import addChildReducer from './reducer';

describe('add child actions', () => {
  it('creates an action to add child', () => {
    const expectedAction = {
      type: ADD_CHILD_REQUEST,
      payload: {
        firstName: 'John',
        lastName: 'Doe',
        yearGroup: '4'
        }
    };

    const child = {
      firstName: 'John',
      lastName: 'Doe',
      yearGroup: '4'
    };

    expect(addChildRequest(child)).toEqual(expectedAction);
  });
});

describe('add child reducer', () => {
  it('should return the initial state', () => {
    const inititalState = {
      requestingAddChild: false,
      successfulChildAdd: false,
      errors: '',
    };

    expect(addChildReducer(undefined, {})).toEqual(inititalState);
  });

  it('ADD_CHILD_REQUEST', () => {
    const action = {
      type: ADD_CHILD_REQUEST
    };

    const expectedState = {
      requestingAddChild: true,
      successfulChildAdd: false,
      errors: '',
    };

    expect(addChildReducer({}, action)).toEqual(expectedState);
  });

  it('ADD_CHILD_SUCCESS', () => {
    const action = {
      type: ADD_CHILD_SUCCESS
    };

    const expectedState = {
      requestingAddChild: false,
      successfulChildAdd: true,
      errors: '',
    };

    expect(addChildReducer({}, action)).toEqual(expectedState);
  });

  it('ADD_CHILD_FAILURE', () => {
    const action = {
      type: ADD_CHILD_FAILURE,
      payload: new Error('error')
    }

    const expectedState = {
      requestingAddChild: false,
      successfulChildAdd: false,
      errors: new Error('error')
    };

    expect(addChildReducer({}, action)).toEqual(expectedState);

  });
});