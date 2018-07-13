//another ajax call to add the child to the account
import {ADD_CHILD_REQUEST} from "./constants";

export const addChildRequest = (child) => {
  return {
    type: ADD_CHILD_REQUEST,
    payload: child
  }
}