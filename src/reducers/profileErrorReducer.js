import { GET_PROFILE_FAILURE } from '../actions/constants';

export default function profileErrorReducer(state = { error: false }, action) {
  switch(action.type) {
    case GET_PROFILE_FAILURE:
      return {error: true, errorObj: action.payload};
    default:
      return state;
  }
}