import { GET_PROFILE_SUCCESS } from '../actions/constants';
import { SIGNIN_SUCCESS } from '../containers/Signin/constants';

export default function parentInfo(state={}, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case GET_PROFILE_SUCCESS:
      return action.payload.data.user;
    default:
      return state;
  }
}
