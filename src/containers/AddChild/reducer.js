import { ADD_CHILD_REQUEST, ADD_CHILD_SUCCESS, ADD_CHILD_FAILURE } from "./constants";

const inititalState = {
  requestingAddChild: false,
  successfulChildAdd: false,
  errors: '',
};

export default function addChildReducer(state=inititalState, action) {
  switch(action.type) {
    case ADD_CHILD_REQUEST:
      return {
        requestingAddChild: true,
        successfulChildAdd: false,
        errors: '',
      };
    case ADD_CHILD_SUCCESS:
      return {
        requestingAddChild: false,
        successfulChildAdd: true,
        errors: '',
      };
    case ADD_CHILD_FAILURE:
      return {
        requestingAddChild: false,
        successfulChildAdd: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}