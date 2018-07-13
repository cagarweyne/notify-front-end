import { takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS } from './constants';
import API from '../../lib/API/api';

function* signupFlow(action) {
  try {
    const response = yield call(API.signupApi, action.payload);
    yield put({type: SIGNUP_SUCCESS, payload: response});

  } catch(error) {
    yield put({type: SIGNUP_FAILURE, payload: error});
  }
}

export default function* signupWatcher() {
  //takeLatest will take the latest call of that action and run it
  yield takeLatest(SIGNUP_REQUEST, signupFlow);
}