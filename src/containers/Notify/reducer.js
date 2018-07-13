import { POST_ABSENCE_REQUEST, POST_ABSENCE_SUCCESS, POST_ABSENCE_FAILURE } from './constants';
import { RESET_NOTIFY_PROPS } from '../../actions/constants';

const inititalState = {
  postAbsenceRequest: false,
  postAbsenceSuccess: false,
  postAbsenceFailure: false,
  errors: '',
};

export default function absenceReducer(state=inititalState, action) {
  switch(action.type) {
    case POST_ABSENCE_REQUEST:
      return {
        ...state,
        postAbsenceRequest: true,
      };
    case POST_ABSENCE_SUCCESS:
      return {
        postAbsenceRequest: false,
        postAbsenceSuccess: true,
        postAbsenceFailure: false,
        errors: '',
      };
    case POST_ABSENCE_FAILURE:
      return {
        postAbsenceRequest: false,
        postAbsenceSuccess: false,
        postAbsenceFailure: true,
        errors: action.payload
      };
    case RESET_NOTIFY_PROPS:
      return inititalState;
    default:
      return state;
  }
}

