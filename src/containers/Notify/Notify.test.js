import { POST_ABSENCE_REQUEST, POST_ABSENCE_SUCCESS, POST_ABSENCE_FAILURE } from './constants';
import { RESET_NOTIFY_PROPS } from '../../actions/constants';
import { notifyAbsence } from './actions';
import absenceReducer from './reducer';

describe('Notify Actions', () => {
  it('creates action to notify absence', () => {
    const expectedAction = {
      type: POST_ABSENCE_REQUEST,
      payload: {
        id: 'kheqo283k',
        d: '6',
        m: '6',
        y: '2018'
      }
    }
    const absence = {
      id: 'kheqo283k',
      d: '6',
      m: '6',
      y: '2018'
    }

    expect(notifyAbsence(absence)).toEqual(expectedAction);

  });
});

describe('Notify reducer', () => {
  let inititalState;

  beforeEach(() => {
    inititalState = {
      postAbsenceRequest: false,
      postAbsenceSuccess: false,
      postAbsenceFailure: false,
      errors: '',
    };
  });

  it('should return the initial state', () => {
    expect(absenceReducer(undefined, {})).toEqual(inititalState);
  });

  it('POST_ABSENCE_REQUEST', () => {
    const action = {
      type: POST_ABSENCE_REQUEST
    }

    const expectedState = {
      postAbsenceRequest: true,
      postAbsenceSuccess: false,
      postAbsenceFailure: false,
      errors: '',
    };
    expect(absenceReducer(inititalState, action)).toEqual(expectedState);
  });
  it('POST_ABSENCE_SUCCESS', () => {
    const action = {
      type: POST_ABSENCE_SUCCESS
    }

    const expectedState = {
      postAbsenceRequest: false,
      postAbsenceSuccess: true,
      postAbsenceFailure: false,
      errors: '',
    };

    expect(absenceReducer({}, action)).toEqual(expectedState)
  });
  it('POST_ABSENCE_FAILURE', () => {
    const action = {
      type: POST_ABSENCE_FAILURE,
      payload: new Error('error')
    }

    const expectedState = {
      postAbsenceRequest: false,
      postAbsenceSuccess: false,
      postAbsenceFailure: true,
      errors: new Error('error')
    };

    expect(absenceReducer({}, action)).toEqual(expectedState);
  });

  it('RESET_NOTIFY_PROPS', () => {
    const action = {
      type: RESET_NOTIFY_PROPS
    };
    
    expect(absenceReducer({}, action)).toEqual(inititalState);
  });
});