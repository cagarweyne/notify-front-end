import { takeLatest, call, put } from 'redux-saga/effects';
import { ADD_CHILD_REQUEST, ADD_CHILD_SUCCESS, ADD_CHILD_FAILURE } from "./constants";
import API from '../../lib/API/api';

function* addChildFlow(action) {
  try {
    const response = yield call(API.addChildApi, action.payload);
    yield put({type: ADD_CHILD_SUCCESS, payload: response});

  } catch(error) {
    yield put({type: ADD_CHILD_FAILURE, payload: error});
  }
}

export default function* addChildFlowWatcher() {
  //takeLatest will take the latest call of that action and run it
  yield takeLatest(ADD_CHILD_REQUEST, addChildFlow);
}