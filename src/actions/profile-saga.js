import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from './constants';
import API from '../lib/API/api';

function* getProfileFlow() {
  try {
    const response = yield call(API.getProfileApi);
    yield put({type: GET_PROFILE_SUCCESS, payload: response});

  } catch(error) {
    yield put({type: GET_PROFILE_FAILURE, payload: error});
  }
}

export default function* getProfileFlowWatcher() {
  //takeLatest will take the latest call of that action and run it
  yield takeLatest(GET_PROFILE, getProfileFlow);
}